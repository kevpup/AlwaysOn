"use client"

import { healthMonitorData } from "@/lib/mock-data"

function getStatusColor(status: string) {
  return status === "In range"
    ? "bg-emerald-500/20 text-emerald-400"
    : "bg-amber-500/20 text-amber-300"
}

export function HealthMonitorWidget() {
  const count = healthMonitorData.filter((item) => item.status === "In range").length

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-foreground">{count}/{healthMonitorData.length}</p>
          <p className="text-xs text-muted-foreground">metrics in range</p>
        </div>
        <span className="rounded-md bg-emerald-500/15 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-emerald-300">
          status
        </span>
      </div>

      <div className="-mx-1 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col gap-2">
          {healthMonitorData.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-2 rounded-lg bg-secondary/50 px-3 py-2.5"
            >
              <div className="min-w-0">
                <span className="block truncate text-sm font-medium text-foreground">{item.label}</span>
                <span className="truncate text-xs text-muted-foreground">{item.value}</span>
              </div>
              <span className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-medium ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
