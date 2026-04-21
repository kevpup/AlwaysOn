"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"
import { defaultAppleWatchHrDataset } from "@/lib/apple-watch-hr-data"
import { getActivityHrData } from "@/lib/activity-hr-utils"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-white/10 bg-[#1e1e1e] px-3 py-2 shadow-lg">
        <p className="text-xs font-semibold text-white">
          {payload[0].value} <span className="text-[10px] uppercase tracking-[0.1em] text-[#8e8e93]">bpm</span>
        </p>
      </div>
    )
  }
  return null
}

const CustomDot = (props: any) => {
  const { cx, cy, payload, maxHr, minHr } = props
  if (payload.hr === maxHr || payload.hr === minHr) {
    return <circle cx={cx} cy={cy} r={3} fill="white" />
  }
  return null
}

export function OuraActivityHrCard({ hrDataset = defaultAppleWatchHrDataset }: WidgetSkinProps) {
  const activityData = getActivityHrData(hrDataset.fullDayLine, 840, 120, false)
  const { chartData, chartMin, chartMax, workoutStart, workoutEnd, averageHr, minHr, maxHr, activityName, durationFormatted } = activityData

  function formatTimeOfDay(minuteOfDay: number) {
    let h = Math.floor(minuteOfDay / 60)
    const m = Math.floor(minuteOfDay % 60)
    const ampm = h >= 12 ? "PM" : "AM"
    h = h % 12
    h = h ? h : 12
    return `${h}:${m.toString().padStart(2, "0")} ${ampm}`
  }

  const durationSecs = 120 * 60
  const durationStr = `${Math.floor(durationSecs / 60)}m ${durationSecs % 60}s`
  const workoutLength = workoutEnd - workoutStart

  const yTicks = [chartMax, Math.round((chartMin + chartMax) / 2), chartMin]

  return (
    <div className="relative flex h-full overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] p-6 text-white shadow-lg">
      <div className="relative flex h-full w-full flex-col">
        {/* Header */}
        <div className="mb-4 flex items-baseline gap-2">
          <h2 className="text-[24px] font-medium tracking-tight">{activityName}</h2>
          <p className="text-[14px] font-medium text-[#8e8e93]">
            Today, {formatTimeOfDay(workoutStart)}
          </p>
        </div>

        {/* 3 Stats */}
        <div className="mb-8 flex gap-8">
          <div>
            <p className="text-[11px] font-semibold text-[#8e8e93]">Duration</p>
            <p className="mt-0.5 text-[15px] font-semibold tracking-tight">{durationFormatted.replace(' hr', 'h').replace(' min', 'm')}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#8e8e93]">Avg heart rate</p>
            <p className="mt-0.5 text-[15px] font-semibold tracking-tight">{averageHr} bpm</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#8e8e93]">Max HR</p>
            <p className="mt-0.5 text-[15px] font-semibold tracking-tight">{maxHr} bpm</p>
          </div>
        </div>

        {/* Chart Area */}
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_32px]">
          <div className="relative min-h-0 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
                <XAxis
                  dataKey="minuteOfDay"
                  domain={[workoutStart, workoutEnd]}
                  tick={false}
                  tickLine={false}
                  axisLine={false}
                  height={0}
                />
                <YAxis
                  domain={[chartMin, chartMax]}
                  hide
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#8e8e93", strokeWidth: 1, strokeDasharray: "3 3" }} />
                
                <ReferenceLine y={averageHr} stroke="#8e8e93" strokeOpacity={0.5} strokeDasharray="3 3" />

                <Line
                  type="linear"
                  dataKey="hr"
                  stroke="#2db5f2"
                  strokeWidth={2.5}
                  dot={<CustomDot maxHr={maxHr} minHr={minHr} />}
                  activeDot={{ r: 4, fill: "white", stroke: "#2db5f2", strokeWidth: 2 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* X-Axis Labels (Custom Overlay to match design exactly) */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] font-medium text-[#8e8e93]">
              <span>{formatTimeOfDay(workoutStart)}</span>
              <span>{formatTimeOfDay(workoutStart + workoutLength * 0.33)}</span>
              <span>{formatTimeOfDay(workoutStart + workoutLength * 0.66)}</span>
              <span>{formatTimeOfDay(workoutEnd)}</span>
            </div>
          </div>

          <div className="relative pb-[24px] pt-[8px]">
            <div className="relative h-full w-full pl-2">
              <span className="absolute top-0 text-[10px] font-medium text-white" style={{ transform: "translateY(-50%)" }}>
                Max {maxHr}
              </span>
              <span className="absolute bottom-0 text-[10px] font-medium text-white" style={{ transform: "translateY(50%)" }}>
                Min {minHr}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
