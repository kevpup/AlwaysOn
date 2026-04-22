"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const GARMIN_BLUE = "#007cc3"

export function GarminHrvCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[18px] border border-white/10 bg-[#111111] text-white shadow-lg">
      <div className="rounded-t-[18px] bg-[#1e1e1e] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90">Garmin Connect</p>
          <p className="text-[11px] font-semibold text-white/70">Nightly Avg</p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-between p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8e8e93]">HRV</p>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-6xl font-extrabold leading-none tracking-[-0.07em] text-white">68</p>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8e8e93]">ms</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8e8e93]">Status</p>
              <p className="mt-1 text-base font-bold text-white">Balanced</p>
            </div>
            <div className="h-10 w-1.5 rounded-full" style={{ backgroundColor: GARMIN_BLUE }} />
          </div>
        </div>

        <p className="text-xs font-medium leading-5 text-[#8e8e93]">
          Within your recent overnight baseline.
        </p>
      </div>
    </div>
  )
}
