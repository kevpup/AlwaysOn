export interface AppleWatchHrRange {
  label: string
  low: number
  high: number
  average: number
}

export interface AppleWatchHrPointRange {
  label: string
  low: number
  high: number
}

export interface AppleWatchHrLinePoint {
  time: string
  hr: number
  minuteOfDay?: number
}

export interface AppleWatchHrDataset {
  dateLabel: string
  daySummary: {
    max: number
    min: number
  }
  fullDayLine: AppleWatchHrLinePoint[]
  hourlyRanges: AppleWatchHrRange[]
  lastHourPoints: AppleWatchHrPointRange[]
  lastReading: number
  source: string
  timezone?: string
}

interface ParsedHrReading {
  date: string
  hour: number
  hr: number
  minute: number
  minuteOfDay: number
  time: string
  timezone?: string
}

const hourlyTimeLabels = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
]

export const appleWatchHrDaySummary = {
  date: "2020-06-14",
  max: 129,
  min: 56,
  source: "applewatch_hr_one_day_2020-06-14_clean.csv",
  timezone: "+0900",
}

export const appleWatchHrLastReading = 77

export const appleWatchHrHourlyRanges: AppleWatchHrRange[] = [
  { label: "12A", low: 81, high: 114, average: 92 },
  { label: "1", low: 88, high: 102, average: 96 },
  { label: "2", low: 77, high: 129, average: 100 },
  { label: "3", low: 90, high: 100, average: 94 },
  { label: "4", low: 77, high: 98, average: 86 },
  { label: "5", low: 67, high: 88, average: 73 },
  { label: "6", low: 64, high: 76, average: 68 },
  { label: "7", low: 73, high: 85, average: 77 },
  { label: "8", low: 73, high: 86, average: 79 },
  { label: "9", low: 82, high: 100, average: 89 },
  { label: "10", low: 87, high: 95, average: 90 },
  { label: "11", low: 89, high: 105, average: 94 },
  { label: "12P", low: 83, high: 99, average: 91 },
  { label: "1", low: 86, high: 102, average: 91 },
  { label: "2", low: 69, high: 114, average: 97 },
  { label: "3", low: 98, high: 120, average: 108 },
  { label: "4", low: 93, high: 110, average: 102 },
  { label: "5", low: 85, high: 100, average: 94 },
  { label: "6", low: 56, high: 103, average: 94 },
  { label: "7", low: 74, high: 95, average: 86 },
  { label: "8", low: 76, high: 85, average: 81 },
  { label: "9", low: 77, high: 109, average: 91 },
  { label: "10", low: 86, high: 98, average: 92 },
  { label: "11", low: 73, high: 85, average: 77 },
]

export const appleWatchHrLastHourPoints: AppleWatchHrPointRange[] = [
  { label: "23:02", low: 83, high: 83 },
  { label: "", low: 81, high: 81 },
  { label: "", low: 78, high: 78 },
  { label: "", low: 80, high: 80 },
  { label: "", low: 75, high: 75 },
  { label: "", low: 74, high: 74 },
  { label: "", low: 74, high: 74 },
  { label: "", low: 74, high: 74 },
  { label: "", low: 73, high: 73 },
  { label: "", low: 73, high: 73 },
  { label: "", low: 85, high: 85 },
  { label: "23:55", low: 77, high: 77 },
]

export const appleWatchHrFullDayLine = appleWatchHrHourlyRanges.map((range, index) => ({
  minuteOfDay: index * 60,
  time: hourlyTimeLabels[index],
  hr: range.average,
}))

