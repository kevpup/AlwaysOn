"use client"

import { temperatureDeviationData } from "@/lib/mock-data"

export function TemperatureDeviationWidget() {
  const latest = temperatureDeviationData[temperatureDeviationData.length - 1]
  const maxAbs = Math.max(...temperatureDeviationData.map((item) => Math.abs(item.value)))

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-3xl font-bold text-foreground">
            {latest.value > 0 ? "+" : ""}
            {latest.value.toFixed(1)} F
          </p>
          <p className="text-sm text-muted-foreground">from baseline</p>
        </div>
        <span className="rounded-md bg-orange-500/15 px-2 py-1 text-xs font-medium uppercase tracking-[0.14em] text-orange-300">
          draft
        </span>
      </div>

      <div className="flex min-h-0 flex-1 items-end gap-2 rounded-xl bg-secondary/40 px-3 py-3">
        {temperatureDeviationData.map((item) => {
          const height = maxAbs === 0 ? 8 : 18 + (Math.abs(item.value) / maxAbs) * 58
          const isPositive = item.value >= 0

          return (
            <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-20 items-center">
                <div
                  className={`w-4 rounded-full ${isPositive ? "bg-orange-400" : "bg-sky-400"}`}
                  style={{ height }}
                  aria-label={`${item.day}: ${item.value} degrees Fahrenheit from baseline`}
                />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">{item.day[0]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
