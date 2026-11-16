"use client"

import { useCallback, useMemo, useState } from "react"
import { type DragEndEvent, type DragStartEvent } from "@dnd-kit/core"

import { zoneContainerIds } from "@/components/study/constants"
import {
  type NavigationSnapshot,
  type ParticipantFormState,
  type ParticipantInfo,
  type PreviewContext,
  type ScenarioView,
  type SportCategory,
  type StudyProtocol,
  type StudyStep,
  type WidgetConfig,
  type WidgetId,
  type ZoneId,
  type ZonesState,
} from "@/components/study/types"
import {
  coachingStaffScenarios,
  getScenariosForProtocol,
  studentAthleteScenarios,
  type Scenario,
} from "@/lib/scenarios"
import { getWidgetsForSportCategory } from "@/lib/widget-selection"

const widgetOrderGroups: WidgetId[][] = [
  ["total-sleep-time", "sleep-score"],
  ["training-load", "full-workout-report", "activity-hr-graph"],
  ["full-day-hr", "resting-hr"],
]

function shuffleItems<T>(items: T[]) {
  const shuffledItems = [...items]

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const currentItem = shuffledItems[index]
    shuffledItems[index] = shuffledItems[randomIndex]
    shuffledItems[randomIndex] = currentItem
  }

  return shuffledItems
}

function shuffleWidgets(widgets: WidgetConfig[]) {
  const widgetById = new Map(widgets.map((widget) => [widget.id, widget]))
  const groupedWidgetIds = new Set(widgetOrderGroups.flat())

  const groupedBlocks = widgetOrderGroups
    .map((groupIds) =>
      shuffleItems(
        groupIds
          .map((widgetId) => widgetById.get(widgetId))
          .filter((widget): widget is WidgetConfig => Boolean(widget))
      )
    )
    .filter((group) => group.length > 0)

  const singletonBlocks = widgets
    .filter((widget) => !groupedWidgetIds.has(widget.id))
    .map((widget) => [widget])

  return shuffleItems([...groupedBlocks, ...singletonBlocks]).flat()
}

