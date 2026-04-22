import { type AppleWatchHrLinePoint } from "./apple-watch-hr-data"

export interface ActivityHrPoint extends AppleWatchHrLinePoint {
  minuteOfDay: number
  xPct: number
}

export interface ActivityHrData {
  chartData: ActivityHrPoint[]
  averageHr: number
  maxHr: number
  minHr: number
  startBufferPct: number
  endBufferPct: number
  activityName: string
  durationFormatted: string
  chartMin: number
  chartMax: number
  windowStart: number
  windowEnd: number
  workoutStart: number
  workoutEnd: number
}

export function getActivityHrData(
  rawData: AppleWatchHrLinePoint[],
  startMinute = 840, // 14:00 (2:00 PM)
  durationMinutes = 120, // 2 hours
  includeBuffer = true // Add 15 mins buffer on each side
): ActivityHrData {
  const bufferMinutes = includeBuffer ? 15 : 0
  const fullDayLine = rawData.map((point, index) => ({
    ...point,
    minuteOfDay: point.minuteOfDay ?? (rawData.length <= 1 ? 0 : (index / (rawData.length - 1)) * 1440),
  }))

  const windowStart = startMinute - bufferMinutes
  const windowEnd = startMinute + durationMinutes + bufferMinutes
  const workoutStart = startMinute
  const workoutEnd = startMinute + durationMinutes
  const totalWindow = windowEnd - windowStart

  // Filter points within the window
  const rawChartData = fullDayLine.filter(
    (p) => p.minuteOfDay !== undefined && p.minuteOfDay >= windowStart && p.minuteOfDay <= windowEnd
  )

  // Fallback to the first chunk if the chosen window has no data
  let dataToUse = rawChartData.length > 0 ? rawChartData : fullDayLine.slice(0, 100)
  
  // If we had to fallback, recalculate the window bounds so xPct works correctly
  let actualStart = windowStart
  if (rawChartData.length === 0 && dataToUse.length > 0) {
     actualStart = dataToUse[0].minuteOfDay || 0
  }

  const chartData: ActivityHrPoint[] = dataToUse.map(p => ({
    ...p,
    minuteOfDay: p.minuteOfDay || 0,
    xPct: (((p.minuteOfDay || 0) - actualStart) / totalWindow) * 100
  }))

  // Calculate stats purely on the "active" portion
  const activePoints = chartData.filter(
    (p) => p.minuteOfDay >= workoutStart && p.minuteOfDay <= workoutEnd
  )
  const pointsForStats = activePoints.length > 0 ? activePoints : chartData

  const hrs = pointsForStats.map((p) => p.hr)
  const maxHr = Math.max(...hrs)
  const minHr = Math.min(...hrs)
  const averageHr = Math.round(hrs.reduce((sum, hr) => sum + hr, 0) / hrs.length)

  // Percentages for the gradient mask
  const startBufferPct = (bufferMinutes / totalWindow) * 100
  const endBufferPct = ((bufferMinutes + durationMinutes) / totalWindow) * 100

  // Chart bounds with some padding
  const chartMin = Math.max(0, Math.floor((minHr - 10) / 10) * 10)
  const chartMax = Math.ceil((maxHr + 10) / 10) * 10

  const hours = Math.floor(durationMinutes / 60)
  const mins = durationMinutes % 60
  const durationFormatted = hours > 0 ? (mins > 0 ? `${hours} hr ${mins} min` : `${hours} hr`) : `${mins} min`

  return {
    chartData,
    averageHr,
    maxHr,
    minHr,
    startBufferPct,
    endBufferPct,
    activityName: "Outdoor Run",
    durationFormatted,
    chartMin,
    chartMax,
    windowStart,
    windowEnd,
    workoutStart,
    workoutEnd
  }
}
