"use client"

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const HEART_RED = "#ff2d55"

const weeklyRestingHr = [
  { day: "Mon", shortDay: "M", value: 52 },
  { day: "Tue", shortDay: "T", value: 51 },
  { day: "Wed", shortDay: "W", value: 49 },
  { day: "Thu", shortDay: "T", value: 50 },
  { day: "Fri", shortDay: "F", value: 48 },
]

const values = weeklyRestingHr.map((item) => item.value)
const averageRestingHr = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)
const chartMin = Math.max(30, Math.floor((Math.min(...values) - 4) / 2) * 2)
const chartMax = Math.ceil((Math.max(...values) + 4) / 2) * 2

function RestingHrTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border border-black/10 bg-white px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-[#6e6e73]">{label}</p>
      <p className="text-base font-semibold leading-none text-[#1d1d1f]">
        {payload[0].value} <span className="text-[11px] font-medium text-[#6e6e73]">BPM</span>
      </p>
    </div>
  )
}

export function AppleRestingHrCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">Resting Heart Rate</p>
            <p className="mt-0.5 text-[32px] font-bold leading-none tracking-[-0.05em]" style={{ color: HEART_RED }}>
              {averageRestingHr}
            </p>
            <p className="mt-1 text-xs font-medium text-[#6e6e73]">BPM weekly average</p>
          </div>

          <div className="rounded-full bg-[#f2f2f7] px-3 py-1 text-[11px] font-semibold text-[#6e6e73]">
            Week
          </div>
        </div>

        <div className="mt-5 grid min-h-0 flex-1 grid-cols-[24px_1fr] gap-2">
          <div className="relative mb-5 mt-2 border-r border-[#d1d1d6] pr-1">
            {[chartMax, Math.round((chartMin + chartMax) / 2), chartMin].map((tick) => (
              <span
                key={tick}
                className="absolute right-1 translate-y-1/2 text-[9px] font-medium text-[#86868b]"
                style={{ bottom: `${((tick - chartMin) / (chartMax - chartMin)) * 100}%` }}
              >
                {tick}
              </span>
            ))}
          </div>

          <div className="relative min-h-0 border-b border-[#d1d1d6]">
            {[chartMax, Math.round((chartMin + chartMax) / 2), chartMin].map((tick) => (
              <div
                key={tick}
                className="absolute left-0 right-0 border-t border-[#e5e5ea]"
                style={{ bottom: `${((tick - chartMin) / (chartMax - chartMin)) * 100}%` }}
              />
            ))}

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyRestingHr} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <XAxis
                  dataKey="shortDay"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#86868b", fontSize: 10, fontWeight: 600 }}
                  interval={0}
                  height={22}
                />
                <YAxis domain={[chartMin, chartMax]} hide />
                <Tooltip content={<RestingHrTooltip />} cursor={{ stroke: "#d1d1d6", strokeWidth: 1 }} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={HEART_RED}
                  strokeWidth={3}
                  dot={{ r: 4, fill: HEART_RED, stroke: "white", strokeWidth: 2 }}
                  activeDot={{ r: 5, fill: HEART_RED, stroke: "white", strokeWidth: 2 }}
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
