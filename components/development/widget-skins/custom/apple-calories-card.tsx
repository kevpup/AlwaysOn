"use client"

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const ENERGY_RED = "#ff3b30"

const weeklyCalories = [
  { day: "M", value: 620 },
  { day: "T", value: null },
  { day: "W", value: 410 },
  { day: "T", value: null },
  { day: "F", value: 785 },
  { day: "S", value: 540 },
  { day: "S", value: 742 },
]

const loggedCalories = weeklyCalories.filter((item): item is { day: string; value: number } => item.value !== null)
const averageCalories = Math.round(loggedCalories.reduce((total, item) => total + item.value, 0) / loggedCalories.length)
const maxCalories = Math.max(...loggedCalories.map((item) => item.value))

function CaloriesTooltip({
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
    <div className="rounded-lg border border-black/10 bg-white px-3 py-2 shadow-md">
      <p className="text-xs text-[#6e6e73]">{label}</p>
      <p className="text-sm font-semibold text-[#1d1d1f]">{payload[0].value.toLocaleString()} cal</p>
    </div>
  )
}

export function AppleCaloriesCard({ metric }: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white px-3 pb-2.5 pt-3 shadow-sm">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">Calories burned today</p>
            <p className="mt-0.5 text-3xl font-bold leading-none tracking-[-0.04em]" style={{ color: ENERGY_RED }}>
              {metric.primaryValue}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[11px] font-semibold lowercase text-[#6e6e73]">average</p>
            <p className="mt-0.5 text-base font-semibold leading-none text-[#1d1d1f]">
              {averageCalories.toLocaleString()}
            </p>
            <p className="mt-0.5 text-[10px] text-[#6e6e73]">cal/week</p>
          </div>
        </div>

        <div className="min-h-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyCalories} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fontWeight: 600, fill: "#86868b" }}
                tickLine={false}
                axisLine={false}
                interval={0}
              />
              <YAxis domain={[0, Math.ceil(maxCalories / 100) * 100]} hide />
              <Tooltip content={<CaloriesTooltip />} cursor={{ fill: "rgba(255, 59, 48, 0.08)" }} />
              <Bar dataKey="value" barSize={16} radius={[0, 0, 0, 0]}>
                {weeklyCalories.map((item, index) => (
                  <Cell
                    key={`${item.day}-${index}`}
                    fill={index === weeklyCalories.length - 1 ? ENERGY_RED : "#ff8a80"}
                    fillOpacity={item.value == null ? 0 : 1}
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
