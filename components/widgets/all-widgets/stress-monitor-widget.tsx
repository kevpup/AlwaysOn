"use client"

import { stressMonitorData } from "@/lib/mock-data"

function getStressLevel(value: number) {
  if (value >= 60) {
    return { label: "High", className: "bg-rose-500/20 text-rose-300" }
  }

  if (value >= 35) {
    return { label: "Elevated", className: "bg-amber-500/20 text-amber-300" }
  }

  return { label: "Low", className: "bg-emerald-500/20 text-emerald-300" }
}

export function StressMonitorWidget() {
  const latest = stressMonitorData[stressMonitorData.length - 1].value

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-foreground">{latest}</p>
          <p className="text-xs text-muted-foreground">current stress score</p>
        </div>
        <span className="rounded-md bg-rose-500/15 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-rose-300">
          all day
        </span>
      </div>

      <div className="-mx-1 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col gap-2">
          {stressMonitorData.map((item) => {
            const stressLevel = getStressLevel(item.value)

            return (
              <div
                key={item.time}
                className="flex items-center justify-between gap-2 rounded-lg bg-secondary/50 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <span className="block text-sm font-medium text-foreground">{item.time}</span>
                  <span className="text-xs text-muted-foreground">stress score {item.value}</span>
                </div>
                <span className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-medium ${stressLevel.className}`}>
                  {stressLevel.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
