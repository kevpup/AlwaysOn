import { type DeviceType } from "@/components/study/types"
import { type WidgetConfig, type WidgetId } from "@/lib/mock-data"

type WidgetDisplayNameContext = {
  deviceType?: DeviceType | null
  scenarioId?: string | null
}

const appleWidgetDisplayNames: Partial<Record<WidgetId, string>> = {
  "full-day-hr": "HR Graph",
  "activity-hr-graph": "Activity Data",
  "resting-hr": "Resting HR",
  "hrv-status": "HRV",
  "calories-active-energy": "Active Energy",
  "vo2-max": "VO2 Max",
  "total-sleep-time": "Sleep Report",
  "sleep-score": "Sleep Score",
  "respiratory-rate": "Respiratory Rate",
  "training-load": "Training Load",
  "recovery-readiness": "Vitals",
  "cycle-tracking": "Cycle Tracking",
  "full-workout-report": "Workout History",
  "temperature-deviation": "Temperature Deviation",
  "blood-oxygen": "SpO2",
}

const whoopWidgetDisplayNames: Partial<Record<WidgetId, string>> = {
  "full-day-hr": "Heart Rate",
  "activity-hr-graph": "Activity Data",
  "resting-hr": "Resting Heart Rate",
  "hrv-status": "HRV",
  "calories-active-energy": "Calories",
  "vo2-max": "VO2 Max",
  "total-sleep-time": "Sleep Report",
  "sleep-score": "Sleep Score",
  "respiratory-rate": "Respiratory Rate",
  "training-load": "Strain",
  "recovery-readiness": "Recovery",
  "cycle-tracking": "Cycle Tracking",
  "full-workout-report": "Workout Report",
  "temperature-deviation": "Skin Temperature",
  "blood-oxygen": "Blood Oxygen (SpO2)",
}

const garminWidgetDisplayNames: Partial<Record<WidgetId, string>> = {
  "full-day-hr": "Heart Rate",
  "activity-hr-graph": "Activity Data",
  "resting-hr": "Resting Heart Rate",
  "hrv-status": "HRV",
  "calories-active-energy": "Calories",
  "vo2-max": "VO2 Max",
  "total-sleep-time": "Sleep Report",
  "sleep-score": "Sleep Score",
  "respiratory-rate": "Respiratory Rate",
  "training-load": "Training Load",
  "recovery-readiness": "Body Battery",
  "cycle-tracking": "Cycle Tracking",
  "full-workout-report": "Workout Report",
  "temperature-deviation": "Skin Temperature",
  "blood-oxygen": "Blood Oxygen",
}

const ouraWidgetDisplayNames: Partial<Record<WidgetId, string>> = {
  "full-day-hr": "Heart Rate",
  "activity-hr-graph": "Activity Data",
  "resting-hr": "Lowest Heart Rate",
  "hrv-status": "Average HRV",
  "calories-active-energy": "Active Calorie Burn",
  "vo2-max": "Cardio Capacity",
  "total-sleep-time": "Sleep Stages",
  "sleep-score": "Sleep",
  "respiratory-rate": "Respiratory Rate",
  "training-load": "Daytime Stress",
  "recovery-readiness": "Readiness",
  "cycle-tracking": "Cycle Tracking",
  "full-workout-report": "Workout Report",
  "temperature-deviation": "Temperature Deviation",
  "blood-oxygen": "Average Oxygen Saturation",
}

const widgetDisplayNamesByDevice: Partial<Record<DeviceType, Partial<Record<WidgetId, string>>>> = {
  "apple-watch": appleWidgetDisplayNames,
  whoop: whoopWidgetDisplayNames,
  garmin: garminWidgetDisplayNames,
  oura: ouraWidgetDisplayNames,
}

export function getWidgetDisplayName(widget: WidgetConfig, context: WidgetDisplayNameContext = {}) {
  if (context.deviceType) {
    return widgetDisplayNamesByDevice[context.deviceType]?.[widget.id] ?? widget.title
  }

  return widget.title
}
