"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"
import { defaultAppleWatchHrDataset } from "@/lib/apple-watch-hr-data"
import { getActivityHrData } from "@/lib/activity-hr-utils"
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

const WHOOP_HR_BLUE = "hsl(200, 70%, 50%)"
const WHOOP_AXIS_BLACK = "hsl(220, 20%, 4%)"

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
        <p className="text-sm font-semibold text-foreground">
          {payload[0].value} <span className="text-xs font-normal text-muted-foreground">bpm</span>
        </p>
      </div>
    )
  }
  return null
}

export function WhoopActivityHrCard({ hrDataset = defaultAppleWatchHrDataset }: WidgetSkinProps) {
  const activityData = getActivityHrData(hrDataset.fullDayLine)
  const { chartData, chartMin, chartMax, windowStart, windowEnd, averageHr, minHr, maxHr, activityName, durationFormatted } = activityData

  const axisMin = chartMin
  const axisMax = chartMax

  const yTicks = [

    axisMin,

    Math.round(axisMin + (axisMax - axisMin) * 0.33),

    Math.round(axisMin + (axisMax - axisMin) * 0.66),

    axisMax,

  ]
  const workoutStart = windowStart + 15
  const workoutEnd = windowEnd - 15

  const preBufferData = chartData.filter((d) => d.minuteOfDay <= workoutStart)
  const activeLineData = chartData.filter((d) => d.minuteOfDay >= workoutStart && d.minuteOfDay <= workoutEnd)
  const postBufferData = chartData.filter((d) => d.minuteOfDay >= workoutEnd)

  const xTicks = [windowStart, workoutStart, workoutEnd, windowEnd]

  function formatTick(minuteOfDay: number) {
    let h = Math.floor(minuteOfDay / 60)
    const m = minuteOfDay % 60
    const ampm = h >= 12 ? "PM" : "AM"
    h = h % 12
    h = h ? h : 12
    return `${h}:${m.toString().padStart(2, "0")} ${ampm}`
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4">
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-foreground">{activityName}</h3>
        <p className="text-xs text-muted-foreground">{durationFormatted}</p>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">{averageHr}</span>
          <span className="text-xs text-muted-foreground">average HR</span>
        </div>
        <div className="flex gap-3 text-xs text-muted-foreground">
          <span>
            Low <span className="font-medium" style={{ color: WHOOP_HR_BLUE }}>{minHr}</span>
          </span>
          <span>
            High <span className="font-medium" style={{ color: WHOOP_HR_BLUE }}>{maxHr}</span>
          </span>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[28px_1fr] gap-1">
        <div className="relative pb-[24px] pt-[8px]">
          <div className="relative h-full w-full pr-1" style={{ borderRight: `1px solid ${WHOOP_AXIS_BLACK}` }}>
            {yTicks.map((tick) => (
              <span
                key={tick}
                className="absolute right-1 translate-y-1/2 text-[10px] text-[hsl(215,12%,55%)]"
                style={{ bottom: `${((tick - axisMin) / (axisMax - axisMin)) * 100}%` }}
              >
                {tick}
              </span>
            ))}
          </div>
        </div>

        <div className="relative min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="whoopHeartRateGradientActivity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={WHOOP_HR_BLUE} stopOpacity={0.34} />
                  <stop offset="100%" stopColor={WHOOP_HR_BLUE} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="minuteOfDay"
                domain={[windowStart, windowEnd]}
                tickFormatter={formatTick}
                tickLine={false}
                tickMargin={8}
                ticks={xTicks}
                type="number"
                axisLine={{ stroke: WHOOP_AXIS_BLACK, strokeOpacity: 0.9 }}
                height={24}
              />
              <YAxis
                domain={[axisMin, axisMax]}
                hide
              />
              <Tooltip content={<CustomTooltip />} />
              {yTicks.map((tick) => (
                <ReferenceLine key={tick} y={tick} stroke={WHOOP_AXIS_BLACK} strokeDasharray="3 3" strokeOpacity={0.75} />
              ))}
              <Area
                data={preBufferData}
                type="linear"
                dataKey="hr"
                fill="url(#whoopHeartRateGradientActivity)"
                stroke={WHOOP_HR_BLUE}
                strokeOpacity={0.25}
                fillOpacity={0.25}
                strokeWidth={1}
                dot={false}
                activeDot={false}
                isAnimationActive={false}
              />
              <Area
                data={activeLineData}
                type="linear"
                dataKey="hr"
                fill="url(#whoopHeartRateGradientActivity)"
                stroke={WHOOP_HR_BLUE}
                strokeWidth={1}
                dot={false}
                activeDot={{ r: 4, fill: WHOOP_HR_BLUE, strokeWidth: 0 }}
                isAnimationActive={false}
              />
              <Area
                data={postBufferData}
                type="linear"
                dataKey="hr"
                fill="url(#whoopHeartRateGradientActivity)"
                stroke={WHOOP_HR_BLUE}
                strokeOpacity={0.25}
                fillOpacity={0.25}
                strokeWidth={1}
                dot={false}
                activeDot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
