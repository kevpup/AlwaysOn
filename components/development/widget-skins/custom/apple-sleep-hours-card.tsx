"use client"

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const SLEEP_BLUE = "#2f80ed"

const weeklySleepHours = [
  { day: "M", value: 7.3 },
  { day: "T", value: 6.8 },
  { day: "W", value: 8.1 },
  { day: "T", value: 7.0 },
  { day: "F", value: 8.0 },
  { day: "S", value: 7.6 },
  { day: "S", value: 7.7 },
]

const lastNightSleep = weeklySleepHours[weeklySleepHours.length - 1].value
const averageSleep = weeklySleepHours.reduce((total, item) => total + item.value, 0) / weeklySleepHours.length
const maxSleep = Math.max(...weeklySleepHours.map((item) => item.value))

function formatHours(hours: number) {
  const wholeHours = Math.floor(hours)
  const minutes = Math.round((hours - wholeHours) * 60)

  return `${wholeHours}h ${minutes}m`
}

function SleepHoursTooltip({
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
    <div className="rounded-lg border border-black/10 bg-white px-3 py-2 shadow-md">
      <p className="text-xs text-[#6e6e73]">{label}</p>
      <p className="text-sm font-semibold text-[#1d1d1f]">{formatHours(payload[0].value)}</p>
    </div>
  )
}

export function AppleSleepHoursCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white px-3 pb-2.5 pt-3 shadow-sm">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">Last night</p>
            <p className="mt-0.5 text-3xl font-bold leading-none tracking-[-0.04em]" style={{ color: SLEEP_BLUE }}>
              {formatHours(lastNightSleep)}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[11px] font-semibold lowercase text-[#6e6e73]">average</p>
            <p className="mt-0.5 text-base font-semibold leading-none text-[#1d1d1f]">{formatHours(averageSleep)}</p>
            <p className="mt-0.5 text-[10px] text-[#6e6e73]">past week</p>
          </div>
        </div>

        <div className="min-h-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklySleepHours} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fontWeight: 600, fill: "#86868b" }}
                tickLine={false}
                axisLine={false}
                interval={0}
              />
              <YAxis domain={[0, Math.ceil(maxSleep)]} hide />
              <Tooltip content={<SleepHoursTooltip />} cursor={{ fill: "rgba(47, 128, 237, 0.08)" }} />
              <Bar dataKey="value" barSize={16} radius={[0, 0, 0, 0]}>
                {weeklySleepHours.map((item, index) => (
                  <Cell
                    key={`${item.day}-${index}`}
                    fill={index === weeklySleepHours.length - 1 ? SLEEP_BLUE : "#8fc2ff"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
