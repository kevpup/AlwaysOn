"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

export function OuraRestingHrCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[30px] border border-white/[0.08] bg-[#111317] p-6 text-white shadow-[0_22px_46px_rgba(0,0,0,0.34)]">
      <div className="flex min-h-0 flex-1 flex-col justify-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8c3cc]/75">Lowest Heart Rate</p>
        <div className="mt-5 flex items-baseline gap-2">
          <p className="text-7xl font-semibold leading-none tracking-[-0.08em] text-white">43</p>
          <p className="text-xl font-medium text-[#e7edf2]/80">bpm</p>
        </div>
        <p className="mt-5 text-lg font-medium text-[#b8c3cc]/72">Average 56 bpm</p>
      </div>
    </div>
  )
}