export const appleWatchHrRawFullDayLine: AppleWatchHrLinePoint[] = [
  { time: "00:00", hr: 82, minuteOfDay: 0 },
  { time: "", hr: 84, minuteOfDay: 5 },
  { time: "", hr: 83, minuteOfDay: 13 },
  { time: "", hr: 91, minuteOfDay: 16 },
  { time: "", hr: 81, minuteOfDay: 23 },
  { time: "", hr: 91, minuteOfDay: 29 },
  { time: "", hr: 91, minuteOfDay: 31 },
  { time: "", hr: 114, minuteOfDay: 36 },
  { time: "", hr: 110, minuteOfDay: 48 },
  { time: "", hr: 81, minuteOfDay: 52 },
  { time: "", hr: 107, minuteOfDay: 56 },
  { time: "", hr: 99 },
  { time: "", hr: 97 },
  { time: "", hr: 92 },
  { time: "", hr: 98 },
  { time: "", hr: 97 },
  { time: "", hr: 88 },
  { time: "", hr: 102 },
  { time: "", hr: 96 },
  { time: "", hr: 94 },
  { time: "", hr: 129 },
  { time: "", hr: 98 },
  { time: "", hr: 97 },
  { time: "", hr: 98 },
  { time: "02:26", hr: 102 },
  { time: "", hr: 99 },
  { time: "", hr: 105 },
  { time: "", hr: 96 },
  { time: "", hr: 96 },
  { time: "", hr: 98 },
  { time: "", hr: 77 },
  { time: "", hr: 90 },
  { time: "", hr: 92 },
  { time: "", hr: 91 },
  { time: "", hr: 92 },
  { time: "", hr: 92 },
  { time: "", hr: 94 },
  { time: "", hr: 96 },
  { time: "", hr: 92 },
  { time: "", hr: 100 },
  { time: "", hr: 96 },
  { time: "", hr: 98 },
  { time: "", hr: 100 },
  { time: "", hr: 85 },
  { time: "", hr: 98 },
  { time: "", hr: 90 },
  { time: "", hr: 83 },
  { time: "", hr: 89 },
  { time: "04:28", hr: 92 },
  { time: "", hr: 89 },
  { time: "", hr: 85 },
  { time: "", hr: 86 },
  { time: "", hr: 77 },
  { time: "", hr: 84 },
  { time: "", hr: 79 },
  { time: "", hr: 78 },
  { time: "", hr: 88 },
  { time: "", hr: 79 },
  { time: "", hr: 77 },
  { time: "", hr: 74 },
  { time: "", hr: 73 },
  { time: "", hr: 70 },
  { time: "", hr: 69 },
  { time: "", hr: 69 },
  { time: "", hr: 68 },
  { time: "", hr: 68 },
  { time: "", hr: 67 },
  { time: "", hr: 67 },
  { time: "", hr: 67 },
  { time: "", hr: 76 },
  { time: "", hr: 67 },
  { time: "", hr: 64 },
  { time: "06:20", hr: 65 },
  { time: "", hr: 66 },
  { time: "", hr: 65 },
  { time: "", hr: 65 },
  { time: "", hr: 67 },
  { time: "", hr: 66 },
  { time: "", hr: 74 },
  { time: "", hr: 71 },
  { time: "", hr: 73 },
  { time: "", hr: 76 },
  { time: "", hr: 77 },
  { time: "", hr: 81 },
  { time: "", hr: 76 },
  { time: "", hr: 85 },
  { time: "", hr: 77 },
  { time: "", hr: 74 },
  { time: "", hr: 74 },
  { time: "", hr: 74 },
  { time: "", hr: 75 },
  { time: "", hr: 78 },
  { time: "", hr: 82 },
  { time: "", hr: 73 },
  { time: "", hr: 78 },
  { time: "", hr: 78 },
  { time: "08:21", hr: 74 },
  { time: "", hr: 74 },
  { time: "", hr: 76 },
  { time: "", hr: 85 },
  { time: "", hr: 86 },
  { time: "", hr: 80 },
  { time: "", hr: 100 },
  { time: "", hr: 97 },
  { time: "", hr: 86 },
  { time: "", hr: 87 },
  { time: "", hr: 87 },
  { time: "", hr: 85 },
  { time: "", hr: 90 },
  { time: "", hr: 87 },
  { time: "", hr: 90 },
  { time: "", hr: 89 },
  { time: "", hr: 82 },
  { time: "", hr: 85 },
  { time: "", hr: 89 },
  { time: "", hr: 91 },
  { time: "", hr: 91 },
  { time: "", hr: 95 },
  { time: "", hr: 90 },
  { time: "", hr: 87 },
  { time: "10:33", hr: 88 },
  { time: "", hr: 89 },
  { time: "", hr: 88 },
  { time: "", hr: 89 },
  { time: "", hr: 92 },
  { time: "", hr: 88 },
  { time: "", hr: 93 },
  { time: "", hr: 94 },
  { time: "", hr: 93 },
  { time: "", hr: 89 },
  { time: "", hr: 93 },
  { time: "", hr: 105 },
  { time: "", hr: 97 },
  { time: "", hr: 97 },
  { time: "", hr: 92 },
  { time: "", hr: 92 },
  { time: "", hr: 92 },
  { time: "", hr: 94 },
  { time: "", hr: 92 },
  { time: "", hr: 92 },
  { time: "", hr: 95 },
  { time: "", hr: 99 },
  { time: "", hr: 91 },
  { time: "", hr: 90 },
  { time: "12:26", hr: 94 },
  { time: "", hr: 89 },
  { time: "", hr: 83 },
  { time: "", hr: 91 },
  { time: "", hr: 88 },
  { time: "", hr: 91 },
  { time: "", hr: 92 },
  { time: "", hr: 86 },
  { time: "", hr: 90 },
  { time: "", hr: 91 },
  { time: "", hr: 95 },
  { time: "", hr: 88 },
  { time: "", hr: 88 },
  { time: "", hr: 87 },
  { time: "", hr: 102 },
  { time: "", hr: 94 },
  { time: "", hr: 80 },
  { time: "", hr: 69 },
  { time: "", hr: 114 },
  { time: "", hr: 107 },
  { time: "", hr: 108 },
  { time: "", hr: 104 },
  { time: "", hr: 108 },
  { time: "", hr: 120 },
  { time: "15:09", hr: 108 },
  { time: "", hr: 117 },
  { time: "", hr: 108 },
  { time: "", hr: 105 },
  { time: "", hr: 106 },
  { time: "", hr: 98 },
  { time: "", hr: 101 },
  { time: "", hr: 100 },
  { time: "", hr: 107 },
  { time: "", hr: 110 },
  { time: "", hr: 104 },
  { time: "", hr: 98 },
  { time: "", hr: 95 },
  { time: "", hr: 107 },
  { time: "", hr: 93 },
  { time: "", hr: 96 },
  { time: "", hr: 89 },
  { time: "", hr: 96 },
  { time: "", hr: 92 },
  { time: "", hr: 85 },
  { time: "", hr: 94 },
  { time: "", hr: 93 },
  { time: "", hr: 91 },
  { time: "", hr: 96 },
  { time: "17:52", hr: 100 },
  { time: "", hr: 98 },
  { time: "", hr: 100 },
  { time: "", hr: 56 },
  { time: "", hr: 101 },
  { time: "", hr: 99 },
  { time: "", hr: 96 },
  { time: "", hr: 98 },
  { time: "", hr: 98 },
  { time: "", hr: 92 },
  { time: "", hr: 99 },
  { time: "", hr: 98 },
  { time: "", hr: 98 },
  { time: "", hr: 88 },
  { time: "", hr: 103 },
  { time: "", hr: 94 },
  { time: "", hr: 91 },
  { time: "", hr: 93 },
  { time: "", hr: 93 },
  { time: "", hr: 94 },
  { time: "", hr: 93 },
  { time: "", hr: 97 },
  { time: "", hr: 95 },
  { time: "", hr: 95 },
  { time: "19:18", hr: 95 },
  { time: "", hr: 87 },
  { time: "", hr: 74 },
  { time: "", hr: 75 },
  { time: "", hr: 90 },
  { time: "", hr: 84 },
  { time: "", hr: 81 },
  { time: "", hr: 87 },
  { time: "", hr: 85 },
  { time: "", hr: 82 },
  { time: "", hr: 81 },
  { time: "", hr: 80 },
  { time: "", hr: 76 },
  { time: "", hr: 82 },
  { time: "", hr: 85 },
  { time: "", hr: 78 },
  { time: "", hr: 78 },
  { time: "", hr: 80 },
  { time: "", hr: 77 },
  { time: "", hr: 84 },
  { time: "", hr: 79 },
  { time: "", hr: 89 },
  { time: "", hr: 84 },
  { time: "", hr: 87 },
  { time: "21:37", hr: 92 },
  { time: "", hr: 100 },
  { time: "", hr: 109 },
  { time: "", hr: 100 },
  { time: "", hr: 102 },
  { time: "", hr: 79 },
  { time: "", hr: 77 },
  { time: "", hr: 95 },
  { time: "", hr: 93 },
  { time: "", hr: 88 },
  { time: "", hr: 86 },
  { time: "", hr: 89 },
  { time: "", hr: 89 },
  { time: "", hr: 91 },
  { time: "", hr: 93 },
  { time: "", hr: 97 },
  { time: "", hr: 98 },
  { time: "", hr: 97 },
  { time: "", hr: 93 },
  { time: "", hr: 83 },
  { time: "", hr: 81 },
  { time: "", hr: 78 },
  { time: "", hr: 80 },
  { time: "", hr: 75 },
  { time: "23:26", hr: 74 },
  { time: "", hr: 74 },
  { time: "", hr: 74 },
  { time: "", hr: 73 },
  { time: "", hr: 73 },
  { time: "", hr: 85 },
  { time: "23:55", hr: 77 },
]

