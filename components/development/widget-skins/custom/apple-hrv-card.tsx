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

const HRV_BLUE = "#007aff"

const weeklyHrv = [
  { day: "Mon", shortDay: "M", value: 58 },
  { day: "Tue", shortDay: "T", value: 62 },
  { day: "Wed", shortDay: "W", value: 55 },
  { day: "Thu", shortDay: "T", value: 68 },
  { day: "Fri", shortDay: "F", value: 72 },
]

const values = weeklyHrv.map((item) => item.value)
const averageHrv = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)
const chartMin = Math.max(0, Math.floor((Math.min(...values) - 8) / 5) * 5)
const chartMax = Math.ceil((Math.max(...values) + 8) / 5) * 5

function HrvTooltip({
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
        {payload[0].value} <span className="text-[11px] font-medium text-[#6e6e73]">ms</span>
      </p>
    </div>
  )
}

export function AppleHrvCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">Heart Rate Variability</p>
            <p className="mt-0.5 text-[32px] font-bold leading-none tracking-[-0.05em]" style={{ color: HRV_BLUE }}>
              {averageHrv}
            </p>
            <p className="mt-1 text-xs font-medium text-[#6e6e73]">ms weekly average</p>
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
              <LineChart data={weeklyHrv} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <XAxis
                  dataKey="shortDay"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#86868b", fontSize: 10, fontWeight: 600 }}
                  interval={0}
                  height={22}
                />
                <YAxis domain={[chartMin, chartMax]} hide />
                <Tooltip content={<HrvTooltip />} cursor={{ stroke: "#d1d1d6", strokeWidth: 1 }} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={HRV_BLUE}
                  strokeWidth={3}
                  dot={{ r: 4, fill: HRV_BLUE, stroke: "white", strokeWidth: 2 }}
                  activeDot={{ r: 5, fill: HRV_BLUE, stroke: "white", strokeWidth: 2 }}
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
