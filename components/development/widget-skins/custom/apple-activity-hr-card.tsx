"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"
import { defaultAppleWatchHrDataset } from "@/lib/apple-watch-hr-data"
import { getActivityHrData } from "@/lib/activity-hr-utils"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

const APPLE_COLOR_MIN = 60
const APPLE_COLOR_MID = 120
const APPLE_COLOR_MAX = 180
const APPLE_BLUE = "#00d0ff"
const APPLE_YELLOW = "#e5ff00"
const APPLE_RED = "#ff2d55"
const HEART_RED = "#ff2d55"

const heartRateZones = [
  { zone: "Zone 1", label: "Easy", minutes: 18, color: "#36c7f6" },
  { zone: "Zone 2", label: "Light", minutes: 24, color: "#64d66a" },
  { zone: "Zone 3", label: "Moderate", minutes: 32, color: "#ffd60a" },
  { zone: "Zone 4", label: "Hard", minutes: 28, color: "#ff9f0a" },
  { zone: "Zone 5", label: "Peak", minutes: 18, color: "#ff2d55" },
] as const

const totalZoneMinutes = heartRateZones.reduce((total, zone) => total + zone.minutes, 0)

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function interpolateColor(startColor: string, endColor: string, ratio: number) {
  const start = Number.parseInt(startColor.slice(1), 16)
  const end = Number.parseInt(endColor.slice(1), 16)
  const startRed = (start >> 16) & 255
  const startGreen = (start >> 8) & 255
  const startBlue = start & 255
  const endRed = (end >> 16) & 255
  const endGreen = (end >> 8) & 255
  const endBlue = end & 255
  const red = Math.round(startRed + (endRed - startRed) * ratio)
  const green = Math.round(startGreen + (endGreen - startGreen) * ratio)
  const blue = Math.round(startBlue + (endBlue - startBlue) * ratio)

  return `rgb(${red}, ${green}, ${blue})`
}

function getAppleHrColor(hr: number) {
  const boundedHr = clamp(hr, APPLE_COLOR_MIN, APPLE_COLOR_MAX)

  if (boundedHr <= APPLE_COLOR_MID) {
    return interpolateColor(APPLE_BLUE, APPLE_YELLOW, (boundedHr - APPLE_COLOR_MIN) / (APPLE_COLOR_MID - APPLE_COLOR_MIN))
  }

  return interpolateColor(APPLE_YELLOW, APPLE_RED, (boundedHr - APPLE_COLOR_MID) / (APPLE_COLOR_MAX - APPLE_COLOR_MID))
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-black/5 bg-white px-3 py-2 shadow-sm">
        <p className="text-xs font-semibold text-[#1d1d1f]">
          {payload[0].value} <span className="text-[10px] text-[#6e6e73]">BPM</span>
        </p>
      </div>
    )
  }
  return null
}

const CustomDot = (props: any) => {
  const { cx, cy, payload, isBuffer } = props
  return (
    <circle cx={cx} cy={cy} r={2} fill={getAppleHrColor(payload.hr)} opacity={isBuffer ? 0.25 : 1} stroke="none" />
  )
}

function formatTimeOfDay(minuteOfDay: number) {
  let h = Math.floor(minuteOfDay / 60)
  const m = minuteOfDay % 60
  const ampm = h >= 12 ? "PM" : "AM"
  h = h % 12
  h = h ? h : 12
  return `${h}:${m.toString().padStart(2, "0")} ${ampm}`
}

const CustomXTick = (props: any) => {
  const { x, y, payload, windowStart, windowEnd } = props
  let textAnchor: "start" | "middle" | "end" = "middle"
  let dx = 0
  if (payload.value === windowStart) {
    textAnchor = "start"
  } else if (payload.value === windowEnd) {
    textAnchor = "end"
  }
  
  return (
    <text x={x} y={y} dy={12} dx={dx} textAnchor={textAnchor} fill="#86868b" fontSize={9} fontWeight={500}>
      {formatTimeOfDay(payload.value)}
    </text>
  )
}

