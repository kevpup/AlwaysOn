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

const daytimeStress = [
  { time: "7a", value: 22 },
  { time: "9a", value: 30 },
  { time: "11a", value: 44 },
  { time: "1p", value: 52 },
  { time: "3p", value: 61 },
  { time: "5p", value: 46 },
  { time: "7p", value: 34 },
  { time: "9p", value: 24 },
]

function StressTooltip({
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
      <p className="text-sm font-semibold text-white">Stress {payload[0].value}</p>
    </div>
  )
}

export function OuraStressCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[30px] border border-white/[0.08] bg-[#101216] p-5 text-white shadow-[0_22px_46px_rgba(0,0,0,0.34)]">
      <div className="mb-4">
        <p className="text-2xl font-semibold leading-none tracking-[-0.04em] text-white">Daytime stress</p>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_58px] gap-3 rounded-[24px] border border-white/[0.05] bg-[#0c1518] p-3">
        <div
          className="min-h-0 overflow-hidden rounded-[18px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(31, 92, 75, 0.56) 0%, rgba(21, 74, 86, 0.48) 44%, rgba(11, 31, 55, 0.64) 100%)",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={daytimeStress} margin={{ top: 12, right: 10, bottom: 0, left: 10 }}>
              <XAxis
                dataKey="time"
                tickLine={false}
                tickMargin={8}
                axisLine={false}
                interval={1}
                height={24}
                tick={{ fill: "rgba(224,236,238,0.58)", fontSize: 10, fontWeight: 600 }}
              />
              <YAxis domain={[0, 80]} hide />
              <Tooltip content={<StressTooltip />} cursor={{ stroke: "rgba(255,255,255,0.16)", strokeWidth: 1 }} />
              {[20, 40, 60].map((tick) => (
                <ReferenceLine key={tick} y={tick} stroke="rgba(255,255,255,0.14)" />
              ))}
              <Line
                type="monotone"
                dataKey="value"
                stroke="rgba(255,255,255,0.92)"
                strokeWidth={2}
                dot={{ r: 2.5, fill: "#101216", stroke: "rgba(255,255,255,0.9)", strokeWidth: 1.3 }}
                activeDot={{ r: 4, fill: "white", stroke: "#101216", strokeWidth: 1.5 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex h-full flex-col justify-between py-2 text-right">
          {["Stressed", "Engaged", "Relaxed", "Restored"].map((label) => (
            <p key={label} className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#d7e9ee]/62">
              {label}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
