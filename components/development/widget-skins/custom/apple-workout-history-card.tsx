"use client"

import { Bike, Dumbbell, Flame, Footprints } from "lucide-react"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const ACTIVITY_GREEN = "#34c759"

const workoutHistory = [
  {
    type: "Outdoor Run",
    detail: "5.8 mi",
    summary: "48 min - 602 cal",
    date: "Today",
    Icon: Footprints,
  },
  {
    type: "Strength Training",
    detail: "Upper body",
    summary: "52 min - 318 cal",
    date: "Mon, Apr 20",
    Icon: Dumbbell,
  },
  {
    type: "Indoor Cycle",
    detail: "14.2 mi",
    summary: "41 min - 455 cal",
    date: "Sun, Apr 19",
    Icon: Bike,
  },
  {
    type: "HIIT",
    detail: "Intervals",
    summary: "28 min - 389 cal",
    date: "Fri, Apr 17",
    Icon: Flame,
  },
  {
    type: "Recovery Walk",
    detail: "2.1 mi",
    summary: "36 min - 176 cal",
    date: "Thu, Apr 16",
    Icon: Footprints,
  },
]

export function AppleWorkoutHistoryCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/10 bg-[#050507] p-3 text-white shadow-[0_12px_28px_rgba(0,0,0,0.2)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-[#111113] p-4 shadow-sm">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold text-white/55">Workout History</p>
            <p className="mt-0.5 text-[28px] font-bold leading-none tracking-[-0.05em]">Sessions</p>
          </div>

          <div className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/65">
            Recent
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <div className="flex flex-col gap-2">
            {workoutHistory.map((workout) => {
              const Icon = workout.Icon

              return (
                <button
                  key={`${workout.type}-${workout.date}`}
                  type="button"
                  className="grid grid-cols-[38px_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-white/[0.07] px-3 py-2 text-left transition-colors hover:bg-white/[0.11]"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(52, 199, 89, 0.16)", color: ACTIVITY_GREEN }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.6} />
                  </span>

                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-semibold leading-tight">{workout.type}</span>
                    <span className="mt-0.5 block truncate text-[11px] font-medium leading-tight text-white/55">
                      {workout.detail} - {workout.summary}
                    </span>
                  </span>

                  <span className="max-w-[56px] text-right text-[10px] font-semibold leading-tight text-white/45">
                    {workout.date}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
