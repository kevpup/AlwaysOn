"use client"

import { sleepStagesData } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
        <p className="mb-1 text-xs text-muted-foreground">{label}</p>
        {payload.map((entry) => (
          <p key={entry.name} className="text-xs">
            <span style={{ color: entry.color }}>{entry.name}</span>:{" "}
            <span className="font-medium text-foreground">{entry.value} min</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function SleepGraphWidget() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "hsl(250, 60%, 50%)" }} />
          Deep
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "hsl(200, 70%, 50%)" }} />
          Light
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "hsl(160, 60%, 45%)" }} />
          REM
        </span>
      </div>
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sleepStagesData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: "hsl(215, 12%, 55%)" }}
              tickLine={false}
              axisLine={false}
              interval={3}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(215, 12%, 55%)" }}
              tickLine={false}
              axisLine={false}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={() => null} />
            <Bar dataKey="deep" stackId="sleep" fill="hsl(250, 60%, 50%)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="light" stackId="sleep" fill="hsl(200, 70%, 50%)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="rem" stackId="sleep" fill="hsl(160, 60%, 45%)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
