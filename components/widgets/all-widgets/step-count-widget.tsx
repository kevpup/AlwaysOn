"use client"

import { stepCountData } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{payload[0].value.toLocaleString()} steps</p>
      </div>
    )
  }
  return null
}

export function StepCountWidget() {
  const todaySteps = stepCountData[stepCountData.length - 1].steps
  const avg = Math.round(stepCountData.reduce((s, d) => s + d.steps, 0) / stepCountData.length)
  const goal = 10000

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-foreground">{todaySteps.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">steps today</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-muted-foreground">{avg.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">7-day avg</p>
        </div>
      </div>
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stepCountData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "hsl(215, 12%, 55%)" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={goal}
              stroke="hsl(160, 60%, 45%)"
              strokeDasharray="4 4"
              strokeOpacity={0.5}
            />
            <Bar
              dataKey="steps"
              radius={[4, 4, 0, 0]}
              barSize={20}
              fill="hsl(200, 70%, 50%)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-1 text-center text-[10px] text-muted-foreground">
        Dashed line = {goal.toLocaleString()} step goal
      </p>
    </div>
  )
}
