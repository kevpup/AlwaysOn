import { type WidgetConfig, type WidgetId } from "@/lib/mock-data"

export const allWidgets: WidgetConfig[] = [
  { id: "recovery", title: "Recovery Score" },
  { id: "strain", title: "Strain Score" },
  { id: "sleep-hours", title: "Sleep Hours" },
  { id: "sleep-debt", title: "Sleep Debt" },
  { id: "hrv", title: "HRV" },
  { id: "heart-rate", title: "Heart Rate Chart" },
  { id: "sleep-graph", title: "Sleep Chart" },
  { id: "calories", title: "Calories Burned" },
  { id: "workout-log", title: "Workout Log" },
  { id: "bedtime-routine", title: "Bedtime Routine" },
  { id: "alcohol", title: "Alcohol Consumption" },
  { id: "step-count", title: "Steps" },
  { id: "resting-heart-rate", title: "Resting Heart Rate" },
  { id: "stress-monitor", title: "Stress Monitor" },
  { id: "strain-recovery-trend", title: "Strain vs Recovery" },
  { id: "respiratory-rate", title: "Respiratory Rate" },
  { id: "average-daily-heart-rate", title: "Average Daily HR" },
  { id: "heart-zones-all", title: "HR Zones (All)" },
  { id: "heart-zones-low", title: "Weekly HR Zones 1-3" },
  { id: "heart-zones-high", title: "Weekly HR Zones 4-5" },
  { id: "lean-body-mass", title: "Lean Body Mass" },
  { id: "restorative-sleep", title: "Restorative Sleep" },
  { id: "sleep-consistency", title: "Sleep Consistency" },
  { id: "sleep-efficiency", title: "Sleep Efficiency" },
  { id: "sleep-needed", title: "Sleep Needed" },
  { id: "time-in-bed", title: "Time in Bed" },
  { id: "vo2-max", title: "VO2 Max" },
  { id: "weight", title: "Weight" },
  { id: "sleep-score", title: "Sleep Score" },
  { id: "health-monitor", title: "Health Monitor" },
  { id: "daily-activities", title: "Daily Activities" },
  { id: "bedtime", title: "Bedtime" },
  { id: "journal", title: "Notes" },
  { id: "strength-activity-time", title: "Strength Activity Time" },
]

export const ENABLED_WIDGET_IDS: WidgetId[] = [
  "recovery",
  "strain",
  "resting-heart-rate",
  "heart-rate",
  "sleep-graph",
  "workout-log",
  "journal",
]

export function getEnabledWidgets(enabledIds: WidgetId[] = ENABLED_WIDGET_IDS) {
  return allWidgets.filter((widget) => enabledIds.includes(widget.id))
}

export const defaultWidgets = getEnabledWidgets()
export const WHOOP_UNITE_DEMO_WIDGET_IDS: WidgetId[] = [
  "recovery",
  "strain",
  "resting-heart-rate",
  "heart-rate",
  "sleep-graph",
  "workout-log",
]
