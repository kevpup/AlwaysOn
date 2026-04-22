"use client"

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const ACTIVITY_GREEN = "#34c759"

const workoutMinutesWeek = [
  { day: "M", minutes: 18 },
  { day: "T", minutes: 42 },
  { day: "W", minutes: 0 },
  { day: "T", minutes: 36 },
  { day: "F", minutes: 24 },
  { day: "S", minutes: 61 },
  { day: "S", minutes: 27 },
]

const todayWorkoutMinutes = 27
const weeklyAverageWorkoutMinutes = 30
const maxWorkoutMinutes = Math.max(...workoutMinutesWeek.map((item) => item.minutes))

function WorkoutMinutesTooltip({
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
      <p className="text-sm font-semibold text-[#1d1d1f]">{payload[0].value} min</p>
    </div>
  )
}

export function AppleWorkoutMinutesCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white px-3 pb-2.5 pt-3 shadow-sm">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">Workout minutes today</p>
            <p className="mt-0.5 text-3xl font-bold leading-none tracking-[-0.04em]" style={{ color: ACTIVITY_GREEN }}>
              {todayWorkoutMinutes}
            </p>
            <p className="mt-0.5 text-[10px] text-[#6e6e73]">min</p>
          </div>

          <div className="text-right">
            <p className="text-[11px] font-semibold lowercase text-[#6e6e73]">average</p>
            <p className="mt-0.5 text-base font-semibold leading-none text-[#1d1d1f]">
              {weeklyAverageWorkoutMinutes}
            </p>
            <p className="mt-0.5 text-[10px] text-[#6e6e73]">min/week</p>
          </div>
        </div>

        <div className="min-h-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workoutMinutesWeek} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fontWeight: 600, fill: "#86868b" }}
                tickLine={false}
                axisLine={false}
                interval={0}
              />
              <YAxis domain={[0, Math.ceil(maxWorkoutMinutes / 10) * 10]} hide />
              <Tooltip content={<WorkoutMinutesTooltip />} cursor={{ fill: "rgba(52, 199, 89, 0.08)" }} />
              <Bar dataKey="minutes" barSize={16} radius={[0, 0, 0, 0]}>
                {workoutMinutesWeek.map((item, index) => (
                  <Cell
                    key={`${item.day}-${index}`}
                    fill={index === workoutMinutesWeek.length - 1 ? ACTIVITY_GREEN : "#8be7a4"}
                    fillOpacity={item.minutes === 0 ? 0.18 : 1}
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
