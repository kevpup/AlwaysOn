"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis } from "recharts"

const ORANGE = "#ff6a00"

const weeklySteps = [
  { day: "M", value: 9840 },
  { day: "T", value: 10320 },
  { day: "W", value: 4180 },
  { day: "T", value: 10810 },
  { day: "F", value: 12640 },
  { day: "S", value: 9575 },
  { day: "S", value: 7104 },
]

function StepsTooltip({
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
    <div className="rounded-lg border border-black/10 bg-white px-3 py-2 shadow-md">
      <p className="text-xs text-[#6e6e73]">{label}</p>
      <p className="text-sm font-semibold text-[#1d1d1f]">{payload[0].value.toLocaleString()} steps</p>
    </div>
  )
}

export function AppleStepsCard({ metric }: WidgetSkinProps) {
  const averageSteps = Math.round(weeklySteps.reduce((total, item) => total + item.value, 0) / weeklySteps.length)

  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white px-3 pb-2.5 pt-3 shadow-sm">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">Steps today</p>
            <p className="mt-0.5 text-3xl font-bold leading-none tracking-[-0.04em]" style={{ color: ORANGE }}>
              {metric.primaryValue}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[11px] font-semibold lowercase text-[#6e6e73]">average</p>
            <p className="mt-0.5 text-base font-semibold leading-none text-[#1d1d1f]">
              {averageSteps.toLocaleString()}
            </p>
            <p className="mt-0.5 text-[10px] text-[#6e6e73]">steps</p>
          </div>
        </div>

        <div className="min-h-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklySteps} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fontWeight: 600, fill: "#86868b" }}
                tickLine={false}
                axisLine={false}
                interval={0}
              />
              <Tooltip content={<StepsTooltip />} cursor={{ fill: "rgba(255, 106, 0, 0.08)" }} />
              <Bar dataKey="value" barSize={16} radius={[0, 0, 0, 0]}>
                {weeklySteps.map((item, index) => (
                  <Cell key={`${item.day}-${index}`} fill={index === weeklySteps.length - 1 ? ORANGE : "#ff9f45"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
