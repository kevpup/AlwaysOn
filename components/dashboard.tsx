"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react"
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
import { ChevronRight, Eye, EyeOff, LayoutGrid, RotateCcw } from "lucide-react"

import { DraggableBankItem } from "@/components/draggable-bank-item"
import { SortableWidget } from "@/components/sortable-widget"
import { WidgetRenderer } from "@/components/widget-renderer"
import { defaultWidgets, type WidgetConfig, type WidgetId } from "@/lib/mock-data"
import { scenarios, type Scenario } from "@/lib/scenarios"

type ZoneId = "undecided" | "share" | "do_not_share"
type StudyStep = "intake" | "study" | "complete"
type ScenarioView = "intro" | "workspace"

interface ParticipantInfo {
  name: string
}

interface ScenarioDecisionRow {
  participantName: string
  scenarioId: string
  widgetTitle: string
  shared: boolean
  rank: number | ""
}

interface ZonesState {
  undecided: WidgetConfig[]
  share: WidgetConfig[]
  do_not_share: WidgetConfig[]
}

const zoneContainerIds: Record<ZoneId, string> = {
  undecided: "zone-undecided",
  share: "zone-share",
  do_not_share: "zone-do-not-share",
}

const zoneTitles: Record<ZoneId, string> = {
  undecided: "Not Yet Decided",
  share: "Share With Coach",
  do_not_share: "Do Not Share",
}

const zoneDescriptions: Record<ZoneId, string> = {
  undecided: "Leave widgets here if you are not ready to classify them in this scenario.",
  share: "Arrange shared widgets from top-left to bottom-right by importance to your coach.",
  do_not_share: "Drop widgets here when they should remain hidden from the coach in this scenario.",
}

function createInitialZones(): ZonesState {
  return {
    undecided: [...defaultWidgets],
    share: [],
    do_not_share: [],
  }
}

