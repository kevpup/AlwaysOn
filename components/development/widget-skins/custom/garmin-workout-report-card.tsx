"use client"

import { workoutLog } from "@/lib/mock-data"
import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

function getIntensityTone(intensity: string) {
  switch (intensity) {
    case "High":
      return "border-[#ff453a]/40 bg-[#ff453a]/16 text-[#ff9f9a]"
    case "Medium":
      return "border-[#ff9500]/40 bg-[#ff9500]/16 text-[#ffd08a]"
    case "Low":
      return "border-[#48c7ff]/40 bg-[#48c7ff]/16 text-[#9ee5ff]"
    default:
      return "border-white/10 bg-white/[0.06] text-[#8e8e93]"
  }
}

export function GarminWorkoutReportCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[18px] border border-white/10 bg-[#111111] text-white shadow-lg">
      <div className="rounded-t-[18px] bg-[#1e1e1e] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90">Garmin Connect</p>
          <p className="text-[11px] font-semibold text-white/70">Workout Report</p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-[#8e8e93]">Recent Sessions</p>
            <p className="mt-1 text-3xl font-extrabold leading-none tracking-[-0.05em] text-white">
              {workoutLog.length}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8e8e93]">activities logged</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] px-3 py-2 text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8e8e93]">Load</p>
            <p className="mt-1 text-sm font-bold text-[#007cc3]">Mixed</p>
          </div>
        </div>

        <div className="-mr-1 min-h-0 flex-1 overflow-y-auto pr-1">
          <div className="flex flex-col gap-2">
            {workoutLog.map((workout) => (
              <div
                key={workout.id}
                className="rounded-2xl border border-white/10 bg-[#1a1a1a] px-3 py-2.5 shadow-[inset_3px_0_0_#007cc3]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">{workout.type}</p>
                    <p className="mt-0.5 text-[11px] font-medium text-[#8e8e93]">
                      {workout.date} · {workout.duration}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${getIntensityTone(
                      workout.intensity,
                    )}`}
                  >
                    {workout.intensity}
                  </span>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] font-semibold text-[#8e8e93]">
                  <div className="rounded-xl bg-black/20 px-2 py-1.5">
                    <span className="text-white">{workout.calories}</span> cal
                  </div>
                  <div className="rounded-xl bg-black/20 px-2 py-1.5 text-right">
                    {workout.intensity} effort
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
