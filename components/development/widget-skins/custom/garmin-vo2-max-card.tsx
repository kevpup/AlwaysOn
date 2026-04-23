"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"
import {
  getVo2Status,
  parseMetricNumber,
} from "@/components/development/widget-skins/custom/widget-metric-utils"

export function GarminVo2MaxCard({ metric }: WidgetSkinProps) {
  const vo2Score = parseMetricNumber(metric.primaryValue)
  const roundedVo2Score = Math.round(vo2Score)
  const vo2Status = getVo2Status(vo2Score)

  return (
    <div className="flex h-full flex-col rounded-[18px] border border-white/10 bg-[#111111] text-white shadow-lg">
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 p-5">
        <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-[#171717] shadow-[0_0_44px_rgba(155,92,255,0.22)]">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from -90deg, #d94141 0deg 144deg, #ff9500 144deg 198deg, #30d158 198deg 252deg, #007cc3 252deg 306deg, #9b5cff 306deg 360deg)",
            }}
          />
          <div className="absolute inset-4 rounded-full bg-[#111111]" />
          <div className="absolute left-[18%] top-[14%] h-4 w-4 rounded-full border-2 border-[#111111] bg-[#9b5cff] shadow-[0_0_16px_rgba(155,92,255,0.95)]" />

          <div className="relative text-center">
            <p className="text-6xl font-extrabold leading-none tracking-[-0.08em] text-white">{roundedVo2Score}</p>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-[#9b5cff]">{vo2Status}</p>
          </div>
        </div>

        <div className="grid w-full grid-cols-[2fr_repeat(4,0.75fr)] overflow-hidden rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-[0.12em] text-white/85">
          <div className="bg-[#d94141] px-2 py-1.5 text-center">Low</div>
          <div className="bg-[#ff9500] py-1.5 text-center">Fair</div>
          <div className="bg-[#30d158] py-1.5 text-center">Good</div>
          <div className="bg-[#007cc3] py-1.5 text-center">Excellent</div>
          <div className="bg-[#9b5cff] py-1.5 text-center">Superior</div>
        </div>
      </div>
    </div>
  )
}
