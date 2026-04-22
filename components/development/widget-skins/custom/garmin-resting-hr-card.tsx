"use client"

import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const GARMIN_BLUE = "#007cc3"
const GARMIN_GRID_LINE = "#2c2c2e"
const GARMIN_MUTED = "#8e8e93"

const restingHrTrend = [
  { day: "Mon", value: 49 },
  { day: "Tue", value: 50 },
  { day: "Wed", value: 48 },
  { day: "Thu", value: 51 },
  { day: "Fri", value: 50 },
  { day: "Sat", value: 49 },
  { day: "Sun", value: 48 },
  { day: "Mon", value: 47 },
  { day: "Tue", value: 49 },
  { day: "Wed", value: 48 },
]

const latestRestingHr = restingHrTrend[restingHrTrend.length - 1]
const values = restingHrTrend.map((item) => item.value)
const chartMin = Math.floor((Math.min(...values) - 2) / 2) * 2
const chartMax = Math.ceil((Math.max(...values) + 2) / 2) * 2
const chartRange = chartMax - chartMin
const axisTicks = [chartMin, Math.round((chartMin + chartMax) / 2), chartMax]

function RestingHrTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value?: number }>
  label?: string
}) {
  if (!active || !payload?.length || payload[0].value == null) return null

  return (
    <div className="rounded-lg border border-white/10 bg-[#1e1e1e] px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-[#8e8e93]">{label}</p>
      <p className="text-sm font-semibold text-white">
        {payload[0].value} <span className="text-[10px] uppercase tracking-[0.1em] text-[#8e8e93]">bpm</span>
      </p>
    </div>
  )
}

export function GarminRestingHrCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[18px] border border-white/10 bg-[#111111] text-white shadow-lg">
      <div className="rounded-t-[18px] bg-[#1e1e1e] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90">Garmin Connect</p>
          <p className="text-[11px] font-semibold text-white/70">Resting Heart Rate</p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#8e8e93]">Current</p>
            <p className="mt-1 text-4xl font-extrabold leading-none tracking-[-0.05em] text-white">
              {latestRestingHr.value}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8e8e93]">bpm</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] px-3 py-2 text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8e8e93]">Trend</p>
            <p className="mt-1 text-sm font-bold" style={{ color: GARMIN_BLUE }}>
              Stable
            </p>
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
              <LineChart data={restingHrTrend} margin={{ top: 10, right: 4, bottom: 0, left: 0 }}>
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={8}
                  axisLine={{ stroke: GARMIN_GRID_LINE }}
                  height={24}
                  interval={1}
                  tick={{ fill: GARMIN_MUTED, fontSize: 9, fontWeight: "bold" }}
                />
                <YAxis domain={[chartMin, chartMax]} hide />
                <Tooltip content={<RestingHrTooltip />} cursor={{ stroke: "#3a3a3c", strokeWidth: 1 }} />
                {axisTicks.map((tick) => (
                  <ReferenceLine key={tick} y={tick} stroke={GARMIN_GRID_LINE} />
                ))}
                <Line
                  type="linear"
                  dataKey="value"
                  stroke={GARMIN_BLUE}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: GARMIN_BLUE, strokeWidth: 0 }}
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
