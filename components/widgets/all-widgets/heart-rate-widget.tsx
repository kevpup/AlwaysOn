"use client"

import { heartRateData } from "@/lib/mock-data"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-base font-semibold text-foreground">
          {payload[0].value} <span className="text-sm font-normal text-muted-foreground">bpm</span>
        </p>
      </div>
    )
  }
  return null
}

export function HeartRateWidget() {
  const currentHr = heartRateData[heartRateData.length - 1].hr
  const maxHr = Math.max(...heartRateData.map((d) => d.hr))
  const minHr = Math.min(...heartRateData.map((d) => d.hr))

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">{currentHr}</span>
          <span className="text-sm text-muted-foreground">bpm current</span>
        </div>
        <div className="flex gap-3 text-sm text-muted-foreground">
          <span>
            Low <span className="font-medium text-chart-2">{minHr}</span>
          </span>
          <span>
            High <span className="font-medium text-chart-4">{maxHr}</span>
          </span>
        </div>
      </div>
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={heartRateData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12, fill: "hsl(215, 12%, 55%)" }}
              tickLine={false}
              axisLine={false}
              interval={15}
            />
            <YAxis
              domain={[40, 200]}
              tick={{ fontSize: 12, fill: "hsl(215, 12%, 55%)" }}
              tickLine={false}
              axisLine={false}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={60} stroke="hsl(215, 12%, 25%)" strokeDasharray="3 3" />
            <ReferenceLine y={100} stroke="hsl(215, 12%, 25%)" strokeDasharray="3 3" />
            <ReferenceLine y={150} stroke="hsl(215, 12%, 25%)" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="hr"
              stroke="hsl(0, 72%, 51%)"
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 4, fill: "hsl(0, 72%, 51%)", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
