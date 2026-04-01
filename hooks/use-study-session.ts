"use client"

import { useCallback, useMemo, useState } from "react"
import { type DragEndEvent, type DragStartEvent } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

import { zoneContainerIds } from "@/components/study/constants"
import {
  type Audience,
  type NavigationSnapshot,
  type StudyStep,
  type WidgetConfig,
  type WidgetId,
  type ZoneId,
  type ZonesState,
} from "@/components/study/types"
import { scenarios } from "@/lib/scenarios"
import { WHOOP_UNITE_DEMO_WIDGET_IDS, defaultWidgets } from "@/lib/widget-selection"

function createInitialZones(): ZonesState {
  return {
    not_displayed: [...defaultWidgets],
    share: [],
  }
}

export function useStudySession() {
  const [step, setStep] = useState<StudyStep>("title")
  const [athleteZones, setAthleteZones] = useState<ZonesState>(createInitialZones)
  const [coachZones, setCoachZones] = useState<ZonesState>(createInitialZones)
  const [activeId, setActiveId] = useState<WidgetId | null>(null)
  const [navigationHistory, setNavigationHistory] = useState<NavigationSnapshot[]>([])
  const [highlightSupportedWidgets, setHighlightSupportedWidgets] = useState(false)

  const scenarioIndex = step === "coach_intro" || step === "coach_workspace" ? 1 : 0
  const currentScenario =
    step === "athlete_intro" || step === "athlete_workspace"
      ? scenarios[0]
      : step === "coach_intro" || step === "coach_workspace"
        ? scenarios[1]
        : null

  const currentAudience: Audience | null =
    step === "athlete_workspace" ? "athlete" : step === "coach_workspace" ? "coach" : null

  const activeZones = currentAudience === "coach" ? coachZones : athleteZones

  const findZoneForWidget = useCallback((id: WidgetId, currentZones: ZonesState): ZoneId | null => {
    if (currentZones.not_displayed.some((widget) => widget.id === id)) return "not_displayed"
    if (currentZones.share.some((widget) => widget.id === id)) return "share"
    return null
  }, [])

  const getWidgetById = useCallback((id: WidgetId, currentZones: ZonesState) => {
    return (
      currentZones.not_displayed.find((widget) => widget.id === id) ||
      currentZones.share.find((widget) => widget.id === id) ||
      null
    )
  }, [])

  const resolveTargetZone = useCallback((overId: string, currentZones: ZonesState): ZoneId | null => {
    const matchedZone = (
      Object.entries(zoneContainerIds).find(([, containerId]) => containerId === overId)?.[0] ?? null
    ) as ZoneId | null

    if (matchedZone) return matchedZone
    return findZoneForWidget(overId as WidgetId, currentZones)
  }, [findZoneForWidget])

  const activeWidget = useMemo(() => {
    if (!activeId || !currentAudience) return null
    return getWidgetById(activeId, activeZones)
  }, [activeId, activeZones, currentAudience, getWidgetById])

  const activeZone = useMemo(() => {
    if (!activeId || !currentAudience) return null
    return findZoneForWidget(activeId, activeZones)
  }, [activeId, activeZones, currentAudience, findZoneForWidget])

  const pushNavigationSnapshot = useCallback(() => {
    setNavigationHistory((current) => [...current, { step }])
  }, [step])

  const goBack = useCallback(() => {
    if (navigationHistory.length === 0) return

    const previous = navigationHistory[navigationHistory.length - 1]
    setActiveId(null)
    setStep(previous.step)
    setNavigationHistory((current) => current.slice(0, -1))
  }, [navigationHistory])

  const resetSession = useCallback(() => {
    setStep("title")
    setAthleteZones(createInitialZones())
    setCoachZones(createInitialZones())
    setActiveId(null)
    setNavigationHistory([])
    setHighlightSupportedWidgets(false)
  }, [])

  const startDemo = useCallback(() => {
    pushNavigationSnapshot()
    setStep("athlete_intro")
  }, [pushNavigationSnapshot])

  const openWorkspace = useCallback(() => {
    pushNavigationSnapshot()
    setStep((current) => (current === "athlete_intro" ? "athlete_workspace" : "coach_workspace"))
  }, [pushNavigationSnapshot])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as WidgetId)
  }, [])

  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])

  const updateZonesForAudience = useCallback((audience: Audience, updater: (current: ZonesState) => ZonesState) => {
    if (audience === "athlete") {
      setAthleteZones(updater)
      return
    }

    setCoachZones(updater)
  }, [])

  const moveWidgetToNotDisplayed = useCallback((widgetId: WidgetId) => {
    if (!currentAudience) return

    updateZonesForAudience(currentAudience, (currentZones) => {
      const widget =
        currentZones.not_displayed.find((item) => item.id === widgetId) ||
        currentZones.share.find((item) => item.id === widgetId) ||
        null

      if (!widget) return currentZones

      const nextNotDisplayed = currentZones.not_displayed.filter((item) => item.id !== widgetId)
      nextNotDisplayed.push(widget)

      return {
        not_displayed: nextNotDisplayed,
        share: currentZones.share.filter((item) => item.id !== widgetId),
      }
    })
  }, [currentAudience, updateZonesForAudience])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    if (!currentAudience) {
      setActiveId(null)
      return
    }

    const currentZones = currentAudience === "athlete" ? athleteZones : coachZones
    const activeWidgetId = event.active.id as WidgetId
    const sourceZone = findZoneForWidget(activeWidgetId, currentZones)

    setActiveId(null)

    if (!sourceZone || !event.over) return

    const overId = String(event.over.id)
    const targetZone = resolveTargetZone(overId, currentZones)

    if (!targetZone) return

    if (sourceZone === targetZone) {
      if (targetZone !== "share" || overId === zoneContainerIds.share || overId === activeWidgetId) {
        return
      }

      const oldIndex = currentZones.share.findIndex((widget) => widget.id === activeWidgetId)
      const newIndex = currentZones.share.findIndex((widget) => widget.id === overId)

      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return

      updateZonesForAudience(currentAudience, (zoneState) => ({
        ...zoneState,
        share: arrayMove(zoneState.share, oldIndex, newIndex),
      }))

      return
    }

    const widget = getWidgetById(activeWidgetId, currentZones)
    if (!widget) return

    updateZonesForAudience(currentAudience, (zoneState) => {
      const nextZones: ZonesState = {
        not_displayed: zoneState.not_displayed.filter((item) => item.id !== activeWidgetId),
        share: zoneState.share.filter((item) => item.id !== activeWidgetId),
      }

      if (targetZone === "share") {
        const insertAt =
          overId === zoneContainerIds.share
            ? nextZones.share.length
            : nextZones.share.findIndex((item) => item.id === overId)

        if (insertAt >= 0) {
          nextZones.share.splice(insertAt, 0, widget)
        } else {
          nextZones.share.push(widget)
        }
      } else {
        nextZones[targetZone].push(widget)
      }

      return nextZones
    })
  }, [
    athleteZones,
    coachZones,
    currentAudience,
    findZoneForWidget,
    getWidgetById,
    resolveTargetZone,
    updateZonesForAudience,
  ])

  const advanceFromWorkspace = useCallback(() => {
    pushNavigationSnapshot()
    setStep((current) => (current === "athlete_workspace" ? "coach_intro" : "review"))
  }, [pushNavigationSnapshot])

  const openConclusion = useCallback(() => {
    pushNavigationSnapshot()
    setStep("conclusion")
  }, [pushNavigationSnapshot])

  const toggleHighlightSupportedWidgets = useCallback(() => {
    setHighlightSupportedWidgets((current) => !current)
  }, [])

  const reviewColumns = useMemo(() => {
    const athleteShared = new Set(athleteZones.share.map((widget) => widget.id))
    const coachShared = new Set(coachZones.share.map((widget) => widget.id))

    const columns = {
      neither: [] as WidgetConfig[],
      coachOnly: [] as WidgetConfig[],
      athleteOnly: [] as WidgetConfig[],
      both: [] as WidgetConfig[],
    }

    defaultWidgets.forEach((widget) => {
      const athleteSelected = athleteShared.has(widget.id)
      const coachSelected = coachShared.has(widget.id)

      if (athleteSelected && coachSelected) {
        columns.both.push(widget)
        return
      }

      if (athleteSelected) {
        columns.athleteOnly.push(widget)
        return
      }

      if (coachSelected) {
        columns.coachOnly.push(widget)
        return
      }

      columns.neither.push(widget)
    })

    return columns
  }, [athleteZones.share, coachZones.share])

  return {
    activeWidget,
    activeZone,
    activeZones,
    advanceFromWorkspace,
    canGoBack: navigationHistory.length > 0,
    currentScenario,
    goBack,
    handleDragCancel,
    handleDragEnd,
    handleDragStart,
    highlightSupportedWidgets,
    moveWidgetToNotDisplayed,
    openConclusion,
    openWorkspace,
    resetSession,
    reviewColumns,
    scenarioIndex,
    startDemo,
    step,
    supportedWidgetIds: WHOOP_UNITE_DEMO_WIDGET_IDS,
    toggleHighlightSupportedWidgets,
    totalScenarios: scenarios.length,
  }
}
