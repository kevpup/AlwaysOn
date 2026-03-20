"use client"

import { sleepDebtData } from "@/lib/mock-data"
import { BarChart, Bar, Cell, ResponsiveContainer } from "recharts"

export function SleepDebtWidget() {
  const currentDebt = sleepDebtData[sleepDebtData.length - 1].debt
  const trend = currentDebt - sleepDebtData[sleepDebtData.length - 2].debt
  const maxDebt = Math.max(...sleepDebtData.map((entry) => entry.debt))

  const getColor = (debt: number) => {
    if (debt >= 2) return "hsl(0, 72%, 51%)"
    if (debt >= 1) return "hsl(35, 90%, 55%)"
    return "hsl(160, 60%, 45%)"
  }

  const color = getColor(currentDebt)
  const trendLabel = trend <= 0 ? `${Math.abs(trend).toFixed(1)} hrs recovered` : `+${trend.toFixed(1)} hrs vs yesterday`

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">Current Debt</p>
      <p className="text-4xl font-bold" style={{ color }}>
        {currentDebt.toFixed(1)}
      </p>
      <p className="mb-3 text-sm text-muted-foreground">hours</p>
      <div className="w-full max-w-[160px]" style={{ height: 52 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sleepDebtData}>
            <Bar dataKey="debt" radius={[4, 4, 0, 0]}>
              {sleepDebtData.map((entry) => (
                <Cell
                  key={entry.day}
                  fill={entry.day === sleepDebtData[sleepDebtData.length - 1].day ? color : "hsl(220, 14%, 28%)"}
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
