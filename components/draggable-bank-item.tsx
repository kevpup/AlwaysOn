"use client"

import { type ReactNode } from "react"
import { useDraggable } from "@dnd-kit/core"
import { type WidgetConfig } from "@/lib/mock-data"
import { getWidgetDisplayName } from "@/lib/widget-display-names"
import { type DeviceType } from "@/components/study/types"
import {
  BarChart3,
  GripVertical,
  Heart,
  Moon,
  Clock,
  Battery,
  Flame,
  Activity,
  Dumbbell,
  Footprints,
  Gauge,
  Scale,
  Thermometer,
  Droplets,
} from "lucide-react"

const widgetIcons: Record<string, ReactNode> = {
  steps: <Footprints className="h-4 w-4" />,
  "full-day-hr": <Heart className="h-4 w-4" />,
  "activity-hr-graph": <Activity className="h-4 w-4" />,
  "activity-hr-zones": <BarChart3 className="h-4 w-4" />,
  "resting-hr": <Heart className="h-4 w-4" />,
  "hrv-status": <Activity className="h-4 w-4" />,
  "calories-active-energy": <Flame className="h-4 w-4" />,
  weight: <Scale className="h-4 w-4" />,
  "vo2-max": <Gauge className="h-4 w-4" />,
  "total-sleep-time": <Moon className="h-4 w-4" />,
  "sleep-hours": <Clock className="h-4 w-4" />,
  "sleep-stages-cycles": <Moon className="h-4 w-4" />,
  "sleep-score": <Moon className="h-4 w-4" />,
  "respiratory-rate": <Activity className="h-4 w-4" />,
  "training-load": <Flame className="h-4 w-4" />,
  "recovery-readiness": <Battery className="h-4 w-4" />,
  "cycle-tracking": <Activity className="h-4 w-4" />,
  "activity-workout-minutes": <Dumbbell className="h-4 w-4" />,
  "full-workout-report": <Dumbbell className="h-4 w-4" />,
  "temperature-deviation": <Thermometer className="h-4 w-4" />,
  "blood-oxygen": <Droplets className="h-4 w-4" />,
}

interface DraggableBankItemProps {
  deviceType?: DeviceType
  scenarioId?: string
  widget: WidgetConfig
}

export function DraggableBankItem({ deviceType, scenarioId, widget }: DraggableBankItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: widget.id,
  })
  const displayName = getWidgetDisplayName(widget, { deviceType, scenarioId })

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
        <p className="truncate text-sm font-medium text-foreground">{displayName}</p>
      </div>
    </div>
  )
}
