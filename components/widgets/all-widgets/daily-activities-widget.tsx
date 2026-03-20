"use client"

import { dailyActivitiesData } from "@/lib/mock-data"

export function DailyActivitiesWidget() {
  const totalMinutes = dailyActivitiesData.reduce((sum, item) => sum + Number.parseInt(item.duration, 10), 0)

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-foreground">{totalMinutes} min</p>
          <p className="text-xs text-muted-foreground">activity logged today</p>
        </div>
        <span className="rounded-md bg-orange-500/15 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-orange-300">
          daily
        </span>
      </div>

      <div className="-mx-1 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col gap-2">
          {dailyActivitiesData.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2.5"
            >
              <div className="min-w-0">
                <span className="block truncate text-sm font-medium text-foreground">{item.label}</span>
                <span className="truncate text-xs text-muted-foreground">{item.energy}</span>
              </div>
              <span className="rounded-md bg-orange-500/15 px-2 py-0.5 text-[10px] font-medium text-orange-300">
                {item.duration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
