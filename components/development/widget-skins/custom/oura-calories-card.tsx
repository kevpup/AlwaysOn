"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"
import { parseMetricInteger } from "@/components/development/widget-skins/custom/widget-metric-utils"

export function OuraCaloriesCard({ metric }: WidgetSkinProps) {
  const calories = parseMetricInteger(metric.primaryValue)

  return (
    <div className="relative flex h-full overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#07131a] text-white shadow-[0_24px_52px_rgba(0,0,0,0.38)]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 18%, rgba(119, 209, 221, 0.34), transparent 32%), radial-gradient(circle at 82% 12%, rgba(84, 141, 186, 0.32), transparent 30%), linear-gradient(145deg, #061116 0%, #0c2631 42%, #102e3c 62%, #071016 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(110deg, transparent 0 18%, rgba(255,255,255,0.09) 22%, transparent 30% 54%, rgba(255,255,255,0.06) 60%, transparent 68%), radial-gradient(ellipse at 50% 82%, rgba(173,228,232,0.22), transparent 48%)",
        }}
      />
      <div className="absolute inset-0 bg-black/24" />

      <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-7 text-center">
        <p className="text-8xl font-semibold leading-none tracking-[-0.09em] text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]">
          {calories}
        </p>
        <p className="mt-4 text-lg font-semibold text-white">Active calorie burn</p>
        <p className="mt-5 max-w-[220px] text-sm font-medium leading-6 text-[#d7e9ee]/82">
          A strong active day with steady movement and balanced effort.
        </p>
      </div>
    </div>
  )
}
