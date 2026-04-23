"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const GARMIN_BLUE = "#007cc3"

export function GarminTemperatureDeviationCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[18px] border border-white/10 bg-[#111111] text-white shadow-lg">
      <div className="flex min-h-0 flex-1 items-center justify-center p-5">
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8e8e93]">
            Change from baseline
          </p>
          <p className="mt-4 text-7xl font-extrabold leading-none tracking-[-0.08em] text-white">+0.2°</p>
          <div className="mx-auto mt-5 h-1.5 w-24 rounded-full" style={{ backgroundColor: GARMIN_BLUE }} />
        </div>
      </div>
    </div>
  )
}
