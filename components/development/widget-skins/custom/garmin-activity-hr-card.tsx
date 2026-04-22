"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"
import { defaultAppleWatchHrDataset } from "@/lib/apple-watch-hr-data"
import { getActivityHrData } from "@/lib/activity-hr-utils"
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

const HR_COLOR_MIN = 40
const HR_COLOR_MID = 100
const HR_COLOR_MAX = 200
const HR_PINK = "#ff4fb3"
const HR_BLUE = "#007cc3"
const HR_RED = "#e53935"

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

function getHrColor(hr: number) {
  const boundedHr = clamp(hr, HR_COLOR_MIN, HR_COLOR_MAX)

  if (boundedHr <= HR_COLOR_MID) {
    return interpolateColor(HR_PINK, HR_BLUE, (boundedHr - HR_COLOR_MIN) / (HR_COLOR_MID - HR_COLOR_MIN))
  }

  return interpolateColor(HR_BLUE, HR_RED, (boundedHr - HR_COLOR_MID) / (HR_COLOR_MAX - HR_COLOR_MID))
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-white/10 bg-[#1e1e1e] px-3 py-2 shadow-lg">
        <p className="text-xs font-semibold text-white">
          {payload[0].value} <span className="text-[10px] uppercase tracking-[0.1em] text-[#8e8e93]">bpm</span>
        </p>
      </div>
    )
  }
  return null
}

function formatTick(minuteOfDay: number) {
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
    <text x={x} y={y} dy={12} dx={dx} textAnchor={textAnchor} fill="#8e8e93" fontSize={9} fontWeight="bold">
      {formatTick(payload.value)}
    </text>
  )
}

export function GarminActivityHrCard({ hrDataset = defaultAppleWatchHrDataset }: WidgetSkinProps) {
  const activityData = getActivityHrData(hrDataset.fullDayLine, 840, 120, false)
  const { chartData, chartMin, chartMax, workoutStart, workoutEnd, averageHr, minHr, maxHr, activityName, durationFormatted } = activityData

  const chartRange = chartMax - chartMin
  const xTicks = [workoutStart, workoutEnd]
  const axisTicks = [chartMin, Math.round((chartMin + chartMax) / 20) * 10, chartMax]

  const GARMIN_DARK_BG = "#111111"
  const GARMIN_HEADER_BG = "#1e1e1e"
  const GARMIN_RED = "#ff3b30"
  const GARMIN_GRID_LINE = "#2c2c2e"
  const GARMIN_TEXT_MUTED = "#8e8e93"
  const GARMIN_TEXT = "#ffffff"

  return (
    <div className="flex h-full flex-col rounded-[18px] border border-white/10 bg-[#111111] text-white shadow-lg">
      <div className="rounded-t-[18px] bg-[#1e1e1e] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90">{activityName}</p>
          <p className="text-[11px] font-semibold text-white/70">{durationFormatted}</p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#8e8e93]">Range</p>
            <p className="mt-1 text-3xl font-extrabold leading-none tracking-[-0.04em] text-white">
              {minHr}-{maxHr}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8e8e93]">bpm</p>
          </div>

          <div className="text-right">
            <p className="text-3xl font-extrabold leading-none tracking-[-0.04em] text-[#ff3b30]">
              {averageHr}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#8e8e93]">Avg HR</p>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[24px_1fr] gap-1">
          <div className="relative pb-[24px] pt-[10px]">
            <div className="relative h-full w-full border-r border-[#2c2c2e] pr-1">
              {axisTicks.map((tick) => (
                <span
                  key={tick}
                  className="absolute right-1 translate-y-1/2 text-[9px] font-bold text-[#8e8e93]"
                  style={{ bottom: `${((tick - chartMin) / chartRange) * 100}%` }}
                >
                  {tick}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="garminDarkRedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GARMIN_RED} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={GARMIN_RED} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="minuteOfDay"
                  domain={[workoutStart, workoutEnd]}
                  tick={<CustomXTick windowStart={workoutStart} windowEnd={workoutEnd} />}
                  tickLine={false}
                  tickMargin={0}
                  ticks={xTicks}
                  interval={0}
                  type="number"
                  axisLine={{ stroke: GARMIN_GRID_LINE }}
                  height={24}
                />
                <YAxis
                  domain={[chartMin, chartMax]}
                  hide
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#3a3a3c", strokeWidth: 1 }} />
                {axisTicks.map((tick) => (
                  <ReferenceLine key={tick} y={tick} stroke={GARMIN_GRID_LINE} />
                ))}

                <Area
                  type="linear"
                  dataKey="hr"
                  stroke={GARMIN_RED}
                  fill="url(#garminDarkRedGradient)"
                  strokeWidth={1.5}
                  dot={false}
                  activeDot={{ r: 4, fill: GARMIN_RED, strokeWidth: 0 }}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