function createInitialZones(sportCategory?: SportCategory | null, orderedWidgets?: WidgetConfig[]): ZonesState {
  const widgets = orderedWidgets ?? getWidgetsForSportCategory(sportCategory)

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

function reorderZoneItems(items: WidgetConfig[], activeId: WidgetId, overId: string) {
  const sourceIndex = items.findIndex((item) => item.id === activeId)
  if (sourceIndex < 0) return items

  const targetIndex =
    sourceIndex === -1
      ? -1
      : items.findIndex((item) => item.id === overId)

  if (targetIndex < 0 || targetIndex === sourceIndex) return items

  const nextItems = [...items]
  const [movedItem] = nextItems.splice(sourceIndex, 1)
  nextItems.splice(targetIndex, 0, movedItem)
  return nextItems
}

export function useStudySession() {
  const [step, setStep] = useState<StudyStep>("protocol")
  const [scenarioView, setScenarioView] = useState<ScenarioView>("intro")
  const [previewContext, setPreviewContext] = useState<PreviewContext>("onboarding")
  const [participantForm, setParticipantForm] = useState<ParticipantFormState>({
    protocol: null,
    sportCategory: null,
    deviceType: null,
  })
  const [participant, setParticipant] = useState<ParticipantInfo | null>(null)
  const [assignedScenarios, setAssignedScenarios] = useState<Scenario[]>([])
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [zones, setZones] = useState<ZonesState>(createInitialZones)
  const [scenarioZones, setScenarioZones] = useState<Record<string, ZonesState>>({})
  const [sessionWidgetOrder, setSessionWidgetOrder] = useState<WidgetConfig[]>([])
  const [activeId, setActiveId] = useState<WidgetId | null>(null)
  const [navigationHistory, setNavigationHistory] = useState<NavigationSnapshot[]>([])

  const currentScenario = assignedScenarios[scenarioIndex] ?? null
  const previewWidgets = useMemo(() => {
    return sessionWidgetOrder.length
      ? sessionWidgetOrder
      : getWidgetsForSportCategory(participant?.sportCategory)
  }, [participant?.sportCategory, sessionWidgetOrder])

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

  const pushNavigationSnapshot = useCallback(() => {
    setNavigationHistory((current) => [
      ...current,
      {
        step,
        scenarioView,
        scenarioIndex,
        previewContext,
      },
    ])
  }, [previewContext, scenarioIndex, scenarioView, step])

  const goBack = useCallback(() => {
    if (navigationHistory.length === 0) return

    const previous = navigationHistory[navigationHistory.length - 1]

    if (previous.step === "study" && assignedScenarios[previous.scenarioIndex]) {
      const targetScenario = assignedScenarios[previous.scenarioIndex]

      if (previous.scenarioIndex !== scenarioIndex) {
        setZones(
          scenarioZones[targetScenario.id]
            ? cloneZones(scenarioZones[targetScenario.id])
            : createInitialZones(participant?.sportCategory, sessionWidgetOrder)
        )
      } else {
        setZones((currentZones) => cloneZones(currentZones))
      }
    }

    setActiveId(null)
    setStep(previous.step)
    setScenarioView(previous.scenarioView)
    setScenarioIndex(previous.scenarioIndex)
    setPreviewContext(previous.previewContext)
    setNavigationHistory((current) => current.slice(0, -1))
  }, [assignedScenarios, navigationHistory, participant?.sportCategory, scenarioIndex, scenarioZones, sessionWidgetOrder])

  const resetSession = useCallback(() => {
    setStep("protocol")
    setScenarioView("intro")
    setPreviewContext("onboarding")
    setParticipant(null)
    setParticipantForm({ protocol: null, sportCategory: null, deviceType: null })
    setAssignedScenarios([])
    setScenarioIndex(0)
    setZones(createInitialZones())
    setScenarioZones({})
    setSessionWidgetOrder([])
    setActiveId(null)
    setNavigationHistory([])
  }, [])

  const handleProtocolSelect = useCallback((protocol: StudyProtocol) => {
    setParticipantForm({ protocol, sportCategory: null, deviceType: null })
  }, [])
  const handleDeviceTypeSelect = useCallback((deviceType: NonNullable<ParticipantFormState["deviceType"]>) => {
    setParticipantForm((current) => ({ ...current, deviceType }))
  }, [])

  const handleSportCategorySelect = useCallback((sportCategory: NonNullable<ParticipantFormState["sportCategory"]>) => {
    setParticipantForm((current) => ({ ...current, sportCategory }))
  }, [])

  const submitProtocol = useCallback(() => {
    if (!participantForm.protocol) return
    pushNavigationSnapshot()
    setStep("sport")
  }, [participantForm.protocol, pushNavigationSnapshot])

  const submitSportCategory = useCallback(() => {
    if (!participantForm.sportCategory) return

    pushNavigationSnapshot()
    setStep("device")
  }, [participantForm.sportCategory, pushNavigationSnapshot])

  const startSession = useCallback(() => {
    const protocol = participantForm.protocol
    const sportCategory = participantForm.sportCategory
    const deviceType = participantForm.deviceType

    if (!protocol || !sportCategory || !deviceType) return

    pushNavigationSnapshot()

    const selectedScenarios = getScenariosForProtocol(protocol)
    const randomizedWidgetOrder = shuffleWidgets(getWidgetsForSportCategory(sportCategory))

    setParticipant({ protocol, sportCategory, deviceType })
    setAssignedScenarios(selectedScenarios)
    setScenarioIndex(0)
    setScenarioView("preview")
    setPreviewContext("onboarding")
    setSessionWidgetOrder(randomizedWidgetOrder)
    setZones(createInitialZones(sportCategory, randomizedWidgetOrder))
    setScenarioZones({})
    setActiveId(null)
    setStep("study")
  }, [participantForm.deviceType, participantForm.protocol, participantForm.sportCategory, pushNavigationSnapshot])

  const openWorkspace = useCallback(() => {
    pushNavigationSnapshot()
    setScenarioView("workspace")
  }, [pushNavigationSnapshot])

  const openRecap = useCallback(() => {
    pushNavigationSnapshot()
    setScenarioView("recap")
  }, [pushNavigationSnapshot])

  const openWidgetPreviewFromRecap = useCallback(() => {
    pushNavigationSnapshot()
    setPreviewContext("recap")
    setScenarioView("preview")
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

      return {
        not_displayed: [widget, ...nextNotDisplayed],
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
      setZones((currentZones) => ({
        ...currentZones,
        [sourceZone]: reorderZoneItems(currentZones[sourceZone], activeWidgetId, overId),
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

  const continueScenario = useCallback(() => {
    if (!participant || !currentScenario) return

    pushNavigationSnapshot()

    const isLastScenario = scenarioIndex === assignedScenarios.length - 1

    if (isLastScenario) {
      resetSession()
      return
    }

    setScenarioZones((current) => ({ ...current, [currentScenario.id]: cloneZones(zones) }))
    setZones(createInitialZones(participant.sportCategory, sessionWidgetOrder))
    setScenarioIndex(scenarioIndex + 1)
    setScenarioView("intro")
  }, [assignedScenarios.length, currentScenario, participant, pushNavigationSnapshot, resetSession, scenarioIndex, sessionWidgetOrder, zones])

  const skipToFinish = useCallback(() => {
    resetSession()
  }, [resetSession])

  const continueFromWidgetPreview = useCallback(() => {
    if (previewContext === "recap") {
      skipToFinish()
      return
    }

    pushNavigationSnapshot()
    setScenarioView("intro")
  }, [previewContext, pushNavigationSnapshot, skipToFinish])

  return {
    activeWidget,
    activeZone,
    canGoBack: navigationHistory.length > 0,
    continueFromWidgetPreview,
    continueScenario,
    currentScenario,
    goBack,
    handleDeviceTypeSelect,
    handleDragCancel,
    handleDragEnd,
    handleDragStart,
    handleProtocolSelect,
    handleSportCategorySelect,
    moveWidgetToNotDisplayed,
    openWidgetPreviewFromRecap,
    openRecap,
    openWidgetDevelopment,
    openWorkspace,
    participant,
    participantForm,
    previewContext,
    previewWidgets,
    resetSession,
    scenarioIndex,
    scenarioView,
    skipToFinish,
    startSession,
    step,
    submitProtocol,
    submitSportCategory,
    totalScenarios:
      assignedScenarios.length ||
      (participantForm.protocol === "coaching-staff"
        ? coachingStaffScenarios.length
        : studentAthleteScenarios.length),
    zones,
  }
}
