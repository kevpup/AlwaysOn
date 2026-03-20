"use client"

import { useState, useCallback, useMemo } from "react"
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable"
import { defaultWidgets, type WidgetConfig, type WidgetId } from "@/lib/mock-data"
import { SortableWidget } from "@/components/sortable-widget"
import { DraggableBankItem } from "@/components/draggable-bank-item"
import { WidgetRenderer } from "@/components/widget-renderer"
import {
  Activity,
  Maximize2,
  Minimize2,
  GripVertical,
  LayoutGrid,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react"

export function Dashboard() {
  // All widgets start in the bank, none in the display
  const [bankWidgets, setBankWidgets] = useState<WidgetConfig[]>(defaultWidgets)
  const [displayWidgets, setDisplayWidgets] = useState<WidgetConfig[]>([])
  const [activeId, setActiveId] = useState<WidgetId | null>(null)
  const [activeSource, setActiveSource] = useState<"bank" | "display" | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const id = event.active.id as WidgetId
    setActiveId(id)
    // Determine source
    const inBank = bankWidgets.some((w) => w.id === id)
    setActiveSource(inBank ? "bank" : "display")
  }, [bankWidgets])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    const activeWidgetId = active.id as WidgetId

    setActiveId(null)
    setActiveSource(null)

    if (!over) return

    const overId = over.id as string

    // Case 1: Dragging from bank to display area
    if (activeSource === "bank") {
      if (overId === "display-drop-zone" || displayWidgets.some((w) => w.id === overId)) {
        const widget = bankWidgets.find((w) => w.id === activeWidgetId)
        if (widget) {
          setBankWidgets((prev) => prev.filter((w) => w.id !== activeWidgetId))
          
          // If dropped on another widget, insert at that position
          if (overId !== "display-drop-zone") {
            const overIndex = displayWidgets.findIndex((w) => w.id === overId)
            setDisplayWidgets((prev) => {
              const newList = [...prev]
              newList.splice(overIndex, 0, widget)
              return newList
            })
          } else {
            setDisplayWidgets((prev) => [...prev, widget])
          }
        }
      }
    }
    // Case 2: Reordering within display
    else if (activeSource === "display") {
      if (overId === "bank-drop-zone") {
        // Move back to bank
        const widget = displayWidgets.find((w) => w.id === activeWidgetId)
        if (widget) {
          setDisplayWidgets((prev) => prev.filter((w) => w.id !== activeWidgetId))
          setBankWidgets((prev) => [...prev, widget])
        }
      } else if (displayWidgets.some((w) => w.id === overId)) {
        // Reorder within display
        const oldIndex = displayWidgets.findIndex((w) => w.id === activeWidgetId)
        const newIndex = displayWidgets.findIndex((w) => w.id === overId)
        if (oldIndex !== newIndex) {
          setDisplayWidgets((items) => arrayMove(items, oldIndex, newIndex))
        }
      }
    }
  }, [activeSource, bankWidgets, displayWidgets])

  const handleDragCancel = useCallback(() => {
    setActiveId(null)
    setActiveSource(null)
  }, [])

  const removeFromDisplay = useCallback((id: WidgetId) => {
    const widget = displayWidgets.find((w) => w.id === id)
    if (widget) {
      setDisplayWidgets((prev) => prev.filter((w) => w.id !== id))
      setBankWidgets((prev) => [...prev, widget])
    }
  }, [displayWidgets])

  const activeWidget = useMemo(() => {
    if (!activeId) return null
    return bankWidgets.find((w) => w.id === activeId) || displayWidgets.find((w) => w.id === activeId)
  }, [activeId, bankWidgets, displayWidgets])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Widget Bank Sidebar */}
        {!isFullscreen && (
          <WidgetBank
            widgets={bankWidgets}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        )}

        {/* Main Display Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="shrink-0 border-b border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                {isFullscreen && (
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div>
                  <h1 className="text-lg font-semibold text-foreground">
                    {isFullscreen ? "Coach Display" : "Customize Dashboard"}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {isFullscreen
                      ? "Performance Monitoring View"
                      : "Drag widgets from the bank to build your display"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!isFullscreen && (
                  <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
                    aria-label={isSidebarCollapsed ? "Show widget bank" : "Hide widget bank"}
                  >
                    {isSidebarCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
                  </button>
                )}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="flex items-center gap-1.5 rounded-lg border border-border bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  disabled={displayWidgets.length === 0}
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Exit Coach View</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Coach Display</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* Display Grid */}
          <DisplayArea
            widgets={displayWidgets}
            onRemove={removeFromDisplay}
            isFullscreen={isFullscreen}
          />
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeWidget ? (
          <div
            className="rounded-xl border border-primary/40 bg-card p-4 shadow-2xl opacity-95"
            style={{
              width: activeSource === "bank" ? 240 : 320,
              height: activeSource === "bank" ? 52 : 280,
            }}
          >
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">{activeWidget.title}</h3>
            </div>
            {activeSource === "display" && (
              <div className="mt-2 h-[calc(100%-2rem)] opacity-60">
                <WidgetRenderer id={activeWidget.id} />
              </div>
            )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

// Widget Bank Sidebar
function WidgetBank({
  widgets,
  isCollapsed,
  onToggleCollapse,
}: {
  widgets: WidgetConfig[]
  isCollapsed: boolean
  onToggleCollapse: () => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id: "bank-drop-zone" })

  return (
    <aside
      ref={setNodeRef}
      className={`shrink-0 border-r border-border bg-card/30 transition-all duration-300 ${
        isCollapsed ? "w-0 overflow-hidden md:w-16" : "w-72"
      } ${isOver ? "bg-secondary/50" : ""}`}
    >
      <div className="flex h-full flex-col">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <LayoutGrid className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Widget Bank</h2>
                <p className="text-[10px] text-muted-foreground">{widgets.length} available</p>
              </div>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="hidden rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:flex"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>

        {/* Widget List */}
        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto p-3">
            {widgets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-2 rounded-full bg-secondary p-3">
                  <LayoutGrid className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">
                  All widgets added!
                  <br />
                  Drag from display to return.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {widgets.map((widget) => (
                  <DraggableBankItem key={widget.id} widget={widget} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Collapsed state icons */}
        {isCollapsed && (
          <div className="hidden flex-1 flex-col items-center gap-2 overflow-y-auto py-3 md:flex">
            {widgets.slice(0, 8).map((widget) => (
              <div
                key={widget.id}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/50 text-muted-foreground"
                title={widget.title}
              >
                <Activity className="h-4 w-4" />
              </div>
            ))}
            {widgets.length > 8 && (
              <span className="text-[10px] text-muted-foreground">+{widgets.length - 8}</span>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}

// Display Area
function DisplayArea({
  widgets,
  onRemove,
  isFullscreen,
}: {
  widgets: WidgetConfig[]
  onRemove: (id: WidgetId) => void
  isFullscreen: boolean
}) {
  const { setNodeRef, isOver } = useDroppable({ id: "display-drop-zone" })

  return (
    <main
      ref={setNodeRef}
      className={`flex-1 overflow-y-auto p-4 md:p-6 ${
        isOver && widgets.length === 0 ? "bg-primary/5" : ""
      }`}
    >
      {widgets.length === 0 ? (
        <div
          className={`flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-colors ${
            isOver ? "border-primary bg-primary/5" : "border-border"
          }`}
        >
          <div className="mb-4 rounded-full bg-secondary p-4">
            <LayoutGrid className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-1 text-lg font-semibold text-foreground">Drop Widgets Here</h3>
          <p className="max-w-xs text-center text-sm text-muted-foreground">
            Drag metrics from the widget bank on the left to build your custom coach display.
          </p>
        </div>
      ) : (
        <SortableContext items={widgets.map((w) => w.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {widgets.map((widget) => (
              <SortableWidget
                key={widget.id}
                widget={widget}
                onHide={onRemove}
                isCoach={isFullscreen}
              />
            ))}
          </div>
        </SortableContext>
      )}
    </main>
  )
}
