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

export interface WidgetConfig {
  id: WidgetId
  title: string
}

export const defaultWidgets: WidgetConfig[] = [
  { id: "recovery", title: "Recovery Score" },
  { id: "strain", title: "Strain Score" },
  { id: "sleep-hours", title: "Sleep Hours" },
  { id: "sleep-debt", title: "Sleep Debt" },
  { id: "hrv", title: "HRV" },
  { id: "heart-rate", title: "Heart Rate" },
  { id: "sleep-graph", title: "Sleep Stages" },
  { id: "calories", title: "Calories Burned" },
  { id: "workout-log", title: "Workout Log" },
  { id: "bedtime-routine", title: "Bedtime Routine" },
  { id: "alcohol", title: "Alcohol Consumption" },
  { id: "step-count", title: "Step Count" },
]