export const defaultAppleWatchHrDataset: AppleWatchHrDataset = {
  dateLabel: appleWatchHrDaySummary.date,
  daySummary: {
    max: appleWatchHrDaySummary.max,
    min: appleWatchHrDaySummary.min,
  },
  fullDayLine: appleWatchHrRawFullDayLine,
  hourlyRanges: appleWatchHrHourlyRanges,
  lastHourPoints: appleWatchHrLastHourPoints,
  lastReading: appleWatchHrLastReading,
  source: appleWatchHrDaySummary.source,
  timezone: appleWatchHrDaySummary.timezone,
}

function parseCsvLine(line: string) {
  const cells: string[] = []
  let current = ""
  let inQuotes = false

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index]
    const nextCharacter = line[index + 1]

    if (character === "\"" && inQuotes && nextCharacter === "\"") {
      current += "\""
      index += 1
    } else if (character === "\"") {
      inQuotes = !inQuotes
    } else if (character === "," && !inQuotes) {
      cells.push(current.trim())
      current = ""
    } else {
      current += character
    }
  }

  cells.push(current.trim())
  return cells
}

function formatHourLabel(hour: number) {
  if (hour === 0) return "12A"
  if (hour === 12) return "12P"
  return String(hour > 12 ? hour - 12 : hour)
}

