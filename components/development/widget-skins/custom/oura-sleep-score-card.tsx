"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"
import {
  getSleepScoreStatus,
  parseMetricInteger,
} from "@/components/development/widget-skins/custom/widget-metric-utils"

export function OuraSleepScoreCard({ metric }: WidgetSkinProps) {
  const sleepScore = parseMetricInteger(metric.primaryValue)

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#101216] p-6 text-white shadow-[0_22px_46px_rgba(0,0,0,0.34)]">
      <p className="text-center text-2xl font-semibold leading-none tracking-[-0.04em] text-white">Sleep</p>

      <div className="relative mt-5 flex min-h-0 flex-1 items-center justify-center">
        <svg className="absolute top-2 h-40 w-56 overflow-visible" viewBox="0 0 220 130" aria-hidden="true">
          <path
            d="M 24 112 A 86 86 0 0 1 196 112"
            fill="none"
            stroke="rgba(255,255,255,0.09)"
            strokeLinecap="round"
            strokeWidth="8"
          />
          <path
            d="M 24 112 A 86 86 0 0 1 196 112"
            fill="none"
            stroke="rgba(185,220,224,0.9)"
            strokeLinecap="round"
            strokeWidth="5"
            filter="drop-shadow(0 0 10px rgba(160,220,226,0.34))"
          />
        </svg>

        <div className="relative z-10 mt-8 text-center">
          <p className="text-8xl font-semibold leading-none tracking-[-0.09em] text-white">{sleepScore}</p>
          <p className="mt-4 text-lg font-medium text-[#b8c3cc]/78">{getSleepScoreStatus(sleepScore)}</p>
        </div>
      </div>
    </div>
  )
}
