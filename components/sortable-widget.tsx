"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { type WidgetConfig, type WidgetId } from "@/lib/mock-data"
import { WidgetRenderer } from "@/components/widget-renderer"
import { GripVertical, X } from "lucide-react"

interface SortableWidgetProps {
  widget: WidgetConfig
  onHide: (id: WidgetId) => void
  isCoach: boolean
}

export function SortableWidget({ widget, onHide, isCoach }: SortableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id, disabled: isCoach })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative h-[280px] rounded-xl border border-border bg-card p-4 transition-shadow ${
        isDragging ? "z-50 opacity-50 shadow-2xl" : "shadow-sm hover:shadow-md"
      }`}
    >
      {/* Card Header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {!isCoach && (
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab touch-none text-muted-foreground/50 transition-colors hover:text-muted-foreground active:cursor-grabbing"
              aria-label={`Drag to reorder ${widget.title}`}
            >
              <GripVertical className="h-4 w-4" />
            </button>
          )}
          <h3 className="text-sm font-semibold text-foreground">{widget.title}</h3>
        </div>
        {!isCoach && (
          <button
            onClick={() => onHide(widget.id)}
            className="rounded-md p-1 text-muted-foreground/0 transition-colors group-hover:text-muted-foreground hover:!bg-destructive/10 hover:!text-destructive"
            aria-label={`Remove ${widget.title}`}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Widget Content */}
      <div className="h-[calc(100%-2rem)]">
        <WidgetRenderer id={widget.id} />
      </div>
    </div>
  )
}
