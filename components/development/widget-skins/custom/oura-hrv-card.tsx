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
import { parseMetricInteger } from "@/components/development/widget-skins/custom/widget-metric-utils"

const overnightHrv = [
  { time: "11p", value: 54 },
  { time: "12a", value: 58 },
  { time: "1a", value: 63 },
  { time: "2a", value: 59 },
  { time: "3a", value: 66 },
  { time: "4a", value: 62 },
  { time: "5a", value: 72 },
  { time: "6a", value: 68 },
]

function HrvTooltip({
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
    <div className="rounded-2xl border border-white/[0.08] bg-[#171a1f] px-3 py-2 shadow-xl">
      <p className="text-[11px] font-medium text-[#b8c3cc]/65">{label}</p>
      <p className="text-sm font-semibold text-white">{payload[0].value} ms</p>
    </div>
  )
}

export function OuraHrvCard({ metric }: WidgetSkinProps) {
  const hrv = parseMetricInteger(metric.primaryValue)

  return (
    <div className="flex h-full flex-col rounded-[30px] border border-white/[0.08] bg-[#111317] p-6 text-white shadow-[0_22px_46px_rgba(0,0,0,0.34)]">
      <div className="mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8c3cc]/75">Average HRV</p>
        <div className="mt-4 flex items-baseline gap-2">
          <p className="text-6xl font-semibold leading-none tracking-[-0.08em] text-white">{hrv}</p>
          <p className="text-lg font-medium text-[#e7edf2]/80">ms</p>
        </div>
        <p className="mt-3 text-base font-medium text-[#b8c3cc]/68">Max 72 ms</p>
      </div>

      <div className="min-h-0 flex-1 rounded-[24px] bg-white/[0.025] px-2 py-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={overnightHrv} margin={{ top: 6, right: 8, bottom: 2, left: 8 }}>
            <XAxis dataKey="time" hide />
            <YAxis domain={[50, 75]} hide />
            <Tooltip content={<HrvTooltip />} cursor={{ stroke: "rgba(255,255,255,0.12)", strokeWidth: 1 }} />
            {[40, 55, 70].map((tick) => (
              <ReferenceLine key={tick} y={tick} stroke="rgba(255,255,255,0.08)" />
            ))}
            <Line
              type="monotone"
              dataKey="value"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth={1.8}
              dot={false}
              activeDot={{ r: 3.5, fill: "white", stroke: "#111317", strokeWidth: 1.5 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
