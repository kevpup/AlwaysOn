"use client"

import { workoutLog } from "@/lib/mock-data"
import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

function getIntensityTone(intensity: string) {
  switch (intensity) {
    case "High":
      return "bg-red-500/16 text-red-300 ring-red-400/30"
    case "Medium":
      return "bg-amber-500/16 text-amber-200 ring-amber-300/30"
    case "Low":
      return "bg-cyan-400/16 text-cyan-200 ring-cyan-300/30"
    default:
      return "bg-muted text-muted-foreground ring-border"
  }
}

export function WhoopWorkoutReportCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Workout Report</p>
          <p className="mt-1 text-2xl font-bold leading-none tracking-[-0.04em] text-foreground">Recent Sessions</p>
        </div>

        <div className="rounded-full border border-border bg-background/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          8 logged
        </div>
      </div>

      <div className="-mx-1 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col gap-2">
          {workoutLog.map((workout) => (
            <div
              key={workout.id}
              className="rounded-2xl border border-border bg-background/45 px-3 py-2.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{workout.type}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">
                    {workout.date} · {workout.duration}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ring-1 ${getIntensityTone(
                    workout.intensity
                  )}`}
                >
                  {workout.intensity}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                <span>{workout.calories} cal</span>
                <span>{workout.intensity} effort</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
