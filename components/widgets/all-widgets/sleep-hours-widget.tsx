"use client"

import { sleepHoursData } from "@/lib/mock-data"
import { LineChart, Line, ResponsiveContainer } from "recharts"

export function SleepHoursWidget() {
  const todaySleep = sleepHoursData[sleepHoursData.length - 1].hours
  const avg = (sleepHoursData.reduce((s, d) => s + d.hours, 0) / sleepHoursData.length).toFixed(1)

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">Last Night</p>
      <p className="text-4xl font-bold text-foreground">{todaySleep}</p>
      <p className="mb-3 text-sm text-muted-foreground">hours</p>
      <div className="w-full max-w-[140px]" style={{ height: 40 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sleepHoursData}>
            <Line
              type="monotone"
              dataKey="hours"
              stroke="hsl(200, 70%, 50%)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">7-day avg: {avg} hrs</p>
    </div>
  )
}
