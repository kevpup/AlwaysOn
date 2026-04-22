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

const VO2_PURPLE = "#af52de"

const weeklyVo2Max = [
  { day: "M", value: 52.8 },
  { day: "T", value: null },
  { day: "W", value: null },
  { day: "T", value: 53.1 },
  { day: "F", value: null },
  { day: "S", value: 53.4 },
  { day: "S", value: null },
]

const loggedVo2Max = weeklyVo2Max.filter((item): item is { day: string; value: number } => item.value !== null)
const latestVo2Max = loggedVo2Max[loggedVo2Max.length - 1]?.value ?? 0
const averageVo2Max = loggedVo2Max.reduce((total, item) => total + item.value, 0) / loggedVo2Max.length
const minVo2Max = Math.min(...loggedVo2Max.map((item) => item.value))
const maxVo2Max = Math.max(...loggedVo2Max.map((item) => item.value))
const chartMin = Math.floor((minVo2Max - 1) * 2) / 2
const chartMax = Math.ceil((maxVo2Max + 1) * 2) / 2

function Vo2MaxTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value?: number | null }>
  label?: string
}) {
  if (!active || !payload?.length || payload[0].value == null) {
    return null
  }

  return (
    <div className="rounded-lg border border-black/10 bg-white px-3 py-2 shadow-lg">
      <p className="text-xs text-[#6e6e73]">{label}</p>
      <p className="text-sm font-semibold text-[#1d1d1f]">{payload[0].value.toFixed(1)} VO2 Max</p>
    </div>
  )
}

export function AppleVo2MaxCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white px-3 pb-2.5 pt-3 shadow-sm">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">Latest VO2 Max</p>
            <p className="mt-0.5 text-3xl font-bold leading-none tracking-[-0.04em]" style={{ color: VO2_PURPLE }}>
              {latestVo2Max.toFixed(1)}
            </p>
            <p className="mt-0.5 text-[10px] text-[#6e6e73]">ml/kg/min</p>
          </div>

          <div className="text-right">
            <p className="text-[11px] font-semibold lowercase text-[#6e6e73]">average</p>
            <p className="mt-0.5 text-base font-semibold leading-none text-[#1d1d1f]">
              {averageVo2Max.toFixed(1)}
            </p>
            <p className="mt-0.5 text-[10px] text-[#6e6e73]">last week</p>
          </div>
        </div>

        <div className="min-h-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyVo2Max} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fontWeight: 600, fill: "#86868b" }}
                tickLine={false}
                axisLine={false}
                interval={0}
                height={22}
              />
              <YAxis domain={[chartMin, chartMax]} hide />
              <Tooltip content={<Vo2MaxTooltip />} cursor={{ stroke: "#d1d1d6", strokeWidth: 1 }} />
              <Line
                type="monotone"
                dataKey="value"
                connectNulls
                stroke={VO2_PURPLE}
                strokeWidth={3}
                dot={{ r: 4, fill: VO2_PURPLE, stroke: "white", strokeWidth: 2 }}
                activeDot={{ r: 5, fill: VO2_PURPLE, stroke: "white", strokeWidth: 2 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
