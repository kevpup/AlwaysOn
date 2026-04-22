"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const STAGE_COLORS = {
  awake: "#ff5ea8",
  rem: "#9b5cff",
  light: "#48c7ff",
  deep: "#004fba",
} as const

const sleepStages = [
  { stage: "light", start: 0, duration: 38 },
  { stage: "deep", start: 38, duration: 46 },
  { stage: "light", start: 84, duration: 42 },
  { stage: "rem", start: 126, duration: 26 },
  { stage: "awake", start: 152, duration: 8 },
  { stage: "light", start: 160, duration: 76 },
  { stage: "deep", start: 236, duration: 32 },
  { stage: "light", start: 268, duration: 52 },
  { stage: "rem", start: 320, duration: 41 },
  { stage: "awake", start: 361, duration: 10 },
  { stage: "light", start: 371, duration: 58 },
  { stage: "rem", start: 429, duration: 48 },
] as const

const stageRows = [
  { id: "deep", label: "Deep" },
  { id: "light", label: "Light" },
  { id: "rem", label: "REM" },
  { id: "awake", label: "Awake" },
] as const

const stageTotals = sleepStages.reduce<Record<keyof typeof STAGE_COLORS, number>>(
  (totals, segment) => {
    totals[segment.stage] += segment.duration
    return totals
  },
  { awake: 0, rem: 0, light: 0, deep: 0 },
)

const totalMinutes = sleepStages.reduce((sum, segment) => sum + segment.duration, 0)
const sleepDuration = "7h 57m"
const sleepStart = "10:46 PM"
const sleepEnd = "6:43 AM"

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) return `${remainingMinutes}m`
  return `${hours}h ${remainingMinutes}m`
}

function stagePercent(minutes: number) {
  return Math.round((minutes / totalMinutes) * 100)
}

export function GarminSleepReportCard(_props: WidgetSkinProps) {
  const timelineTotal = sleepStages[sleepStages.length - 1].start + sleepStages[sleepStages.length - 1].duration

  return (
    <div className="flex h-full flex-col rounded-[18px] border border-white/10 bg-[#111111] text-white shadow-lg">
      <div className="rounded-t-[18px] bg-[#1e1e1e] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90">Garmin Connect</p>
          <p className="text-[11px] font-semibold text-white/70">Sleep Report</p>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#8e8e93]">Total Sleep</p>
            <p className="mt-1 text-4xl font-extrabold leading-none tracking-[-0.06em] text-white">
              {sleepDuration}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] px-3 py-2 text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8e8e93]">Sleep Window</p>
            <p className="mt-1 text-sm font-bold text-[#48c7ff]">
              {sleepStart} - {sleepEnd}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#171717] p-3">
          <div className="grid grid-cols-[44px_1fr] gap-x-3 gap-y-2">
            {stageRows.map((row) => (
              <div key={row.id} className="contents">
                <p className="flex h-7 items-center text-[10px] font-bold uppercase tracking-[0.1em] text-[#8e8e93]">
                  {row.label}
                </p>
                <div className="relative h-7 rounded-full bg-white/[0.04]">
                  {sleepStages
                    .filter((segment) => segment.stage === row.id)
                    .map((segment) => (
                      <span
                        key={`${segment.stage}-${segment.start}`}
                        className="absolute top-1 h-5 rounded-full"
                        style={{
                          left: `${(segment.start / timelineTotal) * 100}%`,
                          width: `${(segment.duration / timelineTotal) * 100}%`,
                          backgroundColor: STAGE_COLORS[segment.stage],
                        }}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-[10px] font-bold uppercase tracking-[0.12em] text-[#8e8e93]">
            <span>{sleepStart}</span>
            <span>{sleepEnd}</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-[128px_1fr] items-center gap-4">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[#171717]">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(
                  ${STAGE_COLORS.light} 0deg ${stagePercent(stageTotals.light) * 3.6}deg,
                  ${STAGE_COLORS.deep} ${stagePercent(stageTotals.light) * 3.6}deg ${
                    (stagePercent(stageTotals.light) + stagePercent(stageTotals.deep)) * 3.6
                  }deg,
                  ${STAGE_COLORS.rem} ${(stagePercent(stageTotals.light) + stagePercent(stageTotals.deep)) * 3.6}deg ${
                    (stagePercent(stageTotals.light) + stagePercent(stageTotals.deep) + stagePercent(stageTotals.rem)) *
                    3.6
                  }deg,
                  ${STAGE_COLORS.awake} ${
                    (stagePercent(stageTotals.light) + stagePercent(stageTotals.deep) + stagePercent(stageTotals.rem)) *
                    3.6
                  }deg 360deg
                )`,
              }}
            />
            <div className="absolute inset-[11px] rounded-full bg-[#111111]" />
            <div className="relative text-center">
              <p className="text-2xl font-extrabold leading-none tracking-[-0.06em]">{sleepDuration}</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8e8e93]">Total</p>
            </div>
          </div>

          <div className="space-y-2">
            {stageRows.map((row) => (
              <div key={row.id} className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] px-3 py-2">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: STAGE_COLORS[row.id] }}
                  />
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/80">{row.label}</p>
                </div>
                <p className="text-sm font-extrabold text-white">{formatDuration(stageTotals[row.id])}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
