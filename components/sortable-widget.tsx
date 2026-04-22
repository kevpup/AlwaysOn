"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { type WidgetConfig } from "@/lib/mock-data"
import { getWidgetDisplayName } from "@/lib/widget-display-names"
import { WidgetRenderer } from "@/components/widgets/widget-renderer"
import { type DeviceType, type SportCategory } from "@/components/study/types"
import { EyeOff } from "lucide-react"

interface SortableWidgetProps {
  deviceType: DeviceType
  scenarioId?: string
  widget: WidgetConfig
  disableSorting?: boolean
  onMoveToNotDisplayed?: () => void
  sportCategory: SportCategory
}

export function SortableWidget({
  deviceType,
  scenarioId,
  widget,
  disableSorting = false,
  onMoveToNotDisplayed,
  sportCategory,
}: SortableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id, disabled: disableSorting })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  const displayName = getWidgetDisplayName(widget, { deviceType, scenarioId })

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      aria-label={disableSorting ? displayName : `Drag to reorder ${displayName}`}
      className={`group relative aspect-square w-full cursor-grab overflow-hidden active:cursor-grabbing ${
        isDragging ? "z-50 opacity-50" : ""
      }`}
    >
      {onMoveToNotDisplayed && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onMoveToNotDisplayed()
          }}
          onPointerDown={(event) => event.stopPropagation()}
          className="absolute right-2 top-2 z-20 inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground opacity-0 shadow-sm backdrop-blur-sm transition-all hover:text-foreground group-hover:opacity-100"
        >
          <EyeOff className="h-3 w-3" />
          Hide from Coach
        </button>
      )}

      <div className="h-full w-full">
        <WidgetRenderer deviceType={deviceType} id={widget.id} sportCategory={sportCategory} />
      </div>
    </div>
  )
}
