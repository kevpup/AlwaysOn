"use client"

import { useCallback, useMemo, useState, type FormEvent } from "react"
import { type DragEndEvent, type DragStartEvent } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

import { zoneContainerIds } from "@/components/study/constants"
import {
  type NavigationSnapshot,
  type ParticipantFormState,
  type ParticipantInfo,
  type ScenarioDecisionRow,
  type ScenarioView,
  type SportCategory,
  type StudyStep,
  type WidgetConfig,
  type WidgetId,
  type ZoneId,
  type ZonesState,
} from "@/components/study/types"
import { getScenariosForParticipant, type Scenario, scenarios } from "@/lib/scenarios"
import { getWidgetsForSportCategory } from "@/lib/widget-selection"

function createInitialZones(sportCategory?: SportCategory | null): ZonesState {
  const widgets = getWidgetsForSportCategory(sportCategory)

  return {
    not_displayed: [...widgets],
    share: [],
  }
}

function cloneZones(zones: ZonesState): ZonesState {
  return {
    not_displayed: [...zones.not_displayed],
    share: [...zones.share],
  }
}

export function useStudySession() {
  const [step, setStep] = useState<StudyStep>("name")
  const [scenarioView, setScenarioView] = useState<ScenarioView>("intro")
  const [participantForm, setParticipantForm] = useState<ParticipantFormState>({
    name: "",
    sportCategory: null,
    deviceType: null,
  })
  const [participant, setParticipant] = useState<ParticipantInfo | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [assignedScenarios, setAssignedScenarios] = useState<Scenario[]>([])
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [zones, setZones] = useState<ZonesState>(createInitialZones)
  const [savedRows, setSavedRows] = useState<ScenarioDecisionRow[]>([])
  const [activeId, setActiveId] = useState<WidgetId | null>(null)
  const [navigationHistory, setNavigationHistory] = useState<NavigationSnapshot[]>([])

  const currentScenario = assignedScenarios[scenarioIndex] ?? null

  const findZoneForWidget = useCallback((id: WidgetId, currentZones: ZonesState = zones): ZoneId | null => {
    if (currentZones.not_displayed.some((widget) => widget.id === id)) return "not_displayed"
    if (currentZones.share.some((widget) => widget.id === id)) return "share"
    return null
  }, [zones])

  const getWidgetById = useCallback((id: WidgetId, currentZones: ZonesState = zones) => {
    return (
      currentZones.not_displayed.find((widget) => widget.id === id) ||
      currentZones.share.find((widget) => widget.id === id) ||
      null
    )
  }, [zones])

  const resolveTargetZone = useCallback((overId: string, currentZones: ZonesState = zones): ZoneId | null => {
    const matchedZone = (
      Object.entries(zoneContainerIds).find(([, containerId]) => containerId === overId)?.[0] ?? null
    ) as ZoneId | null

    if (matchedZone) return matchedZone
    return findZoneForWidget(overId as WidgetId, currentZones)
  }, [findZoneForWidget, zones])

  const activeWidget = useMemo(() => {
    if (!activeId) return null
    return getWidgetById(activeId)
  }, [activeId, getWidgetById])

  const activeZone = useMemo(() => {
    if (!activeId) return null
    return findZoneForWidget(activeId)
  }, [activeId, findZoneForWidget])

  const buildScenarioRows = useCallback((scenario: Scenario, currentZones: ZonesState) => {
    if (!participant) return []

    const allRows: ScenarioDecisionRow[] = []

    currentZones.not_displayed.forEach((widget) => {
      allRows.push({
        participantName: participant.name,
        sportCategory: participant.sportCategory,
        deviceType: participant.deviceType,
        scenarioId: scenario.id,
        widgetTitle: widget.title,
        shared: false,
        rank: "",
      })
    })

    currentZones.share.forEach((widget, index) => {
      allRows.push({
        participantName: participant.name,
        sportCategory: participant.sportCategory,
        deviceType: participant.deviceType,
        scenarioId: scenario.id,
        widgetTitle: widget.title,
        shared: true,
        rank: index + 1,
      })
    })

    return allRows
  }, [participant])

  const buildZonesFromSavedScenario = useCallback((targetScenarioId: string): ZonesState => {
    const scenarioRows = savedRows.filter((row) => row.scenarioId === targetScenarioId)

    if (scenarioRows.length === 0) {
      return createInitialZones(participant?.sportCategory)
    }

    const availableWidgets = getWidgetsForSportCategory(participant?.sportCategory)
    const widgetByTitle = new Map(availableWidgets.map((widget) => [widget.title, widget]))
    const sharedRows = scenarioRows
      .filter((row) => row.shared)
      .sort((a, b) => {
        const aRank = typeof a.rank === "number" ? a.rank : Number.MAX_SAFE_INTEGER
        const bRank = typeof b.rank === "number" ? b.rank : Number.MAX_SAFE_INTEGER
        return aRank - bRank
      })

    const sharedTitles = new Set(sharedRows.map((row) => row.widgetTitle))

    return {
      not_displayed: availableWidgets.filter((widget) => !sharedTitles.has(widget.title)),
      share: sharedRows
        .map((row) => widgetByTitle.get(row.widgetTitle))
        .filter((widget): widget is WidgetConfig => Boolean(widget)),
    }
  }, [participant?.sportCategory, savedRows])

  const pushNavigationSnapshot = useCallback(() => {
    setNavigationHistory((current) => [
      ...current,
      {
        step,
        scenarioView,
        scenarioIndex,
      },
    ])
  }, [scenarioIndex, scenarioView, step])

  const goBack = useCallback(() => {
    if (navigationHistory.length === 0) return

    const previous = navigationHistory[navigationHistory.length - 1]

    if (previous.step === "study" && assignedScenarios[previous.scenarioIndex]) {
      const targetScenario = assignedScenarios[previous.scenarioIndex]

      if (previous.scenarioIndex !== scenarioIndex) {
        setZones(buildZonesFromSavedScenario(targetScenario.id))
      } else {
        setZones((currentZones) => cloneZones(currentZones))
      }
    }

    setActiveId(null)
    setStep(previous.step)
    setScenarioView(previous.scenarioView)
    setScenarioIndex(previous.scenarioIndex)
    setNavigationHistory((current) => current.slice(0, -1))
  }, [assignedScenarios, buildZonesFromSavedScenario, navigationHistory, scenarioIndex])

  const persistRowsToFile = useCallback(async (rows: ScenarioDecisionRow[]) => {
    if (!participant || !sessionId) return

    try {
      await fetch("/api/scenarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          participantName: participant.name,
          sportCategory: participant.sportCategory,
          deviceType: participant.deviceType,
          rows,
        }),
      })
    } catch (error) {
      console.error("Failed to persist scenario rows", error)
    }
  }, [participant, sessionId])

  const resetSession = useCallback(() => {
    setStep("name")
    setScenarioView("intro")
    setParticipant(null)
    setParticipantForm({ name: "", sportCategory: null, deviceType: null })
    setSessionId(null)
    setAssignedScenarios([])
    setScenarioIndex(0)
    setZones(createInitialZones())
    setSavedRows([])
    setActiveId(null)
    setNavigationHistory([])
  }, [])

  const handleParticipantNameChange = useCallback((name: string) => {
    setParticipantForm((current) => ({ ...current, name }))
  }, [])

  const handleDeviceTypeSelect = useCallback((deviceType: NonNullable<ParticipantFormState["deviceType"]>) => {
    setParticipantForm((current) => ({ ...current, deviceType }))
  }, [])

  const handleSportCategorySelect = useCallback((sportCategory: NonNullable<ParticipantFormState["sportCategory"]>) => {
    setParticipantForm((current) => ({ ...current, sportCategory }))
  }, [])

  const submitName = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const name = participantForm.name.trim()
    if (!name) return

    pushNavigationSnapshot()
    setStep("sport")
  }, [participantForm.name, pushNavigationSnapshot])

  const submitSportCategory = useCallback(() => {
    if (!participantForm.sportCategory) return

    pushNavigationSnapshot()
    setStep("device")
  }, [participantForm.sportCategory, pushNavigationSnapshot])

  const startSession = useCallback(() => {
    const name = participantForm.name.trim()
    const sportCategory = participantForm.sportCategory
    const deviceType = participantForm.deviceType

    if (!name || !sportCategory || !deviceType) return

    pushNavigationSnapshot()

    const selectedScenarios = getScenariosForParticipant(name)

    setParticipant({ name, sportCategory, deviceType })
    setSessionId(`session-${Date.now()}`)
    setAssignedScenarios(selectedScenarios)
    setScenarioIndex(0)
    setScenarioView("intro")
    setZones(createInitialZones(sportCategory))
    setSavedRows([])
    setActiveId(null)
    setStep("study")
  }, [participantForm.deviceType, participantForm.name, participantForm.sportCategory, pushNavigationSnapshot])

  const openWorkspace = useCallback(() => {
    pushNavigationSnapshot()
    setScenarioView("workspace")
  }, [pushNavigationSnapshot])

  const openRecap = useCallback(() => {
    pushNavigationSnapshot()
    setScenarioView("recap")
  }, [pushNavigationSnapshot])

  const openWidgetDevelopment = useCallback(() => {
    pushNavigationSnapshot()
    setStep("widget-dev")
  }, [pushNavigationSnapshot])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as WidgetId)
  }, [])

  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])

  const moveWidgetToNotDisplayed = useCallback((widgetId: WidgetId) => {
    setZones((currentZones) => {
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
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const activeWidgetId = event.active.id as WidgetId
    const sourceZone = findZoneForWidget(activeWidgetId)

    setActiveId(null)

    if (!sourceZone || !event.over) return

    const overId = String(event.over.id)
    const targetZone = resolveTargetZone(overId)

    if (!targetZone) return

    if (sourceZone === targetZone) {
      if (targetZone !== "share" || overId === zoneContainerIds.share || overId === activeWidgetId) {
        return
      }

      const oldIndex = zones.share.findIndex((widget) => widget.id === activeWidgetId)
      const newIndex = zones.share.findIndex((widget) => widget.id === overId)

      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return

      setZones((currentZones) => ({
        ...currentZones,
        share: arrayMove(currentZones.share, oldIndex, newIndex),
      }))

      return
    }

    const widget = getWidgetById(activeWidgetId)
    if (!widget) return

    setZones((currentZones) => {
      const nextZones: ZonesState = {
        not_displayed: currentZones.not_displayed.filter((item) => item.id !== activeWidgetId),
        share: currentZones.share.filter((item) => item.id !== activeWidgetId),
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
  }, [findZoneForWidget, getWidgetById, resolveTargetZone, zones.share])

  const saveScenario = useCallback(() => {
    if (!participant || !sessionId || !currentScenario) return

    pushNavigationSnapshot()

    const scenarioRows = buildScenarioRows(currentScenario, zones)
    const nextRows = [
      ...savedRows.filter((row) => row.scenarioId !== currentScenario.id),
      ...scenarioRows,
    ]
    const isLastScenario = scenarioIndex === assignedScenarios.length - 1
    const nextScenarioIndex = isLastScenario ? scenarioIndex : scenarioIndex + 1

    setSavedRows(nextRows)
    persistRowsToFile(scenarioRows)

    if (isLastScenario) {
      setStep("complete")
      return
    }

    setZones(createInitialZones(participant.sportCategory))
    setScenarioIndex(nextScenarioIndex)
    setScenarioView("intro")
  }, [assignedScenarios.length, buildScenarioRows, currentScenario, participant, persistRowsToFile, pushNavigationSnapshot, savedRows, scenarioIndex, sessionId, zones])

  const skipToFinish = useCallback(() => {
    if (!participant || !sessionId) return

    pushNavigationSnapshot()

    let nextRows = savedRows
    let rowsToPersist: ScenarioDecisionRow[] = []

    if (currentScenario && (scenarioView === "workspace" || scenarioView === "recap")) {
      const scenarioRows = buildScenarioRows(currentScenario, zones)
      nextRows = [
        ...savedRows.filter((row) => row.scenarioId !== currentScenario.id),
        ...scenarioRows,
      ]
      rowsToPersist = scenarioRows
      setSavedRows(nextRows)
    }

    if (rowsToPersist.length > 0) {
      persistRowsToFile(rowsToPersist)
    }

    setStep("complete")
  }, [buildScenarioRows, currentScenario, participant, persistRowsToFile, pushNavigationSnapshot, savedRows, scenarioView, sessionId, zones])

  return {
    activeWidget,
    activeZone,
    canGoBack: navigationHistory.length > 0,
    currentScenario,
    goBack,
    handleDeviceTypeSelect,
    handleDragCancel,
    handleDragEnd,
    handleDragStart,
    handleParticipantNameChange,
    handleSportCategorySelect,
    moveWidgetToNotDisplayed,
    openRecap,
    openWidgetDevelopment,
    openWorkspace,
    participant,
    participantForm,
    resetSession,
    saveScenario,
    scenarioIndex,
    scenarioView,
    skipToFinish,
    startSession,
    step,
    submitName,
    submitSportCategory,
    totalScenarios: assignedScenarios.length || scenarios.length,
    zones,
  }
}
