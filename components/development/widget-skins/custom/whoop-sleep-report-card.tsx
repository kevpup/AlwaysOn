"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const PERFORMANCE_BLUE = "hsl(198, 86%, 63%)"

const sleepMetrics = [
  {
    label: "Hours vs needed",
    value: "7:42 / 8:55",
    status: "Poor",
    tone: "bg-red-500/16 text-red-300 ring-red-400/30",
  },
  {
    label: "Consistency",
    value: "71%",
    status: "Sufficient",
    tone: "bg-amber-500/16 text-amber-200 ring-amber-300/30",
  },
  {
    label: "Sleep efficiency",
    value: "88%",
    status: "Optimal",
    tone: "bg-cyan-400/16 text-cyan-200 ring-cyan-300/30",
  },
  {
    label: "High sleep stress",
    value: "1h 18m",
    status: "Poor",
    tone: "bg-red-500/16 text-red-300 ring-red-400/30",
  },
]

const sleepStages = [
  { stage: "Awake", start: 0, end: 6, color: "hsl(24, 92%, 58%)" },
  { stage: "Light", start: 6, end: 22, color: "hsl(202, 82%, 58%)" },
  { stage: "Deep", start: 22, end: 34, color: "hsl(247, 64%, 58%)" },
  { stage: "Light", start: 34, end: 48, color: "hsl(202, 82%, 58%)" },
  { stage: "REM", start: 48, end: 59, color: "hsl(170, 66%, 48%)" },
  { stage: "Awake", start: 59, end: 62, color: "hsl(24, 92%, 58%)" },
  { stage: "Light", start: 62, end: 75, color: "hsl(202, 82%, 58%)" },
  { stage: "Deep", start: 75, end: 83, color: "hsl(247, 64%, 58%)" },
  { stage: "Light", start: 83, end: 92, color: "hsl(202, 82%, 58%)" },
  { stage: "REM", start: 92, end: 100, color: "hsl(170, 66%, 48%)" },
] as const

const stageTotals = [
  { label: "Awake", value: "15m", color: "hsl(24, 92%, 58%)" },
  { label: "Light", value: "4h 24m", color: "hsl(202, 82%, 58%)" },
  { label: "Deep", value: "1h 18m", color: "hsl(247, 64%, 58%)" },
  { label: "REM", value: "2h 00m", color: "hsl(170, 66%, 48%)" },
]

export function WhoopSleepReportCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4">
      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col items-center border-b border-border/80 pb-4">
          <div
            className="relative flex h-32 w-32 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(${PERFORMANCE_BLUE} 0deg 270deg, hsl(var(--muted)) 270deg 360deg)`,
            }}
          >
            <div className="absolute inset-3 rounded-full bg-card" />
            <div className="relative text-center">
              <p className="text-4xl font-bold leading-none tracking-[-0.05em] text-foreground">75%</p>
              <p className="mt-1 max-w-[68px] text-[9px] font-semibold uppercase leading-[1.15] tracking-[0.1em] text-muted-foreground">
                Sleep Performance
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {sleepMetrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-border bg-background/45 px-3 py-2.5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold leading-none text-foreground">{metric.value}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ring-1 ${metric.tone}`}>
                  {metric.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-background/45 p-3">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Sleep Stages</p>
              <p className="mt-1 text-sm font-semibold text-foreground">10:46 PM - 6:43 AM</p>
            </div>
            <p className="text-right text-[11px] font-medium text-muted-foreground">7h 57m in bed</p>
          </div>

          <div className="relative h-12 overflow-hidden rounded-xl bg-muted/50">
            {sleepStages.map((segment, index) => (
              <div
                key={`${segment.stage}-${segment.start}-${index}`}
                className="absolute top-0 h-full"
                style={{
                  left: `${segment.start}%`,
                  width: `${segment.end - segment.start}%`,
                  backgroundColor: segment.color,
                }}
                title={segment.stage}
              />
            ))}
          </div>

          <div className="mt-2 flex items-center justify-between text-[10px] font-medium text-muted-foreground">
            <span>10:46 PM</span>
            <span>6:43 AM</span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {stageTotals.map((stage) => (
              <div key={stage.label} className="flex items-center justify-between rounded-xl bg-card/60 px-2.5 py-2">
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: stage.color }} />
                  {stage.label}
                </span>
                <span className="text-[11px] font-semibold text-foreground">{stage.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
