"use client"

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
import { SortableContext, rectSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { ChevronLeft, ChevronRight, Eye, EyeOff, LayoutGrid } from "lucide-react"

import { zoneContainerIds, zoneDescriptions, zoneTitles } from "@/components/study/constants"
import { type DeviceType, type SportCategory, type WidgetConfig, type WidgetId } from "@/components/study/types"
import { DraggableBankItem } from "@/components/draggable-bank-item"
import { SortableWidget } from "@/components/sortable-widget"
import { WidgetRenderer } from "@/components/widgets/widget-renderer"
import { getWidgetDisplayName } from "@/lib/widget-display-names"
import { type Scenario } from "@/lib/scenarios"

interface ScenarioWorkspaceScreenProps {
  activeWidget: WidgetConfig | null
  activeZone: "not_displayed" | "share" | null
  canGoBack: boolean
  deviceType: DeviceType
  onBack: () => void
  onDragCancel: () => void
  onDragEnd: (event: DragEndEvent) => void
  onDragStart: (event: DragStartEvent) => void
  onMoveToNotDisplayed: (id: WidgetId) => void
  onReviewCoachView: () => void
  onSkipToFinish: () => void
  scenario: Scenario
  scenarioIndex: number
  sportCategory: SportCategory
  totalScenarios: number
  zones: {
    not_displayed: WidgetConfig[]
    share: WidgetConfig[]
  }
}

export function ScenarioWorkspaceScreen({
  activeWidget,
  activeZone,
  canGoBack,
  deviceType,
  onBack,
  onDragCancel,
  onDragEnd,
  onDragStart,
  onMoveToNotDisplayed,
  onReviewCoachView,
  onSkipToFinish,
  scenario,
  scenarioIndex,
  sportCategory,
  totalScenarios,
  zones,
}: ScenarioWorkspaceScreenProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <div className="min-h-screen bg-background text-foreground">
        <div className="border-b border-border bg-card/60 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-5 md:px-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-4xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Scenario {scenarioIndex + 1} of {totalScenarios}
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight">{scenario.title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{scenario.prompt}</p>
            </div>

            <div className="flex shrink-0 rounded-2xl border border-border bg-background/60 p-4 xl:min-w-[220px] xl:justify-center">
              <div className="flex w-full flex-col gap-3 xl:max-w-[180px]">
                {canGoBack ? (
                  <button
                    onClick={onBack}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>
                ) : null}
                <button
                  onClick={onReviewCoachView}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Review Coach View
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={onSkipToFinish}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Skip to Finish
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1600px] gap-4 px-4 py-6 md:px-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <WidgetListZone
            deviceType={deviceType}
            scenarioId={scenario.id}
            sportCategory={sportCategory}
            zoneId="not_displayed"
            widgets={zones.not_displayed}
          />
          <ShareZone
            deviceType={deviceType}
            scenarioId={scenario.id}
            widgets={zones.share}
            onMoveToNotDisplayed={onMoveToNotDisplayed}
            sportCategory={sportCategory}
          />
        </div>
      </div>

      <DragOverlay>
        {activeWidget ? (
          <div
            className="overflow-hidden rounded-xl border border-primary/40 bg-card p-3 opacity-95 shadow-2xl"
            style={{
              width: activeZone === "share" ? 340 : 240,
              height: activeZone === "share" ? 340 : 210,
            }}
          >
            {activeZone === "share" ? (
              <div className="h-full w-full">
                <WidgetRenderer deviceType={deviceType} id={activeWidget.id} sportCategory={sportCategory} />
              </div>
            ) : (
              <>
                <div className="mb-3 flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                  <p className="truncate text-sm font-semibold text-muted-foreground">
                    {getWidgetDisplayName(activeWidget, { deviceType, scenarioId: scenario.id })}
                  </p>
                </div>
                <div className="h-[168px] w-full overflow-hidden rounded-xl opacity-70 saturate-75 brightness-90">
                  <div className="pointer-events-none h-[336px] w-[200%] origin-top-left scale-50">
                    <WidgetRenderer deviceType={deviceType} id={activeWidget.id} sportCategory={sportCategory} />
                  </div>
                </div>
              </>
            )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

function WidgetListZone({
  deviceType,
  scenarioId,
  sportCategory,
  zoneId,
  widgets,
}: {
  deviceType: DeviceType
  scenarioId: string
  sportCategory: SportCategory
  zoneId: "not_displayed"
  widgets: WidgetConfig[]
}) {
  const { setNodeRef, isOver } = useDroppable({ id: zoneContainerIds[zoneId] })

  return (
    <section
      ref={setNodeRef}
      className={`rounded-2xl border bg-card/50 transition-colors ${
        isOver ? "border-primary bg-primary/5" : "border-border"
      }`}
    >
      <div className="border-b border-border px-4 py-4">
        <div className="flex items-center gap-2">
          <EyeOff className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">{zoneTitles[zoneId]}</h2>
        </div>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">{zoneDescriptions[zoneId]}</p>
      </div>

      <div className="min-h-[440px] p-3 xl:h-[680px] xl:overflow-y-auto">
        {widgets.length === 0 ? (
          <div className="flex h-full min-h-[400px] items-center justify-center rounded-xl border border-dashed border-border px-6 text-center text-sm text-muted-foreground">
            Drop widgets here when they should not appear on the coach view.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {widgets.map((widget) => (
              <DraggableBankItem
                key={widget.id}
                deviceType={deviceType}
                scenarioId={scenarioId}
                sportCategory={sportCategory}
                widget={widget}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ShareZone({
  deviceType,
  scenarioId,
  widgets,
  onMoveToNotDisplayed,
  sportCategory,
}: {
  deviceType: DeviceType
  scenarioId: string
  widgets: WidgetConfig[]
  onMoveToNotDisplayed: (id: WidgetId) => void
  sportCategory: SportCategory
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
            <div className="flex flex-wrap content-start justify-start gap-4">
              {widgets.map((widget) => (
                <div key={widget.id} className="w-full max-w-[360px] sm:w-[360px]">
                  <SortableWidget
                    deviceType={deviceType}
                    scenarioId={scenarioId}
                    widget={widget}
                    onMoveToNotDisplayed={() => onMoveToNotDisplayed(widget.id)}
                    sportCategory={sportCategory}
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
