"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const GARMIN_LIGHT_BLUE = "#48c7ff"

export function GarminBloodOxygenCard({ metric }: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[18px] border border-white/10 bg-[#111111] text-white shadow-lg">
      <div className="flex min-h-0 flex-1 items-center justify-center p-5">
        <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-[#1a1a1a] shadow-[0_0_42px_rgba(72,199,255,0.16)]">
          <div
            className="absolute inset-3 rounded-full border"
            style={{ borderColor: `${GARMIN_LIGHT_BLUE}66` }}
          />
          <div
            className="absolute inset-7 rounded-full border border-dashed"
            style={{ borderColor: `${GARMIN_LIGHT_BLUE}30` }}
          />

          <div className="relative text-center">
            <p className="text-6xl font-extrabold leading-none tracking-[-0.08em] text-white">{metric.primaryValue}</p>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em]" style={{ color: GARMIN_LIGHT_BLUE }}>
              SpO2
            </p>
            <p className="mt-2 text-[11px] font-semibold text-[#8e8e93]">2 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}
