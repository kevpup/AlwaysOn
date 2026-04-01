"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { type WidgetConfig } from "@/lib/mock-data"
import { WidgetRenderer } from "@/components/widgets/widget-renderer"
import { EyeOff, GripVertical } from "lucide-react"

interface SortableWidgetProps {
  widget: WidgetConfig
  disableSorting?: boolean
  onMoveToNotDisplayed?: () => void
  removeLabel?: string
}

export function SortableWidget({
  widget,
  disableSorting = false,
  onMoveToNotDisplayed,
  removeLabel = "Remove",
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative h-[232px] rounded-xl border border-border bg-card p-3 transition-shadow ${
        isDragging ? "z-50 opacity-50 shadow-2xl" : "shadow-sm hover:shadow-md"
      }`}
    >
      {/* Card Header */}
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {!disableSorting && (
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab touch-none text-muted-foreground/50 transition-colors hover:text-muted-foreground active:cursor-grabbing"
              aria-label={`Drag to reorder ${widget.title}`}
            >
              <GripVertical className="h-4 w-4" />
            </button>
          )}
          <h3 className="text-base font-semibold text-foreground">{widget.title}</h3>
        </div>
        {onMoveToNotDisplayed && (
          <button
            type="button"
            onClick={onMoveToNotDisplayed}
            className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <EyeOff className="h-3 w-3" />
            {removeLabel}
          </button>
        )}
      </div>

      {/* Widget Content */}
      <div className="h-[calc(100%-2.25rem)]">
        <WidgetRenderer id={widget.id} />
      </div>
    </div>
  )
}
