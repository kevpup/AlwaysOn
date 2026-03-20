"use client"

import { useDraggable } from "@dnd-kit/core"
import { type WidgetConfig } from "@/lib/mock-data"
import {
  GripVertical,
  Heart,
  Moon,
  Clock,
  Battery,
  Flame,
  Activity,
  BookOpen,
  Wine,
  Dumbbell,
  Footprints,
} from "lucide-react"

const widgetIcons: Record<string, React.ReactNode> = {
  "heart-rate": <Heart className="h-4 w-4" />,
  "sleep-graph": <Moon className="h-4 w-4" />,
  "sleep-hours": <Clock className="h-4 w-4" />,
  "recovery": <Battery className="h-4 w-4" />,
  "strain": <Flame className="h-4 w-4" />,
  "hrv": <Activity className="h-4 w-4" />,
  "bedtime-routine": <BookOpen className="h-4 w-4" />,
  "alcohol": <Wine className="h-4 w-4" />,
  "workout-log": <Dumbbell className="h-4 w-4" />,
  "calories": <Flame className="h-4 w-4" />,
  "step-count": <Footprints className="h-4 w-4" />,
}

interface DraggableBankItemProps {
  widget: WidgetConfig
}

export function DraggableBankItem({ widget }: DraggableBankItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: widget.id,
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex cursor-grab items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 transition-all active:cursor-grabbing ${
        isDragging
          ? "z-50 scale-105 border-primary/40 opacity-50 shadow-lg"
          : "hover:border-primary/30 hover:bg-secondary/50"
      }`}
    >
      <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/50" />
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        {widgetIcons[widget.id] || <Activity className="h-4 w-4" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{widget.title}</p>
      </div>
    </div>
  )
}
