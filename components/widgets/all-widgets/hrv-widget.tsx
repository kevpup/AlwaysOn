"use client"

import { hrvData } from "@/lib/mock-data"
import { LineChart, Line, ResponsiveContainer } from "recharts"

export function HrvWidget() {
  const todayHrv = hrvData[hrvData.length - 1].hrv
  const avg = Math.round(hrvData.reduce((s, d) => s + d.hrv, 0) / hrvData.length)

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">Current HRV</p>
      <p className="text-4xl font-bold text-foreground">{todayHrv}</p>
      <p className="mb-3 text-sm text-muted-foreground">ms</p>
      <div className="w-full max-w-[140px]" style={{ height: 40 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hrvData}>
            <Line
              type="monotone"
              dataKey="hrv"
              stroke="hsl(160, 60%, 45%)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">7-day avg: {avg} ms</p>
    </div>
  )
}
