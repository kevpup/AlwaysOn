"use client"

import { journalSummaryData } from "@/lib/mock-data"

export function JournalWidget() {
  const totalEntries = journalSummaryData.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-foreground">{totalEntries}</p>
          <p className="text-xs text-muted-foreground">journal entries this week</p>
        </div>
        <span className="rounded-md bg-sky-500/15 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-sky-300">
          habits
        </span>
      </div>

      <div className="-mx-1 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col gap-2">
          {journalSummaryData.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2.5"
            >
              <div className="min-w-0">
                <span className="block truncate text-sm font-medium text-foreground">{item.label}</span>
                <span className="text-xs text-muted-foreground">logged this week</span>
              </div>
              <span className="rounded-md bg-sky-500/15 px-2 py-0.5 text-[10px] font-medium text-sky-300">
                {item.count}x
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
