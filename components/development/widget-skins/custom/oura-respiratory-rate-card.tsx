"use client"

import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const respiratoryWeek = [
  { day: "Mon", value: 14.1 },
  { day: "Tue", value: 14.3 },
  { day: "Wed", value: 14.0 },
  { day: "Thu", value: 14.4 },
  { day: "Fri", value: 14.2 },
  { day: "Sat", value: 14.6 },
  { day: "Sun", value: 14.5 },
]

const selectedDay = respiratoryWeek[respiratoryWeek.length - 1]

function RespiratoryTooltip({
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
      <p className="text-sm font-semibold text-white">{payload[0].value.toFixed(1)} br/min</p>
    </div>
  )
}

export function OuraRespiratoryRateCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[30px] border border-white/[0.08] bg-[#101216] p-5 text-white shadow-[0_22px_46px_rgba(0,0,0,0.34)]">
      <div className="mb-4">
        <p className="text-2xl font-semibold leading-none tracking-[-0.04em] text-white">Respiratory rate</p>
        <div className="mt-4 flex items-baseline gap-2">
          <p className="text-5xl font-semibold leading-none tracking-[-0.08em] text-white">
            {selectedDay.value.toFixed(1)}
          </p>
          <p className="text-sm font-medium text-[#b8c3cc]/72">br/min</p>
        </div>
        <p className="mt-2 text-sm font-medium text-[#b8c3cc]/62">{selectedDay.day} selected</p>
      </div>

      <div className="min-h-0 flex-1 rounded-[24px] bg-white/[0.025] px-2 py-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={respiratoryWeek} margin={{ top: 10, right: 8, bottom: 0, left: 8 }}>
            <defs>
              <linearGradient id="ouraRespiratoryFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#8be2ec" stopOpacity={0.24} />
                <stop offset="100%" stopColor="#8be2ec" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              interval={0}
              height={24}
              tick={{ fill: "rgba(184,195,204,0.56)", fontSize: 10, fontWeight: 600 }}
            />
            <YAxis domain={[13.5, 15]} hide />
            <Tooltip content={<RespiratoryTooltip />} cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }} />
            {[13.8, 14.4].map((tick) => (
              <ReferenceLine key={tick} y={tick} stroke="rgba(255,255,255,0.07)" />
            ))}
            <ReferenceLine x={selectedDay.day} stroke="rgba(139,226,236,0.24)" />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#bceff4"
              strokeWidth={1.9}
              fill="url(#ouraRespiratoryFill)"
              dot={false}
              activeDot={{ r: 4, fill: "#dffcff", stroke: "#101216", strokeWidth: 1.5 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
