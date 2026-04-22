"use client"

import { workoutLog } from "@/lib/mock-data"
import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

function getIntensityTone(intensity: string) {
  switch (intensity) {
    case "High":
      return "border-[#e8b0a8]/24 bg-[#e8b0a8]/10 text-[#f1c9c2]"
    case "Medium":
      return "border-[#d8c39b]/24 bg-[#d8c39b]/10 text-[#eadbbd]"
    case "Low":
      return "border-[#9ecdd2]/24 bg-[#9ecdd2]/10 text-[#c4e5e8]"
    default:
      return "border-white/[0.08] bg-white/[0.04] text-[#b8c3cc]/70"
  }
}

export function OuraWorkoutReportCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[30px] border border-white/[0.08] bg-[#111317] p-5 text-white shadow-[0_22px_46px_rgba(0,0,0,0.34)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8c3cc]/72">Workout Report</p>
          <p className="mt-2 text-2xl font-semibold leading-none tracking-[-0.04em] text-white">Recent Sessions</p>
        </div>

        <div className="rounded-full border border-white/[0.08] bg-white/[0.045] px-3 py-1.5 text-[11px] font-semibold text-[#dfe8ed]/78">
          {workoutLog.length} logged
        </div>
      </div>

      <div className="-mr-1 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col">
          {workoutLog.map((workout, index) => (
            <div
              key={workout.id}
              className={`py-3 ${index === 0 ? "" : "border-t border-white/[0.07]"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#f4f7f8]">{workout.type}</p>
                  <p className="mt-1 text-[11px] font-medium text-[#b8c3cc]/62">
                    {workout.date} · {workout.duration}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${getIntensityTone(
                    workout.intensity,
                  )}`}
                >
                  {workout.intensity}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-[#b8c3cc]/62">
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