function parseTimestamp(timestamp: string) {
  const match = timestamp.match(
    /^(\d{4}-\d{2}-\d{2})[ T](\d{2}):(\d{2})(?::\d{2})?(?:\s*([+-]\d{2}:?\d{2}|Z))?/,
  )

  if (!match) {
    throw new Error(`Could not parse timestamp: ${timestamp}`)
  }

  const [, date, hourText, minuteText, timezone] = match
  const hour = Number(hourText)
  const minute = Number(minuteText)

  return {
    date,
    hour,
    minute,
    minuteOfDay: hour * 60 + minute,
    time: `${hourText}:${minuteText}`,
    timezone,
  }
}

function buildHeartRateDataset(readings: ParsedHrReading[], source: string): AppleWatchHrDataset {
  const sortedReadings = [...readings].sort((left, right) => left.minuteOfDay - right.minuteOfDay)
  const firstReading = sortedReadings[0]
  const lastReading = sortedReadings[sortedReadings.length - 1]
  const hourlyRanges = Array.from({ length: 24 }, (_, hour) => {
    const hourReadings = sortedReadings.filter((reading) => reading.hour === hour)
    if (!hourReadings.length) return null

    const values = hourReadings.map((reading) => reading.hr)
    return {
      average: Math.round(values.reduce((total, value) => total + value, 0) / values.length),
      high: Math.max(...values),
      label: formatHourLabel(hour),
      low: Math.min(...values),
    }
  }).filter((range): range is AppleWatchHrRange => range !== null)
  const values = sortedReadings.map((reading) => reading.hr)
  const lastHourReadings = sortedReadings.filter((reading) => reading.hour === lastReading.hour)
  const lastHourPoints = lastHourReadings.map((reading, index) => ({
    high: reading.hr,
    label: index === 0 || index === lastHourReadings.length - 1 ? reading.time : "",
    low: reading.hr,
  }))

  return {
    dateLabel: firstReading.date,
    daySummary: {
      max: Math.max(...values),
      min: Math.min(...values),
    },
    fullDayLine: sortedReadings.map((reading, index) => ({
      hr: reading.hr,
      minuteOfDay: reading.minuteOfDay,
      time: index % 24 === 0 || index === sortedReadings.length - 1 ? reading.time : "",
    })),
    hourlyRanges,
    lastHourPoints,
    lastReading: lastReading.hr,
    source,
    timezone: firstReading.timezone,
  }
}

export function parseHeartRateCsv(csvText: string, source = "uploaded heart-rate CSV") {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length < 2) {
    throw new Error("CSV must include a header row and at least one heart-rate reading.")
  }

  const headers = parseCsvLine(lines[0]).map((header) => header.trim().toLowerCase())
  const timestampIndex = headers.findIndex((header) => header === "timestamp" || header === "time")
  const hrIndex = headers.findIndex((header) => header === "hr" || header === "heart rate" || header === "heartrate")

  if (timestampIndex === -1 || hrIndex === -1) {
    throw new Error("CSV must include timestamp and HR columns.")
  }

  const readings = lines.slice(1).map((line) => {
    const cells = parseCsvLine(line)
    const timestamp = cells[timestampIndex]
    const hr = Number.parseFloat(cells[hrIndex])

    if (!timestamp || !Number.isFinite(hr)) {
      throw new Error("Each row must include a valid timestamp and numeric HR value.")
    }

    return {
      ...parseTimestamp(timestamp),
      hr: Math.round(hr),
    }
  })

  return buildHeartRateDataset(readings, source)
}
