import { type DeviceType } from "@/components/study/types"
import { type WidgetConfig, type WidgetId } from "@/lib/mock-data"

type WidgetDisplayNameContext = {
  deviceType?: DeviceType | null
  scenarioId?: string | null
}

const appleWidgetDisplayNames: Partial<Record<WidgetId, string>> = {
  steps: "Steps",
  "full-day-hr": "HR Graph",
  "activity-hr-graph": "Activity HR",
  "resting-hr": "Resting HR",
  "hrv-status": "HRV",
  "calories-active-energy": "Active Energy",
  weight: "Weight",
  "vo2-max": "VO2 Max",
  "total-sleep-time": "Sleep Duration",
  "sleep-hours": "Sleep Hours",
  "sleep-stages-cycles": "Sleep Stages",
  "sleep-score": "Sleep Score",
  "respiratory-rate": "Respiratory Rate",
  "training-load": "Training Load",
  "recovery-readiness": "Vitals",
  "cycle-tracking": "Cycle Tracking",
  "activity-workout-minutes": "Activity Minutes",
  "full-workout-report": "Workout History",
  "temperature-deviation": "Temperature Deviation",
  "blood-oxygen": "SpO2",
}

export function getWidgetDisplayName(widget: WidgetConfig, context: WidgetDisplayNameContext = {}) {
  if (context.deviceType === "apple-watch") {
    return appleWidgetDisplayNames[widget.id] ?? widget.title
  }

  return widget.title
}
