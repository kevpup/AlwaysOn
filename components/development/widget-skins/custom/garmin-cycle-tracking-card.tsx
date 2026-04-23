"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const GARMIN_PURPLE = "#9b5cff"
const cycleDay = 18
const cyclePhase = "Luteal"

export function GarminCycleTrackingCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[18px] border border-white/10 bg-[#111111] text-white shadow-lg">
      <div className="flex min-h-0 flex-1 items-center justify-center p-5">
        <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-[#1a1a1a] shadow-[0_0_42px_rgba(155,92,255,0.18)]">
          <div
            className="absolute inset-3 rounded-full border"
            style={{ borderColor: `${GARMIN_PURPLE}66` }}
          />
          <div
            className="absolute inset-7 rounded-full border border-dashed"
            style={{ borderColor: `${GARMIN_PURPLE}33` }}
          />

          <div className="relative text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8e8e93]">Cycle Day</p>
            <p className="mt-2 text-6xl font-extrabold leading-none tracking-[-0.08em] text-white">{cycleDay}</p>
            <p className="mt-3 text-base font-bold uppercase tracking-[0.16em]" style={{ color: GARMIN_PURPLE }}>
              {cyclePhase}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
