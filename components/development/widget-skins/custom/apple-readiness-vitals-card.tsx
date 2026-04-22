"use client"

import { Activity, Bed, Heart, Thermometer } from "lucide-react"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const TYPICAL_BLUE = "#64b5f6"
const SELECTED_BLUE = "#2f80ed"

const vitals = [
  {
    id: "heart-rate",
    label: "Heart Rate",
    value: "49 bpm",
    status: "Typical",
    Icon: Heart,
    position: 44,
    selected: false,
  },
  {
    id: "respiratory-rate",
    label: "Respiratory Rate",
    value: "14.2 br/min",
    status: "Typical",
    Icon: Activity,
    position: 48,
    selected: false,
  },
  {
    id: "temperature",
    label: "Temperature",
    value: "+0.2 F",
    status: "Typical",
    Icon: Thermometer,
    position: 38,
    selected: false,
  },
  {
    id: "sleep-duration",
    label: "Sleep Duration",
    value: "7 hr 57 min",
    status: "Typical",
    Icon: Bed,
    position: 51,
    selected: true,
  },
] as const

export function AppleReadinessVitalsCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86868b]">Vitals</p>
            <p className="mt-0.5 text-[28px] font-bold leading-none tracking-[-0.05em]">Readiness</p>
          </div>

          <div className="rounded-full bg-[#f2f2f7] px-3 py-1 text-[11px] font-semibold text-[#6e6e73]">
            Today
          </div>
        </div>

        <div className="relative min-h-0 flex-1 rounded-[18px] border border-[#e5e5ea] bg-white">
          <div className="absolute inset-y-0 left-0 right-[42px] grid grid-cols-4">
            {vitals.map((vital) => (
              <div key={vital.id} className="border-r border-dashed border-[#d8d8de] last:border-r-0" />
            ))}
          </div>

          <div className="absolute inset-x-0 top-[18%] border-t border-[#ececf1]" />
          <div className="absolute inset-x-0 top-1/2 border-t border-[#ececf1]" />
          <div className="absolute inset-x-0 top-[82%] border-t border-[#ececf1]" />

          <div className="absolute right-2 top-[15%] text-[12px] font-medium text-[#b0b0b6]">High</div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] font-medium text-[#b0b0b6]">
            Typical
          </div>
          <div className="absolute bottom-[13%] right-2 text-[12px] font-medium text-[#b0b0b6]">Low</div>

          {vitals.map((vital, index) => {
            const columnWidth = 100 / vitals.length
            const left = columnWidth * index + columnWidth / 2
            return (
              <button
                key={vital.id}
                type="button"
                className="absolute flex -translate-x-1/2 flex-col items-center gap-1 rounded-2xl px-1 py-1 transition-transform hover:scale-105"
                style={{ left: `${left}%`, top: `${vital.position}%` }}
                aria-label={`${vital.label}: ${vital.value}, ${vital.status}`}
              >
                <span
                  className={`h-5 w-5 rounded-full border-2 ${
                    vital.selected ? "border-[#2f80ed] bg-white" : "border-transparent bg-[#b8dcff]"
                  }`}
                >
                  <span
                    className="block h-full w-full rounded-full"
                    style={{ backgroundColor: vital.selected ? "white" : TYPICAL_BLUE }}
                  />
                </span>
                <span className="sr-only">{vital.value}</span>
              </button>
            )
          })}

          <div className="absolute -top-1 right-[12px] w-[150px] rounded-[18px] bg-[#f2f2f7] px-4 py-2 text-center shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#86868b]">Sleep Duration</p>
            <p className="mt-1 text-[26px] font-semibold leading-none tracking-[-0.06em]">
              7 <span className="text-[13px] font-semibold text-[#6e6e73]">hr</span> 57{" "}
              <span className="text-[13px] font-semibold text-[#6e6e73]">min</span>
            </p>
            <p className="mt-1 text-[12px] font-semibold tracking-[0.08em] text-[#86868b]">Apr 21, 2026</p>
          </div>

          <div className="absolute bottom-1 left-0 right-[42px] grid grid-cols-4">
            {vitals.map((vital) => {
              const Icon = vital.Icon

              return (
                <button
                  key={vital.id}
                  type="button"
                  className="mx-auto flex h-9 w-11 items-center justify-center rounded-2xl text-[#b8b8bf] transition-colors hover:bg-[#f2f2f7] hover:text-[#6e6e73]"
                  aria-label={`Inspect ${vital.label}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={2.8} />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
