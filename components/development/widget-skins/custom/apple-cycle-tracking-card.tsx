"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const CYCLE_PINK = "#ff2d55"
const CYCLE_LIGHT = "#ffd6e1"
const currentCycleDay = 18
const estimatedCycleLength = 28
const nextPeriodDate = "May 1"
const cyclePhase = "Luteal phase"
const cycleProgress = currentCycleDay / estimatedCycleLength

export function AppleCycleTrackingCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">Cycle Tracking</p>
            <p className="mt-0.5 text-[32px] font-bold leading-none tracking-[-0.05em]" style={{ color: CYCLE_PINK }}>
              Day {currentCycleDay}
            </p>
            <p className="mt-1 text-xs font-medium text-[#6e6e73]">{cyclePhase}</p>
          </div>

          <div className="rounded-full bg-[#fff0f4] px-3 py-1 text-[11px] font-semibold" style={{ color: CYCLE_PINK }}>
            Predicted
          </div>
        </div>

        <div className="mt-6 flex min-h-0 flex-1 items-center justify-center">
          <div className="relative h-36 w-36">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="47" fill="none" stroke={CYCLE_LIGHT} strokeWidth="12" />
              <circle
                cx="60"
                cy="60"
                r="47"
                fill="none"
                stroke={CYCLE_PINK}
                strokeDasharray={`${cycleProgress * 295.31} 295.31`}
                strokeLinecap="round"
                strokeWidth="12"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#86868b]">Next</p>
              <p className="mt-0.5 text-[20px] font-bold leading-none tracking-[-0.04em] text-[#1d1d1f]">
                {nextPeriodDate}
              </p>
              <p className="mt-0.5 text-[9px] font-medium text-[#86868b]">Period in 10 days</p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-[#f7f7fa] px-4 py-3">
          <div className="flex items-center justify-between text-xs font-semibold text-[#6e6e73]">
            <span>Cycle day</span>
            <span>
              {currentCycleDay} of {estimatedCycleLength}
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs font-semibold text-[#1d1d1f]">
            <span>Phase</span>
            <span>{cyclePhase}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e5e5ea]">
            <div className="h-full rounded-full" style={{ width: `${cycleProgress * 100}%`, backgroundColor: CYCLE_PINK }} />
          </div>
        </div>
      </div>
    </div>
  )
}