function sanitizeFilePart(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function escapeCsvValue(value: string | number | boolean) {
  const text = String(value)
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replace(/"/g, '""')}"`
  }
  return text
}

export function Dashboard() {
  const [step, setStep] = useState<StudyStep>("intake")
  const [scenarioView, setScenarioView] = useState<ScenarioView>("intro")
  const [participantForm, setParticipantForm] = useState<ParticipantInfo>({ name: "" })
  const [participant, setParticipant] = useState<ParticipantInfo | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [zones, setZones] = useState<ZonesState>(createInitialZones)
  const [savedRows, setSavedRows] = useState<ScenarioDecisionRow[]>([])
  const [activeId, setActiveId] = useState<WidgetId | null>(null)
  const lastPersistedSnapshot = useRef<string | null>(null)

  const currentScenario = scenarios[scenarioIndex] ?? null

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const findZoneForWidget = useCallback((id: WidgetId, currentZones: ZonesState = zones): ZoneId | null => {
    if (currentZones.undecided.some((widget) => widget.id === id)) return "undecided"
    if (currentZones.share.some((widget) => widget.id === id)) return "share"
    if (currentZones.do_not_share.some((widget) => widget.id === id)) return "do_not_share"
    return null
  }, [zones])

  const getWidgetById = useCallback((id: WidgetId, currentZones: ZonesState = zones) => {
    return (
      currentZones.undecided.find((widget) => widget.id === id) ||
      currentZones.share.find((widget) => widget.id === id) ||
      currentZones.do_not_share.find((widget) => widget.id === id) ||
      null
    )
  }, [zones])

  const resolveTargetZone = useCallback((overId: string, currentZones: ZonesState = zones): ZoneId | null => {
    const matchedZone = (Object.entries(zoneContainerIds).find(([, containerId]) => containerId === overId)?.[0] ??
      null) as ZoneId | null

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

    currentZones.undecided.forEach((widget) => {
      allRows.push({
        participantName: participant.name,
        scenarioId: scenario.id,
        widgetTitle: widget.title,
        shared: false,
        rank: "",
      })
    })

    currentZones.share.forEach((widget, index) => {
      allRows.push({
        participantName: participant.name,
        scenarioId: scenario.id,
        widgetTitle: widget.title,
        shared: true,
        rank: index + 1,
      })
    })

    currentZones.do_not_share.forEach((widget) => {
      allRows.push({
        participantName: participant.name,
        scenarioId: scenario.id,
        widgetTitle: widget.title,
        shared: false,
        rank: "",
      })
    })

    return allRows
  }, [participant])

  const downloadCsv = useCallback((rows: ScenarioDecisionRow[] = savedRows) => {
    if (typeof window === "undefined" || rows.length === 0) return

    const headers: Array<keyof ScenarioDecisionRow> = [
      "participantName",
      "scenarioId",
      "widgetTitle",
      "shared",
      "rank",
    ]

    const csv = [
      headers.join(","),
      ...rows.map((row) => headers.map((header) => escapeCsvValue(row[header] as string | number | boolean)).join(",")),
    ].join("\n")

    const fileNameBase = sanitizeFilePart(participant?.name || "participant")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${fileNameBase || "participant"}-participatory-design.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }, [participant, savedRows])

  const resetSession = useCallback(() => {
    setStep("intake")
    setScenarioView("intro")
    setParticipant(null)
    setParticipantForm({ name: "" })
    setSessionId(null)
    setScenarioIndex(0)
    setZones(createInitialZones())
    setSavedRows([])
    setActiveId(null)
    lastPersistedSnapshot.current = null
  }, [])

  const handleStartSession = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const name = participantForm.name.trim()

    if (!name) return

    const nextParticipant = { name }
    const nextSessionId = `session-${Date.now()}`

    setParticipant(nextParticipant)
    setSessionId(nextSessionId)
    setScenarioIndex(0)
    setScenarioView("intro")
    setZones(createInitialZones())
    setSavedRows([])
    setActiveId(null)
    setStep("study")
    lastPersistedSnapshot.current = null
  }, [participantForm.name])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as WidgetId)
  }, [])

  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])

  const moveWidgetToDoNotShare = useCallback((widgetId: WidgetId) => {
    setZones((currentZones) => {
      const widget =
        currentZones.undecided.find((item) => item.id === widgetId) ||
        currentZones.share.find((item) => item.id === widgetId) ||
        currentZones.do_not_share.find((item) => item.id === widgetId)

      if (!widget) return currentZones

      const nextDoNotShare = currentZones.do_not_share.filter((item) => item.id !== widgetId)
      nextDoNotShare.push(widget)

      return {
        undecided: currentZones.undecided.filter((item) => item.id !== widgetId),
        share: currentZones.share.filter((item) => item.id !== widgetId),
        do_not_share: nextDoNotShare,
      }
    })
  }, [])

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
          rows,
        }),
      })
    } catch (error) {
      console.error("Failed to persist scenario rows", error)
    }
  }, [participant, sessionId])

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
        undecided: currentZones.undecided.filter((item) => item.id !== activeWidgetId),
        share: currentZones.share.filter((item) => item.id !== activeWidgetId),
        do_not_share: currentZones.do_not_share.filter((item) => item.id !== activeWidgetId),
      }

      if (targetZone === "share") {
        const insertAt = overId === zoneContainerIds.share
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

  const handleSaveScenario = useCallback(() => {
    if (!participant || !sessionId || !currentScenario) return

    const scenarioRows = buildScenarioRows(currentScenario, zones)
    const nextRows = [
      ...savedRows.filter((row) => row.scenarioId !== currentScenario.id),
      ...scenarioRows,
    ]
    const isLastScenario = scenarioIndex === scenarios.length - 1
    const nextStep: StudyStep = isLastScenario ? "complete" : "study"
    const nextScenarioIndex = isLastScenario ? scenarioIndex : scenarioIndex + 1

    setSavedRows(nextRows)
    persistRowsToFile(nextRows)

    if (isLastScenario) {
      setStep("complete")
      return
    }

    setScenarioIndex(nextScenarioIndex)
    setScenarioView("intro")
  }, [buildScenarioRows, currentScenario, participant, persistRowsToFile, savedRows, scenarioIndex, sessionId, zones])

  const handleSkipToFinish = useCallback(() => {
    if (!participant || !sessionId) return

    let nextRows = savedRows

    if (currentScenario && scenarioView === "workspace") {
      const scenarioRows = buildScenarioRows(currentScenario, zones)
      nextRows = [
        ...savedRows.filter((row) => row.scenarioId !== currentScenario.id),
        ...scenarioRows,
      ]
      setSavedRows(nextRows)
    }

    persistRowsToFile(nextRows)
    setStep("complete")
  }, [buildScenarioRows, currentScenario, participant, persistRowsToFile, savedRows, scenarioView, sessionId, zones])

  const liveRows = useMemo(() => {
    if (!currentScenario) return savedRows

    if (step === "study" && scenarioView === "workspace") {
      return [
        ...savedRows.filter((row) => row.scenarioId !== currentScenario.id),
        ...buildScenarioRows(currentScenario, zones),
      ]
    }

    return savedRows
  }, [buildScenarioRows, currentScenario, savedRows, scenarioView, step, zones])

  useEffect(() => {
    if (!participant || !sessionId || step !== "study" || scenarioView !== "workspace") return

    const snapshot = JSON.stringify(liveRows)
    if (snapshot === lastPersistedSnapshot.current) return

    lastPersistedSnapshot.current = snapshot
    void persistRowsToFile(liveRows)
  }, [liveRows, participant, persistRowsToFile, scenarioView, sessionId, step])

  if (step === "intake") {
    return (
      <div className="min-h-screen bg-background px-4 py-10 text-foreground md:px-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card/70 p-6 shadow-2xl md:p-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Participatory Design Demo</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Participant Intake</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Start a session by capturing participant details, then move through the fixed scenario sequence. The
              dashboard state carries forward from one scenario to the next.
            </p>
          </div>

          <form className="mt-8 grid gap-4" onSubmit={handleStartSession}>
            <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
              <span>
                Participant Name <span className="text-destructive">*</span>
              </span>
              <input
                type="text"
                value={participantForm.name}
                onChange={(event) => setParticipantForm((current) => ({ ...current, name: event.target.value }))}
                className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                placeholder="Jordan Rivera"
                autoComplete="name"
                required
              />
            </label>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Start Session
                <ChevronRight className="h-4 w-4" />
              </button>
              <p className="text-xs text-muted-foreground">
                Sessions are kept intentionally lightweight for rapid prototyping.
              </p>
            </div>
          </form>
        </div>
      </div>
    )
  }

  if (step === "complete") {
    return (
      <div className="min-h-screen bg-background px-4 py-10 text-foreground md:px-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card/70 p-6 shadow-2xl md:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Session Complete</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Results Ready</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            The scenario decisions have been written to the local `scenarios` folder and can also be downloaded as a CSV.
          </p>

          <div className="mt-6 grid gap-3 rounded-2xl border border-border bg-background/60 p-4 text-sm text-muted-foreground md:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em]">Participant</p>
              <p className="mt-1 text-foreground">{participant?.name}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em]">Scenarios Saved</p>
              <p className="mt-1 text-foreground">{scenarios.length}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em]">CSV Rows</p>
              <p className="mt-1 text-foreground">{savedRows.length}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={resetSession}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <RotateCcw className="h-4 w-4" />
              Start New Session
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!currentScenario || !participant) return null

  if (scenarioView === "intro") {
    return (
      <div className="min-h-screen bg-background px-4 py-10 text-foreground md:px-6">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl items-center justify-center">
          <div className="w-full rounded-[2rem] border border-border bg-card/80 p-8 text-center shadow-2xl md:p-12">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Scenario {scenarioIndex + 1} of {scenarios.length}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{currentScenario.title}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              {currentScenario.prompt}
            </p>

            <div className="mt-10 flex justify-center">
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setScenarioView("workspace")}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Build Dashboard
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={handleSkipToFinish}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Skip to Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="min-h-screen bg-background text-foreground">
        <div className="border-b border-border bg-card/60 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-5 md:px-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-4xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Scenario {scenarioIndex + 1} of {scenarios.length}
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight">{currentScenario.title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{currentScenario.prompt}</p>
            </div>

            <div className="flex shrink-0 rounded-2xl border border-border bg-background/60 p-4 xl:min-w-[220px] xl:justify-center">
              <div className="flex w-full flex-col gap-3 xl:max-w-[180px]">
                <button
                  onClick={handleSaveScenario}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {scenarioIndex === scenarios.length - 1 ? "Save and Finish" : "Next Scenario"}
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={handleSkipToFinish}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Skip to Finish
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1600px] gap-4 px-4 py-6 md:px-6 xl:grid-cols-[240px_minmax(0,1fr)_240px]">
          <WidgetListZone zoneId="undecided" widgets={zones.undecided} />
          <ShareZone widgets={zones.share} onMoveToDoNotShare={moveWidgetToDoNotShare} />
          <WidgetListZone zoneId="do_not_share" widgets={zones.do_not_share} />
        </div>
      </div>

      <DragOverlay>
        {activeWidget ? (
          <div
            className="rounded-xl border border-primary/40 bg-card p-4 shadow-2xl opacity-95"
            style={{
              width: activeZone === "share" ? 280 : 240,
              height: activeZone === "share" ? 232 : 56,
            }}
          >
            {activeZone === "share" ? (
              <>
                <div className="mb-2 flex items-center gap-2">
                  <span className="cursor-grab text-muted-foreground/50">
                    <LayoutGrid className="h-4 w-4" />
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">{activeWidget.title}</h3>
                </div>
                <div className="h-[calc(100%-2.25rem)] opacity-60">
                  <WidgetRenderer id={activeWidget.id} />
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <LayoutGrid className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{activeWidget.title}</p>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

function WidgetListZone({ zoneId, widgets }: { zoneId: Exclude<ZoneId, "share">; widgets: WidgetConfig[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: zoneContainerIds[zoneId] })
  const isDoNotShare = zoneId === "do_not_share"

  return (
    <section
      ref={setNodeRef}
      className={`rounded-2xl border bg-card/50 transition-colors ${
        isOver ? "border-primary bg-primary/5" : "border-border"
      }`}
    >
      <div className="border-b border-border px-4 py-4">
        <div className="flex items-center gap-2">
          {isDoNotShare ? (
            <EyeOff className="h-4 w-4 text-primary" />
          ) : (
            <LayoutGrid className="h-4 w-4 text-primary" />
          )}
          <h2 className="text-sm font-semibold text-foreground">{zoneTitles[zoneId]}</h2>
        </div>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">{zoneDescriptions[zoneId]}</p>
      </div>

      <div className="min-h-[440px] p-3">
        {widgets.length === 0 ? (
          <div className="flex h-full min-h-[400px] items-center justify-center rounded-xl border border-dashed border-border px-6 text-center text-sm text-muted-foreground">
            {isDoNotShare ? "Drop widgets here to explicitly keep them from the coach." : "Leave widgets here if you want to keep them unclassified in this scenario."}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {widgets.map((widget) => (
              <DraggableBankItem key={widget.id} widget={widget} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ShareZone({
  widgets,
  onMoveToDoNotShare,
}: {
  widgets: WidgetConfig[]
  onMoveToDoNotShare: (id: WidgetId) => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id: zoneContainerIds.share })

  return (
    <section
      ref={setNodeRef}
      className={`rounded-2xl border bg-card/50 transition-colors ${
        isOver ? "border-primary bg-primary/5" : "border-border"
      }`}
    >
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">{zoneTitles.share}</h2>
        </div>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">{zoneDescriptions.share}</p>
      </div>

      <div className="min-h-[680px] p-5">
        {widgets.length === 0 ? (
          <div className="flex h-full min-h-[620px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border px-8 text-center">
            <Eye className="h-8 w-8 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">No Shared Widgets Yet</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Drag widgets here when you want the coach to have view-only access during this scenario.
            </p>
          </div>
        ) : (
          <SortableContext items={widgets.map((widget) => widget.id)} strategy={rectSortingStrategy}>
            <div className="grid content-start grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {widgets.map((widget, index) => (
                <div key={widget.id}>
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Rank {index + 1}
                  </p>
                  <SortableWidget
                    widget={widget}
                    onMoveToDoNotShare={() => onMoveToDoNotShare(widget.id)}
                  />
                </div>
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </section>
  )
}
