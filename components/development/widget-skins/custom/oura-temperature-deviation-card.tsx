"use client"

import {
  Bar,
  BarChart,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const temperatureWeek = [
  { day: "Mon", value: -0.1 },
  { day: "Tue", value: -0.3 },
  { day: "Wed", value: 0.1 },
  { day: "Thu", value: 0.4 },
  { day: "Fri", value: 0.2 },
  { day: "Sat", value: -0.2 },
  { day: "Sun", value: 0.2 },
]

const selectedDay = temperatureWeek[temperatureWeek.length - 1]

function formatDeviation(value: number) {
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toFixed(1)}°C`
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
  if (!active || !payload?.length || payload[0].value == null) return null

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#171a1f] px-3 py-2 shadow-xl">
      <p className="text-[11px] font-medium text-[#b8c3cc]/65">{label}</p>
      <p className="text-sm font-semibold text-white">{formatDeviation(payload[0].value)}</p>
    </div>
  )
}

export function OuraTemperatureDeviationCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[30px] border border-white/[0.08] bg-[#071522] p-5 text-white shadow-[0_22px_46px_rgba(0,0,0,0.34)]">
      <div className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8c3cc]/66">Temperature deviation</p>
        <div className="mt-3 flex items-baseline gap-2">
          <p className="text-6xl font-semibold leading-none tracking-[-0.08em] text-white">
            {formatDeviation(selectedDay.value)}
          </p>
        </div>
        <p className="mt-2 text-sm font-medium text-[#b8c3cc]/62">Distance from baseline</p>
      </div>

      <div className="min-h-0 flex-1 rounded-[24px] border border-white/[0.06] bg-[#0b1d2c] px-2 py-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={temperatureWeek} margin={{ top: 12, right: 10, bottom: 0, left: 10 }}>
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              interval={0}
              height={24}
              tick={{ fill: "rgba(184,195,204,0.58)", fontSize: 10, fontWeight: 600 }}
            />
            <YAxis domain={[-0.5, 0.5]} hide />
            <Tooltip content={<TemperatureTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.54)" strokeWidth={1.4} />
            {[-0.4, 0.4].map((tick) => (
              <ReferenceLine key={tick} y={tick} stroke="rgba(255,255,255,0.08)" />
            ))}
            <Bar dataKey="value" barSize={10} radius={[6, 6, 6, 6]}>
              {temperatureWeek.map((item) => {
                const isSelected = item.day === selectedDay.day
                const fill = item.value >= 0 ? "#8bdde8" : "#668fd8"

                return (
                  <Cell
                    key={item.day}
                    fill={fill}
                    fillOpacity={isSelected ? 1 : 0.54}
                    stroke={isSelected ? "rgba(255,255,255,0.9)" : "transparent"}
                    strokeWidth={isSelected ? 1.4 : 0}
                  />
                )
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
