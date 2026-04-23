"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"
import { parseMetricInteger } from "@/components/development/widget-skins/custom/widget-metric-utils"

export function GarminSleepScoreCard({ metric }: WidgetSkinProps) {
  const sleepScore = parseMetricInteger(metric.primaryValue)

  return (
    <div className="flex h-full flex-col rounded-[18px] border border-white/10 bg-[#111111] text-white shadow-lg">
      <div className="flex min-h-0 flex-1 items-center justify-center p-5">
        <div className="text-center">
          <div className="flex items-end justify-center gap-2">
            <p className="text-7xl font-extrabold leading-none tracking-[-0.08em] text-white">{sleepScore}</p>
            <p className="pb-2 text-lg font-bold text-[#8e8e93]">/ 100</p>
          </div>
          <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8e8e93]">Sleep Score</p>
        </div>
      </div>
    </div>
  )
}
