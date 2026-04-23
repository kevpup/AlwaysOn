"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"
import { parseMetricNumber } from "@/components/development/widget-skins/custom/widget-metric-utils"

const WHOOP_BLUE = "hsl(200, 70%, 50%)"
const maxStrain = 21

export function WhoopStrainCard({ metric }: WidgetSkinProps) {
  const currentStrain = parseMetricNumber(metric.primaryValue)
  const strainDegrees = (currentStrain / maxStrain) * 360

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4">
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div
          className="relative flex h-48 w-48 items-center justify-center rounded-full shadow-[0_0_42px_hsl(200,70%,50%/0.14)]"
          style={{
            background: `conic-gradient(${WHOOP_BLUE} 0deg ${strainDegrees}deg, hsl(var(--muted)) ${strainDegrees}deg 360deg)`,
          }}
        >
          <div className="absolute inset-4 rounded-full bg-card shadow-inner" />
          <div className="relative text-center">
            <p className="text-6xl font-bold leading-none tracking-[-0.08em] text-foreground">
              {currentStrain.toFixed(1)}
            </p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Strain
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
