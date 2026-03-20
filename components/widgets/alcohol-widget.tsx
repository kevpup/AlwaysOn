"use client"

import { alcoholData } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">
          {payload[0].value} {payload[0].value === 1 ? "drink" : "drinks"}
        </p>
      </div>
    )
  }
  return null
}

export function AlcoholWidget() {
  const totalDrinks = alcoholData.reduce((s, d) => s + d.drinks, 0)

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Past 7 days</p>
        <p className="text-xs text-muted-foreground">
          Total: <span className="font-medium text-foreground">{totalDrinks} drinks</span>
        </p>
      </div>
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={alcoholData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "hsl(215, 12%, 55%)" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[0, 4]}
              tick={{ fontSize: 10, fill: "hsl(215, 12%, 55%)" }}
              tickLine={false}
              axisLine={false}
              width={25}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="drinks" radius={[4, 4, 0, 0]} barSize={24}>
              {alcoholData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.drinks > 0 ? "hsl(35, 90%, 55%)" : "hsl(220, 14%, 18%)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
