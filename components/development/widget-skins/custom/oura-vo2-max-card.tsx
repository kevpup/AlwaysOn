"use client"

import {
  Label,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const vo2Trend = [
  { month: "Jan", value: 38 },
  { month: "Feb", value: 39 },
  { month: "Mar", value: 39.5 },
  { month: "Apr", value: 40 },
  { month: "May", value: 41 },
  { month: "Jun", value: 40.5 },
  { month: "Jul", value: 41.5 },
  { month: "Aug", value: 42 },
  { month: "Sep", value: 42.4 },
  { month: "Oct", value: 42 },
]

const selectedMonth = "Oct"

function Vo2Tooltip({
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
      <p className="text-sm font-semibold text-white">VO2 max {payload[0].value}</p>
    </div>
  )
}

export function OuraVo2MaxCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[30px] border border-white/[0.08] bg-[#101216] p-5 text-white shadow-[0_22px_46px_rgba(0,0,0,0.34)]">
      <div className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8c3cc]/72">Cardio Capacity</p>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-4xl font-semibold leading-none tracking-[-0.06em]">42</p>
          <p className="text-sm font-medium text-[#e7edf2]/75">VO2 max</p>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_42px] gap-2 rounded-[24px] bg-white/[0.025] px-2 py-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={vo2Trend} margin={{ top: 24, right: 8, bottom: 0, left: 4 }}>
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              interval={1}
              height={24}
              tick={{ fill: "rgba(184,195,204,0.58)", fontSize: 10, fontWeight: 600 }}
            />
            <YAxis domain={[30, 50]} hide />
            <Tooltip content={<Vo2Tooltip />} cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }} />
            {[34, 38, 42, 46].map((tick) => (
              <ReferenceLine key={tick} y={tick} stroke="rgba(255,255,255,0.07)" />
            ))}
            <ReferenceLine x={selectedMonth} stroke="rgba(255,255,255,0.28)" strokeWidth={1}>
              <Label
                value="VO2 max 42"
                position="top"
                fill="rgba(255,255,255,0.9)"
                fontSize={11}
                fontWeight={700}
              />
            </ReferenceLine>
            <Line
              type="monotone"
              dataKey="value"
              stroke="rgba(255,255,255,0.88)"
              strokeWidth={1.8}
              dot={{ r: 2.6, fill: "#101216", stroke: "rgba(255,255,255,0.82)", strokeWidth: 1.4 }}
              activeDot={{ r: 4, fill: "white", stroke: "#101216", strokeWidth: 1.5 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="flex h-full flex-col justify-between py-5 text-right">
          {["Peak", "High", "Fair", "Low"].map((label) => (
            <p key={label} className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#b8c3cc]/55">
              {label}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
