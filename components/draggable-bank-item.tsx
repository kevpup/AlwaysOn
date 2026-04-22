"use client"

import { useDraggable } from "@dnd-kit/core"
import { type WidgetConfig } from "@/lib/mock-data"
import { getWidgetDisplayName } from "@/lib/widget-display-names"
import { WidgetRenderer } from "@/components/widgets/widget-renderer"
import { type DeviceType, type SportCategory } from "@/components/study/types"
import { GripVertical } from "lucide-react"

interface DraggableBankItemProps {
  deviceType: DeviceType
  scenarioId?: string
  sportCategory: SportCategory
  widget: WidgetConfig
}

export function DraggableBankItem({ deviceType, scenarioId, sportCategory, widget }: DraggableBankItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: widget.id,
  })
  const displayName = getWidgetDisplayName(widget, { deviceType, scenarioId })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`mx-auto w-full max-w-[220px] cursor-grab rounded-2xl border border-border bg-card/80 p-3 transition-all active:cursor-grabbing ${
        isDragging
          ? "z-50 scale-[1.02] border-primary/40 opacity-50 shadow-lg"
          : "hover:border-primary/30 hover:bg-secondary/40"
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        <p className="truncate text-sm font-semibold text-muted-foreground">{displayName}</p>
      </div>
      <div className="h-[84px] w-full overflow-hidden rounded-xl opacity-70 saturate-75 brightness-90">
        <div className="pointer-events-none h-[168px] w-[200%] origin-top-left scale-50">
          <WidgetRenderer deviceType={deviceType} id={widget.id} sportCategory={sportCategory} />
        </div>
      </div>
    </div>
  )
}