export function AppleActivityHrCard({ hrDataset = defaultAppleWatchHrDataset }: WidgetSkinProps) {
  const activityData = getActivityHrData(hrDataset.fullDayLine, 840, 120, false)
  const { chartData, chartMin, chartMax, workoutStart, workoutEnd, averageHr, minHr, maxHr, activityName, durationFormatted } = activityData

  const axisTicks = [chartMin, Math.round((chartMin + chartMax) / 20) * 10, chartMax]
  const xTicks = [workoutStart, workoutEnd]

  const gradientStops = []
  const chartRange = chartMax - chartMin
  for (let hr = chartMax; hr >= chartMin; hr -= 10) {
    const offset = `${((chartMax - hr) / chartRange) * 100}%`
    gradientStops.push(<stop key={hr} offset={offset} stopColor={getAppleHrColor(hr)} />)
  }

  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="min-h-0 flex-1 overflow-y-auto rounded-[20px] bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">{activityName} • {durationFormatted}</p>
            <p className="mt-0.5 text-3xl font-bold leading-none tracking-[-0.04em]" style={{ color: HEART_RED }}>
              {minHr}-{maxHr}
            </p>
            <p className="mt-0.5 text-xs font-medium leading-none text-[#6e6e73]">BPM Range</p>
          </div>

          <div className="text-right">
            <p className="mt-2 text-3xl font-bold leading-none tracking-[-0.04em] text-[#1d1d1f]">{averageHr}</p>
            <p className="mt-0.5 text-[10px] font-medium text-[#6e6e73]">Avg HR</p>
          </div>
        </div>

        <div className="grid h-[178px] grid-cols-[24px_1fr] gap-1 border-b border-[#d1d1d6] pb-5 pt-1">
          <div className="relative pb-[24px] pt-[10px]">
            <div className="relative h-full w-full pr-1">
              {axisTicks.map((tick) => (
                <span
                  key={tick}
                  className="absolute right-1 translate-y-1/2 text-[9px] font-medium text-[#86868b]"
                  style={{ bottom: `${((tick - chartMin) / chartRange) * 100}%` }}
                >
                  {tick}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="appleHrGradientActivity" x1="0" y1="0" x2="0" y2="1">
                    {gradientStops}
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="minuteOfDay"
                  type="number"
                  domain={[workoutStart, workoutEnd]}
                  tick={<CustomXTick windowStart={workoutStart} windowEnd={workoutEnd} />}
                  tickLine={false}
                  tickMargin={0}
                  ticks={xTicks}
                  interval={0}
                  axisLine={false}
                  height={24}
                />
                <YAxis
                  dataKey="hr"
                  type="number"
                  domain={[chartMin, chartMax]}
                  hide
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#d1d1d6", strokeWidth: 1, strokeDasharray: "3 3" }} />
                {axisTicks.map((tick) => (
                  <ReferenceLine key={tick} y={tick} stroke="#e5e5ea" />
                ))}
                <Line
                  type="linear"
                  dataKey="hr"
                  stroke="url(#appleHrGradientActivity)"
                  strokeOpacity={1}
                  strokeWidth={2.5}
                  dot={<CustomDot isBuffer={false} />}
                  activeDot={{ r: 4, fill: "white", stroke: HEART_RED, strokeWidth: 2 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-4 space-y-2 pb-1">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-[#6e6e73]">Heart Rate Zones</p>
            <p className="text-[11px] font-semibold text-[#1d1d1f]">{totalZoneMinutes} min</p>
          </div>

          {heartRateZones.map((zone) => (
            <div key={zone.zone} className="grid grid-cols-[54px_1fr_40px] items-center gap-2">
              <p className="text-[10px] font-semibold text-[#6e6e73]">{zone.zone}</p>
              <div className="h-2 overflow-hidden rounded-full bg-[#f2f2f7]">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(zone.minutes / Math.max(...heartRateZones.map((item) => item.minutes))) * 100}%`, backgroundColor: zone.color }}
                />
              </div>
              <p className="text-right text-[10px] font-semibold text-[#1d1d1f]">{zone.minutes}m</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
