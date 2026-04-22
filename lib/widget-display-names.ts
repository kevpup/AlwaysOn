import { type DeviceType } from "@/components/study/types"
import { type WidgetConfig, type WidgetId } from "@/lib/mock-data"

type WidgetDisplayNameContext = {
  deviceType?: DeviceType | null
  scenarioId?: string | null
}

const appleWidgetDisplayNames: Partial<Record<WidgetId, string>> = {
  steps: "steps",
  "full-day-hr": "HR graph",
  "activity-hr-graph": "Activity HR",
  "resting-hr": "Resting HR",
  "hrv-status": "HRV",
  "calories-active-energy": "Active energy",
  weight: "weight",
  "vo2-max": "V02 max",
  "total-sleep-time": "sleep duration",
  "sleep-hours": "sleep stages",
  "sleep-stages-cycles": "sleep stages",
  "sleep-score": "Sleep score",
  "respiratory-rate": "Respritory rate",
  "training-load": "Training load",
  "recovery-readiness": "Vitals",
  "cycle-tracking": "Cycle tracking",
  "activity-workout-minutes": "Activity minutes",
  "full-workout-report": "Workout history",
  "temperature-deviation": "Tempature deviation",
  "blood-oxygen": "Sp02",
}

export function getWidgetDisplayName(widget: WidgetConfig, context: WidgetDisplayNameContext = {}) {
  if (context.deviceType === "apple-watch") {
    return appleWidgetDisplayNames[widget.id] ?? widget.title
  }

  return widget.title
}
