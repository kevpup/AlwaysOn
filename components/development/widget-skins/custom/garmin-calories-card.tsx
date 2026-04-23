"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"
import { parseMetricInteger } from "@/components/development/widget-skins/custom/widget-metric-utils"

const GARMIN_BLUE = "#007cc3"

export function GarminCaloriesCard({ metric }: WidgetSkinProps) {
  const calories = parseMetricInteger(metric.primaryValue)

  return (
    <div className="flex h-full flex-col rounded-[18px] border border-white/10 bg-[#111111] text-white shadow-lg">
      <div className="flex min-h-0 flex-1 items-center justify-center p-5">
        <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-[#1a1a1a] shadow-[0_0_42px_rgba(0,124,195,0.18)]">
          <div
            className="absolute inset-3 rounded-full border"
            style={{ borderColor: `${GARMIN_BLUE}55` }}
          />
          <div className="relative text-center">
            <p className="text-5xl font-extrabold leading-none tracking-[-0.08em] text-white">
              {calories.toLocaleString()}
            </p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8e8e93]">
              Calories
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
