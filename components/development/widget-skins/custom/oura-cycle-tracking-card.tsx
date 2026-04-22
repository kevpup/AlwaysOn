"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const cycleDetails = [
  { label: "Cycle phase", value: "Luteal" },
  { label: "Period status", value: "Not expected today" },
]

export function OuraCycleTrackingCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[30px] border border-white/[0.08] bg-[#08131f] p-5 text-white shadow-[0_22px_46px_rgba(0,0,0,0.34)]">
      <div className="mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8c3cc]/68">Cycle tracking</p>
        <div className="mt-4 flex items-baseline gap-3">
          <p className="text-7xl font-semibold leading-none tracking-[-0.09em] text-white">18</p>
          <p className="pb-2 text-lg font-medium text-[#d8e9ee]/78">cycle day</p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3">
        {cycleDetails.map((detail) => (
          <div key={detail.label} className="rounded-[22px] border border-white/[0.07] bg-white/[0.045] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b8c3cc]/58">{detail.label}</p>
            <p className="mt-1.5 text-lg font-semibold text-[#f4f8fa]">{detail.value}</p>
          </div>
        ))}

        <div className="mt-auto rounded-[24px] border border-[#8bdde8]/18 bg-[#8bdde8]/10 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b8c3cc]/62">
            Estimated next period
          </p>
          <p className="mt-2 text-xl font-semibold leading-snug text-white">Expected in 10-12 days</p>
        </div>
      </div>
    </div>
  )
}
