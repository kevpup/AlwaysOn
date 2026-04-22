"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const PERFORMANCE_BLUE = "hsl(198, 86%, 63%)"
const sleepScore = 75

export function WhoopSleepScoreCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4">
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div
          className="relative flex h-48 w-48 items-center justify-center rounded-full shadow-[0_0_42px_hsl(198,86%,63%/0.14)]"
          style={{
            background: `conic-gradient(${PERFORMANCE_BLUE} 0deg ${sleepScore * 3.6}deg, hsl(var(--muted)) ${sleepScore * 3.6}deg 360deg)`,
          }}
        >
          <div className="absolute inset-4 rounded-full bg-card shadow-inner" />
          <div className="relative text-center">
            <p className="text-6xl font-bold leading-none tracking-[-0.08em] text-foreground">{sleepScore}%</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Sleep
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
