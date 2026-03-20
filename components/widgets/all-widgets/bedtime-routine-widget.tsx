"use client"

import { bedtimeRoutineData } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">
          {payload[0].value}x this week
        </p>
      </div>
    )
  }
  return null
}

export function BedtimeRoutineWidget() {
  return (
    <div className="flex h-full flex-col">
      <p className="mb-3 text-xs text-muted-foreground">Weekly habit frequency</p>
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bedtimeRoutineData} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
            <XAxis type="number" domain={[0, 7]} tick={{ fontSize: 10, fill: "hsl(215, 12%, 55%)" }} tickLine={false} axisLine={false} />
            <YAxis
              type="category"
              dataKey="habit"
              tick={{ fontSize: 11, fill: "hsl(215, 12%, 75%)" }}
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="total" fill="hsl(200, 70%, 50%)" radius={[0, 4, 4, 0]} barSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
