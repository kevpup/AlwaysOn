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

import { zoneContainerIds } from "@/components/study/constants"
import { type WidgetConfig, type WidgetId } from "@/components/study/types"
import { DraggableBankItem } from "@/components/draggable-bank-item"
import { SortableWidget } from "@/components/sortable-widget"
import { WidgetRenderer } from "@/components/widgets/widget-renderer"
import { type Scenario } from "@/lib/scenarios"

interface ScenarioWorkspaceScreenProps {
  activeWidget: WidgetConfig | null
  activeZone: "not_displayed" | "share" | null
  canGoBack: boolean
  onBack: () => void
  onDragCancel: () => void
  onDragEnd: (event: DragEndEvent) => void
  onDragStart: (event: DragStartEvent) => void
  onMoveToNotDisplayed: (id: WidgetId) => void
  onContinue: () => void
  continueLabel: string
  selectionTitle: string
  selectedTitle: string
  removeLabel?: string
  scenario: Scenario
  scenarioIndex: number
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
  onBack,
  onDragCancel,
  onDragEnd,
  onDragStart,
  onMoveToNotDisplayed,
  onContinue,
  continueLabel,
  selectionTitle,
  selectedTitle,
  removeLabel = "Remove",
  scenario,
  scenarioIndex,
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
          <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-6 md:px-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-5xl">
              <p className="text-base font-medium uppercase tracking-[0.24em] text-primary md:text-lg">
                Scenario {scenarioIndex + 1} of {totalScenarios}
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">{scenario.title}</h1>
              <p className="mt-5 max-w-5xl text-2xl leading-tight text-muted-foreground md:text-3xl">
                {scenario.prompt}
              </p>
            </div>

            <div className="flex shrink-0 rounded-3xl border border-border bg-background/70 p-4 xl:min-w-[300px] xl:justify-center">
              <div className="flex w-full flex-col gap-4">
                {canGoBack ? (
                  <button
                    onClick={onBack}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-background px-5 py-5 text-lg font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>
                ) : null}
                <button
                  onClick={onContinue}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-5 py-5 text-lg font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {continueLabel}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1600px] gap-5 px-4 py-6 md:px-6 xl:grid-cols-[248px_minmax(0,1fr)]">
          <WidgetListZone
            title={selectionTitle}
            zoneId="not_displayed"
            widgets={zones.not_displayed}
          />
          <ShareZone
            onMoveToNotDisplayed={onMoveToNotDisplayed}
            removeLabel={removeLabel}
            title={selectedTitle}
            widgets={zones.share}
          />
        </div>
      </div>

      <DragOverlay>
        {activeWidget ? (
          <div
            className="rounded-xl border border-primary/40 bg-card p-4 shadow-2xl opacity-95"
            style={{
              width: activeZone === "share" ? 280 : 320,
              height: activeZone === "share" ? 232 : 210,
            }}
          >
            {activeZone === "share" ? (
              <>
                <div className="mb-2 flex items-center gap-2">
                  <span className="cursor-grab text-muted-foreground/50">
                    <LayoutGrid className="h-4 w-4" />
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{activeWidget.title}</h3>
                </div>
                <div className="h-[calc(100%-2.25rem)] opacity-60">
                  <WidgetRenderer id={activeWidget.id} />
                </div>
              </>
            ) : (
              <>
                <div className="mb-3 flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                  <p className="text-base font-semibold text-muted-foreground">{activeWidget.title}</p>
                </div>
                <div className="h-[calc(100%-2rem)] overflow-hidden rounded-xl opacity-70 saturate-75 brightness-90">
                  <div className="pointer-events-none h-[168px] w-[200%] origin-top-left scale-50">
                    <WidgetRenderer id={activeWidget.id} />
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
  title,
  zoneId,
  widgets,
}: {
  title: string
  zoneId: "not_displayed"
  widgets: WidgetConfig[]
}) {
  const { setNodeRef, isOver } = useDroppable({ id: zoneContainerIds[zoneId] })

  return (
    <section
      ref={setNodeRef}
      className={`flex flex-col rounded-2xl border bg-card/50 transition-colors ${
        isOver ? "border-primary bg-primary/5" : "border-border"
      }`}
    >
      <div className="border-b border-border px-4 py-4">
        <div className="flex items-center gap-2">
          <EyeOff className="h-4 w-4 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        </div>
      </div>

      <div className="min-h-[440px] p-3 xl:h-[680px] xl:overflow-y-auto">
        {widgets.length === 0 ? (
          <div className="flex h-full min-h-[400px] items-center justify-center rounded-xl border border-dashed border-border px-6 text-center text-lg leading-8 text-muted-foreground">
            Drag a card back here when it should not be included in this audience view.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
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
  onMoveToNotDisplayed,
  removeLabel,
  title,
}: {
  widgets: WidgetConfig[]
  onMoveToNotDisplayed: (id: WidgetId) => void
  removeLabel: string
  title: string
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
          <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        </div>
      </div>

      <div className="min-h-[680px] p-5">
        {widgets.length === 0 ? (
          <div className="flex h-full min-h-[620px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border px-8 text-center">
            <Eye className="h-8 w-8 text-muted-foreground" />
            <h3 className="mt-4 text-2xl font-semibold text-foreground">No Selected Widgets Yet</h3>
          </div>
        ) : (
          <SortableContext items={widgets.map((widget) => widget.id)} strategy={rectSortingStrategy}>
            <div className="grid content-start grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {widgets.map((widget, index) => (
                  <div key={widget.id}>
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      Priority {index + 1}
                    </p>
                    <SortableWidget
                      removeLabel={removeLabel}
                      widget={widget}
                      onMoveToNotDisplayed={() => onMoveToNotDisplayed(widget.id)}
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
