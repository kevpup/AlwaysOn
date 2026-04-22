"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const BLUE = "#3f5bea"
const TEAL = "#13bfae"
const ORANGE = "#ff715f"
const TRACK = "#edf0f4"

const sleepScoreBreakdown = [
  {
    label: "Duration",
    score: "48/50",
    color: BLUE,
    share: 50,
  },
  {
    label: "Bedtime",
    score: "30/30",
    color: TEAL,
    share: 30,
  },
  {
    label: "Interruptions",
    score: "11/20",
    color: ORANGE,
    share: 20,
  },
] as const

function SegmentedSleepScoreRing() {
  let offset = 0
  const gap = 3

  return (
    <div className="relative h-full min-h-[150px] w-full min-w-[150px]">
      <svg className="h-full w-full" viewBox="0 0 180 180" aria-hidden="true">
        <circle cx="90" cy="90" r="58" fill="none" stroke={TRACK} strokeWidth="28" />
        {sleepScoreBreakdown.map((item) => {
          const dashLength = Math.max(0, item.share - gap)
          const dashOffset = -offset
          offset += item.share

          return (
            <circle
              key={item.label}
              cx="90"
              cy="90"
              r="58"
              fill="none"
              pathLength="100"
              stroke={item.color}
              strokeDasharray={`${dashLength} ${100 - dashLength}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              strokeWidth="28"
              transform="rotate(-90 90 90)"
            />
          )
        })}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-[42px] font-semibold leading-none tracking-[-0.07em] text-black">89</p>
      </div>
    </div>
  )
}

export function AppleSleepScoreCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#0b0b0c] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 rounded-[22px] bg-white px-4 py-4 shadow-sm">
        <div className="grid min-h-0 w-full grid-cols-[1fr_46%] items-center gap-3">
          <div className="min-w-0">
            <p className="mb-3 text-[13px] font-semibold text-[#6e6e73]">Hi</p>

            <div className="divide-y divide-[#d7d7dc]">
              {sleepScoreBreakdown.map((item) => (
                <div key={item.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                    <p className="truncate text-[17px] font-semibold leading-tight tracking-[-0.03em]">
                      {item.label}
                    </p>
                  </div>
                  <p className="text-[19px] font-medium leading-none tracking-[-0.04em]">{item.score}</p>
                </div>
              ))}
            </div>
          </div>

          <SegmentedSleepScoreRing />
        </div>
      </div>
    </div>
  )
}
