"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"
import { defaultAppleWatchHrDataset } from "@/lib/apple-watch-hr-data"
import {
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
const GARMIN_AXIS_GRAY = "#d8e1e8"
const MINUTES_IN_DAY = 1440
const HOUR_TICKS = [0, 360, 720, 1080, 1440]

function formatHourTick(minuteOfDay: number) {
  if (minuteOfDay === 0 || minuteOfDay === 1440) return "12A"
  if (minuteOfDay === 360) return "6A"
  if (minuteOfDay === 720) return "12P"
  if (minuteOfDay === 1080) return "6P"
  return ""
}

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

const CustomXTick = (props: any) => {
  const { x, y, payload } = props
  let textAnchor = "middle"
  let dx = 0
  if (payload.value === 0) {
    textAnchor = "start"
  } else if (payload.value === 1440) {
    textAnchor = "end"
  }
  
  return (
    <text x={x} y={y} dy={12} dx={dx} textAnchor={textAnchor} fill="#8e8e93" fontSize={9} fontWeight="bold">
      {formatHourTick(payload.value)}
    </text>
  )
}

export function GarminFullDayHrCard({ hrDataset = defaultAppleWatchHrDataset }: WidgetSkinProps) {
  const data = hrDataset.fullDayLine
  const chartData = data.map((point, index) => ({
    ...point,
    minuteOfDay: point.minuteOfDay ?? (data.length <= 1 ? 0 : (index / (data.length - 1)) * MINUTES_IN_DAY),
  }))

  const values = chartData.map((d) => d.hr)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const chartMin = Math.max(0, Math.floor((min - 10) / 10) * 10)
  const chartMax = Math.max(chartMin + 20, Math.ceil((max + 10) / 10) * 10)
  const chartRange = chartMax - chartMin

  const gradientStops = []
  for (let hr = chartMax; hr >= chartMin; hr -= 10) {
    const offset = `${((chartMax - hr) / chartRange) * 100}%`
    gradientStops.push(<stop key={hr} offset={offset} stopColor={getHrColor(hr)} />)
  }

  const axisTicks = [chartMin, Math.round((chartMin + chartMax) / 20) * 10, chartMax]

  const GARMIN_GRID_LINE = "#2c2c2e"

  return (
    <div className="flex h-full flex-col rounded-[18px] border border-white/10 bg-[#111111] text-white shadow-lg">
      <div className="rounded-t-[18px] bg-[#1e1e1e] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90">Garmin Connect</p>
          <p className="text-[11px] font-semibold text-white/70">Heart Rate</p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#8e8e93]">Range</p>
            <p className="mt-1 text-3xl font-extrabold leading-none tracking-[-0.04em] text-white">
              {hrDataset.daySummary.min}-{hrDataset.daySummary.max}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8e8e93]">bpm</p>
          </div>

          <div className="text-right">
            <p className="text-3xl font-extrabold leading-none tracking-[-0.04em] text-[#ff3b30]">
              {hrDataset.lastReading}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#8e8e93]">Last HR Reading</p>
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
              <LineChart data={chartData} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="garminHrGradient" x1="0" y1="0" x2="0" y2="1">
                    {gradientStops}
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="minuteOfDay"
                  domain={[0, MINUTES_IN_DAY]}
                  tick={<CustomXTick />}
                  tickLine={false}
                  tickMargin={0}
                  ticks={HOUR_TICKS}
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
                <Line
                  type="linear"
                  dataKey="hr"
                  stroke="url(#garminHrGradient)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#ff3b30", strokeWidth: 0 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
