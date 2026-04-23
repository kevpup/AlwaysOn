"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const STAGE_COLORS = {
  awake: "#f2a7bd",
  rem: "#b99cff",
  light: "#75c8e8",
  deep: "#3556c8",
} as const

const sleepStages = [
  { stage: "light", start: 0, duration: 42 },
  { stage: "deep", start: 42, duration: 48 },
  { stage: "light", start: 90, duration: 56 },
  { stage: "rem", start: 146, duration: 28 },
  { stage: "awake", start: 174, duration: 7 },
  { stage: "light", start: 181, duration: 74 },
  { stage: "deep", start: 255, duration: 30 },
  { stage: "light", start: 285, duration: 62 },
  { stage: "rem", start: 347, duration: 52 },
  { stage: "awake", start: 399, duration: 9 },
  { stage: "light", start: 408, duration: 42 },
  { stage: "rem", start: 450, duration: 31 },
] as const

const stageRows = [
  { id: "awake", label: "Awake" },
  { id: "rem", label: "REM" },
  { id: "light", label: "Light" },
  { id: "deep", label: "Deep" },
] as const

const sleepStart = "10:38 PM"
const sleepEnd = "6:43 AM"
const totalMinutes = sleepStages.reduce((sum, stage) => sum + stage.duration, 0)
const timelineTotal = sleepStages[sleepStages.length - 1].start + sleepStages[sleepStages.length - 1].duration
const stageTotals = sleepStages.reduce<Record<keyof typeof STAGE_COLORS, number>>(
  (totals, segment) => {
    totals[segment.stage] += segment.duration
    return totals
  },
  { awake: 0, rem: 0, light: 0, deep: 0 },
)

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) return `${remainingMinutes}m`
  return `${hours}h ${remainingMinutes}m`
}

function getPercent(minutes: number) {
  return Math.round((minutes / totalMinutes) * 100)
}

export function OuraSleepReportCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#101216] p-4 text-white shadow-[0_22px_46px_rgba(0,0,0,0.34)]">
      <div className="mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8c3cc]/66">Apr 21, 2026</p>
        <h3 className="mt-2 text-2xl font-semibold leading-none tracking-[-0.04em] text-white">Sleep stages</h3>
        <div className="mt-3 flex items-end gap-2">
          <p className="text-4xl font-semibold leading-none tracking-[-0.07em] text-white">
            7h 42m
          </p>
          <p className="pb-1 text-sm font-medium text-[#b8c3cc]/72">total sleep time</p>
        </div>
      </div>

      <div className="rounded-[24px] bg-white/[0.025] p-3.5">
        <div className="mb-3 flex items-center justify-between text-[11px] font-semibold text-[#b8c3cc]/68">
          <span>10:46 PM</span>
          <span>{sleepEnd}</span>
        </div>

        <div className="grid grid-cols-[46px_1fr] gap-x-3 gap-y-2">
          {stageRows.map((row) => (
            <div key={row.id} className="contents">
              <p className="flex h-8 items-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[#b8c3cc]/58">
                {row.label}
              </p>
              <div className="relative h-8 overflow-hidden rounded-[10px] border border-white/[0.045] bg-white/[0.025]">
                {sleepStages
                  .filter((segment) => segment.stage === row.id)
                  .map((segment) => (
                    <span
                      key={`${segment.stage}-${segment.start}`}
                      className="absolute top-0 h-full"
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
      </div>

      <div className="mt-3 min-h-0 flex-1 overflow-y-auto">
        {stageRows.map((row, index) => (
          <div
            key={row.id}
            className={`flex items-center justify-between gap-4 py-2 ${index === 0 ? "" : "border-t border-white/[0.07]"}`}
          >
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: STAGE_COLORS[row.id] }} />
              <p className="text-sm font-semibold text-[#f4f7f8]">{row.label}</p>
            </div>
            <p className="text-sm font-medium text-[#b8c3cc]/72">
              {formatDuration(stageTotals[row.id])} · {getPercent(stageTotals[row.id])}%
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
