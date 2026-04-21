"use client"

import { bloodOxygenData } from "@/lib/mock-data"

export function BloodOxygenWidget() {
  const latest = bloodOxygenData[bloodOxygenData.length - 1]
  const average = Math.round(bloodOxygenData.reduce((sum, item) => sum + item.value, 0) / bloodOxygenData.length)

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-3xl font-bold text-foreground">{latest.value}%</p>
          <p className="text-sm text-muted-foreground">blood oxygen</p>
        </div>
        <span className="rounded-md bg-cyan-500/15 px-2 py-1 text-xs font-medium uppercase tracking-[0.14em] text-cyan-300">
          draft
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-between rounded-xl bg-secondary/40 px-3 py-3">
        <div className="flex items-end gap-2">
          {bloodOxygenData.map((item) => (
            <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-16 items-end">
                <div
                  className="w-4 rounded-full bg-cyan-400"
                  style={{ height: 16 + (item.value - 94) * 9 }}
                  aria-label={`${item.day}: ${item.value}% blood oxygen`}
                />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">{item.day[0]}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-lg bg-background/60 px-3 py-2">
          <p className="text-sm font-medium text-foreground">7-day average</p>
          <p className="text-xs text-muted-foreground">{average}% SpO2</p>
        </div>
      </div>
    </div>
  )
}
