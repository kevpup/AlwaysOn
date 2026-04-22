"use client"

import { Check } from "lucide-react"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

export function WhoopBloodOxygenCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4">
      <div className="flex min-h-0 flex-1 flex-col justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Blood Oxygen (SpO2)
          </p>
          <p className="mt-4 text-6xl font-bold leading-none tracking-[-0.08em] text-foreground">97%</p>
        </div>

        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/18 text-emerald-300">
              <Check className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Within range</p>
              <p className="mt-0.5 text-xs font-medium text-muted-foreground">within 95 to 100%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
