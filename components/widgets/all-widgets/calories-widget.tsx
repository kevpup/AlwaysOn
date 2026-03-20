"use client"

import { caloriesData } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{payload[0].value.toLocaleString()} cal</p>
      </div>
    )
  }
  return null
}

export function CaloriesWidget() {
  const todayCal = caloriesData[caloriesData.length - 1].calories
  const avg = Math.round(caloriesData.reduce((s, d) => s + d.calories, 0) / caloriesData.length)

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-foreground">{todayCal.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">calories today</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-muted-foreground">{avg.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">7-day avg</p>
        </div>
      </div>
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={caloriesData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "hsl(215, 12%, 55%)" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="calories" fill="hsl(35, 90%, 55%)" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
