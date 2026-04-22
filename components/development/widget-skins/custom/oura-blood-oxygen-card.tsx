"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

export function OuraBloodOxygenCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[30px] border border-white/[0.08] bg-[#101216] p-6 text-white shadow-[0_22px_46px_rgba(0,0,0,0.34)]">
      <div className="flex min-h-0 flex-1 flex-col justify-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8c3cc]/75">
          Average Oxygen Saturation
        </p>
        <p className="mt-6 text-8xl font-semibold leading-none tracking-[-0.09em] text-white">98%</p>
      </div>
    </div>
  )
}
