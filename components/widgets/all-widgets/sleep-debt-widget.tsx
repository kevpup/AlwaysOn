"use client"

import { sleepDebtData } from "@/lib/mock-data"
import { BarChart, Bar, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{payload[0].value.toFixed(1)} hrs debt</p>
      </div>
    )
  }

  return null
}

export function SleepDebtWidget() {
  const currentDebt = sleepDebtData[sleepDebtData.length - 1].debt
  const trend = currentDebt - sleepDebtData[sleepDebtData.length - 2].debt
  const maxDebt = Math.max(...sleepDebtData.map((entry) => entry.debt))
  const averageDebt = sleepDebtData.reduce((sum, entry) => sum + entry.debt, 0) / sleepDebtData.length

  const getColor = (debt: number) => {
    if (debt >= 2) return "hsl(0, 72%, 51%)"
    if (debt >= 1) return "hsl(35, 90%, 55%)"
    return "hsl(160, 60%, 45%)"
  }

  const color = getColor(currentDebt)
  const trendLabel = trend <= 0 ? `${Math.abs(trend).toFixed(1)} hrs recovered` : `+${trend.toFixed(1)} hrs vs yesterday`
  const chartMax = Math.max(2.5, Math.ceil(maxDebt + 0.5))

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold" style={{ color }}>
            {currentDebt.toFixed(1)}
          </p>
          <p className="text-xs text-muted-foreground">current sleep debt</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-muted-foreground">{averageDebt.toFixed(1)}</p>
          <p className="text-xs text-muted-foreground">7-day avg</p>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sleepDebtData} margin={{ top: 6, right: 4, bottom: 6, left: -8 }}>
            <YAxis
              domain={[0, chartMax]}
              tick={{ fontSize: 10, fill: "hsl(215, 12%, 55%)" }}
              tickLine={false}
              axisLine={false}
              width={24}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "hsl(215, 12%, 55%)" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />
            <Bar dataKey="debt" radius={[4, 4, 0, 0]} barSize={18}>
              {sleepDebtData.map((entry) => (
                <Cell
                  key={entry.day}
                  fill={entry.day === sleepDebtData[sleepDebtData.length - 1].day ? color : "hsl(220, 18%, 50%)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">Peak this week: {maxDebt.toFixed(1)} hrs</p>
      <p className="mt-1 text-xs" style={{ color }}>
        {trendLabel}
      </p>
    </div>
  )
}
