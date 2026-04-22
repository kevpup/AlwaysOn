"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const GARMIN_BLUE = "#007cc3"

export function GarminCaloriesCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[18px] border border-white/10 bg-[#111111] text-white shadow-lg">
      <div className="rounded-t-[18px] bg-[#1e1e1e] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90">Garmin Connect</p>
          <p className="text-[11px] font-semibold text-white/70">Calories</p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center p-5">
        <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-[#1a1a1a] shadow-[0_0_42px_rgba(0,124,195,0.18)]">
          <div
            className="absolute inset-3 rounded-full border"
            style={{ borderColor: `${GARMIN_BLUE}55` }}
          />
          <div className="relative text-center">
            <p className="text-5xl font-extrabold leading-none tracking-[-0.08em] text-white">2,820</p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8e8e93]">
              Calories
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
