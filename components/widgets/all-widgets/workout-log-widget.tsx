"use client"

import { workoutLog } from "@/lib/mock-data"

export function WorkoutLogWidget() {
  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "High":
        return "bg-red-500/20 text-red-400"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "Low":
        return "bg-emerald-500/20 text-emerald-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="flex h-full flex-col">
      <p className="mb-3 text-sm text-muted-foreground">Recent sessions</p>
      <div className="-mx-1 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col gap-2">
          {workoutLog.map((w) => (
            <div
              key={w.id}
              className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2.5"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-base font-medium text-foreground">{w.type}</span>
                <span className="text-sm text-muted-foreground">
                  {w.date} &middot; {w.duration}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">{w.calories} cal</span>
                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-medium ${getIntensityColor(w.intensity)}`}
                >
                  {w.intensity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
