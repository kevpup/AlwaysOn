// Heart rate data — 24-hour window, every 15 minutes
export const heartRateData = Array.from({ length: 96 }, (_, i) => {
  const hour = Math.floor(i / 4)
  const minute = (i % 4) * 15
  const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`

  let base: number
  if (hour >= 0 && hour < 6) base = 52 + Math.random() * 8 // sleeping
  else if (hour >= 6 && hour < 8) base = 70 + Math.random() * 15 // waking
  else if (hour >= 8 && hour < 10) base = 130 + Math.random() * 55 // training
  else if (hour >= 10 && hour < 12) base = 75 + Math.random() * 15 // recovery
  else if (hour >= 12 && hour < 14) base = 80 + Math.random() * 10 // lunch
  else if (hour >= 14 && hour < 16) base = 140 + Math.random() * 50 // afternoon training
  else if (hour >= 16 && hour < 18) base = 85 + Math.random() * 10 // cool down
  else if (hour >= 18 && hour < 20) base = 75 + Math.random() * 10 // dinner
  else base = 60 + Math.random() * 10 // evening

  return { time, hr: Math.round(base) }
})

// Sleep stages data
export const sleepStagesData = [
  { time: "22:00", deep: 0, light: 30, rem: 0 },
  { time: "22:30", deep: 25, light: 5, rem: 0 },
  { time: "23:00", deep: 30, light: 0, rem: 0 },
  { time: "23:30", deep: 28, light: 2, rem: 0 },
  { time: "00:00", deep: 15, light: 10, rem: 5 },
  { time: "00:30", deep: 5, light: 15, rem: 10 },
  { time: "01:00", deep: 0, light: 10, rem: 20 },
  { time: "01:30", deep: 0, light: 5, rem: 25 },
  { time: "02:00", deep: 10, light: 15, rem: 5 },
  { time: "02:30", deep: 25, light: 5, rem: 0 },
  { time: "03:00", deep: 20, light: 10, rem: 0 },
  { time: "03:30", deep: 10, light: 15, rem: 5 },
  { time: "04:00", deep: 0, light: 10, rem: 20 },
  { time: "04:30", deep: 0, light: 5, rem: 25 },
  { time: "05:00", deep: 5, light: 20, rem: 5 },
  { time: "05:30", deep: 0, light: 25, rem: 5 },
  { time: "06:00", deep: 0, light: 20, rem: 10 },
  { time: "06:30", deep: 0, light: 15, rem: 15 },
  { time: "07:00", deep: 0, light: 25, rem: 5 },
  { time: "07:30", deep: 0, light: 30, rem: 0 },
]

// Sleep hours — past 7 days
export const sleepHoursData = [
  { day: "Mon", hours: 7.2 },
  { day: "Tue", hours: 8.1 },
  { day: "Wed", hours: 6.9 },
  { day: "Thu", hours: 7.8 },
  { day: "Fri", hours: 8.3 },
  { day: "Sat", hours: 7.5 },
  { day: "Sun", hours: 7.8 },
]

// Sleep debt — cumulative shortfall vs. 8-hour target
export const sleepDebtData = [
  { day: "Mon", debt: 0.8 },
  { day: "Tue", debt: 0.7 },
  { day: "Wed", debt: 1.8 },
  { day: "Thu", debt: 2.0 },
  { day: "Fri", debt: 1.7 },
  { day: "Sat", debt: 1.2 },
  { day: "Sun", debt: 1.4 },
]

// HRV — past 7 days
export const hrvData = [
  { day: "Mon", hrv: 58 },
  { day: "Tue", hrv: 62 },
  { day: "Wed", hrv: 55 },
  { day: "Thu", hrv: 68 },
  { day: "Fri", hrv: 72 },
  { day: "Sat", hrv: 65 },
  { day: "Sun", hrv: 65 },
]

// Calories — past 7 days
export const caloriesData = [
  { day: "Mon", calories: 2450 },
  { day: "Tue", calories: 2820 },
  { day: "Wed", calories: 2100 },
  { day: "Thu", calories: 2680 },
  { day: "Fri", calories: 3150 },
  { day: "Sat", calories: 2340 },
  { day: "Sun", calories: 2560 },
]

// Journal — bedtime routine habits
export const bedtimeRoutineData = [
  { habit: "Stretching", mon: 1, tue: 1, wed: 0, thu: 1, fri: 1, sat: 0, sun: 1, total: 5 },
  { habit: "Reading", mon: 1, tue: 0, wed: 1, thu: 1, fri: 0, sat: 1, sun: 1, total: 5 },
  { habit: "Phone Use", mon: 1, tue: 1, wed: 1, thu: 0, fri: 1, sat: 1, sun: 0, total: 5 },
  { habit: "Meditation", mon: 0, tue: 1, wed: 0, thu: 1, fri: 0, sat: 0, sun: 1, total: 3 },
  { habit: "Hydration", mon: 1, tue: 1, wed: 1, thu: 1, fri: 1, sat: 1, sun: 1, total: 7 },
]

// Journal — alcohol consumption
export const alcoholData = [
  { day: "Mon", drinks: 0 },
  { day: "Tue", drinks: 0 },
  { day: "Wed", drinks: 1 },
  { day: "Thu", drinks: 0 },
  { day: "Fri", drinks: 2 },
  { day: "Sat", drinks: 3 },
  { day: "Sun", drinks: 0 },
]

// Workout log
export const workoutLog = [
  { id: 1, type: "Sprint Intervals", duration: "45 min", intensity: "High", calories: 520, date: "Feb 13" },
  { id: 2, type: "Weight Training", duration: "60 min", intensity: "High", calories: 480, date: "Feb 12" },
  { id: 3, type: "Recovery Swim", duration: "30 min", intensity: "Low", calories: 210, date: "Feb 12" },
  { id: 4, type: "Tempo Run", duration: "50 min", intensity: "Medium", calories: 580, date: "Feb 11" },
  { id: 5, type: "Plyometrics", duration: "35 min", intensity: "High", calories: 390, date: "Feb 10" },
  { id: 6, type: "Yoga & Mobility", duration: "40 min", intensity: "Low", calories: 150, date: "Feb 10" },
  { id: 7, type: "Hill Repeats", duration: "55 min", intensity: "High", calories: 620, date: "Feb 9" },
  { id: 8, type: "Core Circuit", duration: "25 min", intensity: "Medium", calories: 280, date: "Feb 8" },
]

// Step count — past 7 days
export const stepCountData = [
  { day: "Mon", steps: 8420 },
  { day: "Tue", steps: 12350 },
  { day: "Wed", steps: 6780 },
  { day: "Thu", steps: 10940 },
  { day: "Fri", steps: 14210 },
  { day: "Sat", steps: 9870 },
  { day: "Sun", steps: 11530 },
]

export const restingHeartRateData = [
  { day: "Mon", value: 49 },
  { day: "Tue", value: 50 },
  { day: "Wed", value: 48 },
  { day: "Thu", value: 51 },
  { day: "Fri", value: 50 },
  { day: "Sat", value: 49 },
  { day: "Sun", value: 48 },
]

export const stressMonitorData = [
  { time: "06:00", value: 18 },
  { time: "08:00", value: 34 },
  { time: "10:00", value: 52 },
  { time: "12:00", value: 41 },
  { time: "14:00", value: 67 },
  { time: "16:00", value: 58 },
  { time: "18:00", value: 39 },
  { time: "20:00", value: 29 },
  { time: "22:00", value: 22 },
]

export const strainRecoveryTrendData = [
  { day: "Mon", strain: 13.4, recovery: 69 },
  { day: "Tue", strain: 15.8, recovery: 61 },
  { day: "Wed", strain: 10.2, recovery: 78 },
  { day: "Thu", strain: 16.1, recovery: 58 },
  { day: "Fri", strain: 14.7, recovery: 71 },
  { day: "Sat", strain: 12.3, recovery: 74 },
  { day: "Sun", strain: 11.5, recovery: 76 },
]

export const respiratoryRateData = [
  { day: "Mon", value: 14.1 },
  { day: "Tue", value: 14.3 },
  { day: "Wed", value: 14.0 },
  { day: "Thu", value: 14.4 },
  { day: "Fri", value: 14.2 },
  { day: "Sat", value: 14.1 },
  { day: "Sun", value: 13.9 },
]

export const averageDailyHeartRateData = [
  { day: "Mon", value: 71 },
  { day: "Tue", value: 74 },
  { day: "Wed", value: 69 },
  { day: "Thu", value: 76 },
  { day: "Fri", value: 73 },
  { day: "Sat", value: 70 },
  { day: "Sun", value: 68 },
]

export const heartZoneDistributionData = [
  { label: "Z1", minutes: 148, color: "hsl(160, 60%, 45%)" },
  { label: "Z2", minutes: 96, color: "hsl(190, 68%, 52%)" },
  { label: "Z3", minutes: 74, color: "hsl(35, 90%, 55%)" },
  { label: "Z4", minutes: 41, color: "hsl(12, 84%, 58%)" },
  { label: "Z5", minutes: 19, color: "hsl(0, 72%, 51%)" },
]

export const leanBodyMassData = [
  { month: "Jan", value: 146.2 },
  { month: "Feb", value: 146.5 },
  { month: "Mar", value: 147.1 },
  { month: "Apr", value: 147.4 },
]

export const restorativeSleepData = [
  { day: "Mon", percent: 34, hours: 2.5 },
  { day: "Tue", percent: 36, hours: 2.9 },
  { day: "Wed", percent: 31, hours: 2.1 },
  { day: "Thu", percent: 39, hours: 3.0 },
  { day: "Fri", percent: 37, hours: 2.8 },
  { day: "Sat", percent: 41, hours: 3.2 },
  { day: "Sun", percent: 38, hours: 2.9 },
]

export const sleepConsistencyData = [
  { day: "Mon", value: 83 },
  { day: "Tue", value: 86 },
  { day: "Wed", value: 78 },
  { day: "Thu", value: 81 },
  { day: "Fri", value: 76 },
  { day: "Sat", value: 88 },
  { day: "Sun", value: 84 },
]

export const sleepEfficiencyData = [
  { day: "Mon", value: 91 },
  { day: "Tue", value: 93 },
  { day: "Wed", value: 88 },
  { day: "Thu", value: 92 },
  { day: "Fri", value: 90 },
  { day: "Sat", value: 94 },
  { day: "Sun", value: 92 },
]

export const sleepNeededData = [
  { day: "Mon", hours: 8.4 },
  { day: "Tue", hours: 8.1 },
  { day: "Wed", hours: 8.8 },
  { day: "Thu", hours: 8.3 },
  { day: "Fri", hours: 8.2 },
  { day: "Sat", hours: 7.9 },
  { day: "Sun", hours: 8.0 },
]

export const timeInBedData = [
  { day: "Mon", hours: 7.9 },
  { day: "Tue", hours: 8.6 },
  { day: "Wed", hours: 7.4 },
  { day: "Thu", hours: 8.1 },
  { day: "Fri", hours: 8.5 },
  { day: "Sat", hours: 8.0 },
  { day: "Sun", hours: 8.2 },
]

export const vo2MaxData = [
  { month: "Nov", value: 52.1 },
  { month: "Dec", value: 52.6 },
  { month: "Jan", value: 53.0 },
  { month: "Feb", value: 53.4 },
  { month: "Mar", value: 53.8 },
]

export const weightData = [
  { month: "Nov", value: 178.4 },
  { month: "Dec", value: 177.9 },
  { month: "Jan", value: 178.1 },
  { month: "Feb", value: 177.6 },
  { month: "Mar", value: 177.2 },
]

export const sleepScoreData = [
  { day: "Mon", value: 81 },
  { day: "Tue", value: 86 },
  { day: "Wed", value: 74 },
  { day: "Thu", value: 83 },
  { day: "Fri", value: 88 },
  { day: "Sat", value: 84 },
  { day: "Sun", value: 87 },
]

export const healthMonitorData = [
  { label: "Respiratory Rate", status: "In range", value: "13.9 rpm" },
  { label: "Blood Oxygen", status: "In range", value: "97%" },
  { label: "Resting HR", status: "In range", value: "48 bpm" },
  { label: "Skin Temp", status: "Out of range", value: "+0.4 F" },
  { label: "HRV", status: "In range", value: "65 ms" },
]

export const dailyActivitiesData = [
  { label: "Walk", duration: "42 min", energy: "246 cal" },
  { label: "Lift", duration: "51 min", energy: "412 cal" },
  { label: "Mobility", duration: "23 min", energy: "118 cal" },
  { label: "Run", duration: "34 min", energy: "368 cal" },
]

export const bedtimeData = [
  { day: "Mon", value: "10:42 PM" },
  { day: "Tue", value: "10:55 PM" },
  { day: "Wed", value: "11:18 PM" },
  { day: "Thu", value: "10:48 PM" },
  { day: "Fri", value: "11:06 PM" },
  { day: "Sat", value: "10:39 PM" },
  { day: "Sun", value: "10:51 PM" },
]

export const journalSummaryData = [
  { label: "Alcohol", count: 2 },
  { label: "Late Meal", count: 1 },
  { label: "Caffeine PM", count: 3 },
  { label: "Meditation", count: 4 },
]

export const strengthActivityTimeData = [
  { day: "Mon", minutes: 42 },
  { day: "Tue", minutes: 0 },
  { day: "Wed", minutes: 55 },
  { day: "Thu", minutes: 30 },
  { day: "Fri", minutes: 48 },
  { day: "Sat", minutes: 0 },
  { day: "Sun", minutes: 36 },
]

// Widget definitions
export type WidgetId =
  | "heart-rate"
  | "sleep-graph"
  | "sleep-hours"
  | "sleep-debt"
  | "recovery"
  | "strain"
  | "hrv"
  | "bedtime-routine"
  | "alcohol"
  | "workout-log"
  | "calories"
  | "step-count"
  | "resting-heart-rate"
  | "stress-monitor"
  | "strain-recovery-trend"
  | "respiratory-rate"
  | "average-daily-heart-rate"
  | "heart-zones-all"
  | "heart-zones-low"
  | "heart-zones-high"
  | "lean-body-mass"
  | "restorative-sleep"
  | "sleep-consistency"
  | "sleep-efficiency"
  | "sleep-needed"
  | "time-in-bed"
  | "vo2-max"
  | "weight"
  | "sleep-score"
  | "health-monitor"
  | "daily-activities"
  | "bedtime"
  | "journal"
  | "strength-activity-time"

export interface WidgetConfig {
  id: WidgetId
  title: string
}
