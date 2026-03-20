"use client"

import { restorativeSleepData } from "@/lib/mock-data"

export function RestorativeSleepWidget() {
  const latest = restorativeSleepData[restorativeSleepData.length - 1]

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-foreground">{latest.percent}%</p>
          <p className="text-xs text-muted-foreground">restorative sleep</p>
        </div>
        <span className="rounded-md bg-violet-500/15 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-violet-300">
          {latest.hours.toFixed(1)} h
        </span>
      </div>

      <div className="-mx-1 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col gap-2">
          {restorativeSleepData.map((item) => (
            <div
              key={item.day}
              className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2.5"
            >
              <div className="min-w-0">
                <span className="block text-sm font-medium text-foreground">{item.day}</span>
                <span className="text-xs text-muted-foreground">{item.hours.toFixed(1)} restorative hours</span>
              </div>
              <span className="rounded-md bg-violet-500/15 px-2 py-0.5 text-[10px] font-medium text-violet-300">
                {item.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
