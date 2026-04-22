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

const TEMP_ORANGE = "#ff9500"

const weeklyTemperatureDeviation = [
  { day: "M", value: -0.2 },
  { day: "T", value: 0.1 },
  { day: "W", value: 0.4 },
  { day: "T", value: 0.2 },
  { day: "F", value: -0.1 },
  { day: "S", value: 0.3 },
  { day: "S", value: 0.5 },
]

const values = weeklyTemperatureDeviation.map((item) => item.value)
const averageDeviation = values.reduce((sum, value) => sum + value, 0) / values.length
const todayDeviation = weeklyTemperatureDeviation[weeklyTemperatureDeviation.length - 1].value
const maxAbsDeviation = Math.max(...values.map((value) => Math.abs(value)), 0.5)
const chartBound = Math.ceil((maxAbsDeviation + 0.2) * 10) / 10

function formatDeviation(value: number) {
  const sign = value > 0 ? "+" : ""

  return `${sign}${value.toFixed(1)} F`
}

function TemperatureTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value?: number }>
  label?: string
}) {
  if (!active || !payload?.length || payload[0].value == null) {
    return null
  }

  return (
    <div className="rounded-lg border border-black/10 bg-white px-3 py-2 shadow-lg">
      <p className="text-xs text-[#6e6e73]">{label}</p>
      <p className="text-sm font-semibold text-[#1d1d1f]">{formatDeviation(payload[0].value)}</p>
    </div>
  )
}

export function AppleTemperatureDeviationCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">Temperature Deviation</p>
            <p className="mt-0.5 text-[32px] font-bold leading-none tracking-[-0.05em]" style={{ color: TEMP_ORANGE }}>
              {formatDeviation(todayDeviation)}
            </p>
            <p className="mt-1 text-xs font-medium text-[#6e6e73]">from baseline today</p>
          </div>

          <div className="text-right">
            <p className="text-[11px] font-semibold lowercase text-[#6e6e73]">average</p>
            <p className="mt-0.5 text-base font-semibold leading-none text-[#1d1d1f]">
              {formatDeviation(averageDeviation)}
            </p>
            <p className="mt-0.5 text-[10px] text-[#6e6e73]">past week</p>
          </div>
        </div>

        <div className="mt-5 grid min-h-0 flex-1 grid-cols-[34px_1fr] gap-2">
          <div className="relative mb-5 mt-2 border-r border-[#d1d1d6] pr-1">
            {[chartBound, 0, -chartBound].map((tick) => (
              <span
                key={tick}
                className="absolute right-1 translate-y-1/2 text-[9px] font-medium text-[#86868b]"
                style={{ bottom: `${((tick + chartBound) / (chartBound * 2)) * 100}%` }}
              >
                {tick === 0 ? "0" : formatDeviation(tick)}
              </span>
            ))}
          </div>

          <div className="relative min-h-0 border-b border-[#d1d1d6]">
            {[chartBound, 0, -chartBound].map((tick) => (
              <div
                key={tick}
                className={`absolute left-0 right-0 border-t ${tick === 0 ? "border-[#b8b8bf]" : "border-[#e5e5ea]"}`}
                style={{ bottom: `${((tick + chartBound) / (chartBound * 2)) * 100}%` }}
              />
            ))}

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTemperatureDeviation} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#86868b", fontSize: 10, fontWeight: 600 }}
                  interval={0}
                  height={22}
                />
                <YAxis domain={[-chartBound, chartBound]} hide />
                <Tooltip content={<TemperatureTooltip />} cursor={{ stroke: "#d1d1d6", strokeWidth: 1 }} />
                <ReferenceLine y={0} stroke="#b8b8bf" strokeWidth={1.5} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={TEMP_ORANGE}
                  strokeWidth={3}
                  dot={{ r: 4, fill: TEMP_ORANGE, stroke: "white", strokeWidth: 2 }}
                  activeDot={{ r: 5, fill: TEMP_ORANGE, stroke: "white", strokeWidth: 2 }}
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
