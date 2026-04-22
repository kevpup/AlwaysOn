"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const sleepStageRows = [
  { id: "wake", label: "Wake", color: "#ff9f0a" },
  { id: "rem", label: "REM", color: "#66d4ff" },
  { id: "core", label: "Core", color: "#2f80ed" },
  { id: "deep", label: "Deep", color: "#3b3fd9" },
] as const

const sleepStageSegments = [
  { stage: "core", start: 0, end: 12 },
  { stage: "deep", start: 12, end: 25 },
  { stage: "core", start: 25, end: 38 },
  { stage: "rem", start: 38, end: 48 },
  { stage: "wake", start: 48, end: 51 },
  { stage: "core", start: 51, end: 64 },
  { stage: "deep", start: 64, end: 72 },
  { stage: "core", start: 72, end: 82 },
  { stage: "rem", start: 82, end: 93 },
  { stage: "wake", start: 93, end: 96 },
  { stage: "rem", start: 96, end: 100 },
] as const

function getStageColor(stage: (typeof sleepStageSegments)[number]["stage"]) {
  return sleepStageRows.find((row) => row.id === stage)?.color ?? "#2f80ed"
}

export function AppleSleepStagesCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">Sleep Stages</p>
            <p className="mt-0.5 text-[28px] font-bold leading-none tracking-[-0.05em] text-[#1d1d1f]">
              Timeline
            </p>
          </div>

          <div className="rounded-full bg-[#f2f2f7] px-3 py-1 text-[11px] font-semibold text-[#6e6e73]">
            Last night
          </div>
        </div>

        <div className="min-h-0 flex-1 rounded-[18px] bg-[#f8f8fb] px-3 py-3">
          <div className="grid h-full grid-cols-[44px_1fr] gap-3">
            <div className="grid grid-rows-4 gap-2">
              {sleepStageRows.map((row) => (
                <div key={row.id} className="flex items-center">
                  <p className="text-[11px] font-semibold text-[#6e6e73]">{row.label}</p>
                </div>
              ))}
            </div>

            <div className="relative grid grid-rows-4 gap-2 overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="border-l border-white first:border-l-0" />
                ))}
              </div>

              {sleepStageRows.map((row) => (
                <div key={row.id} className="relative rounded-full bg-white/80">
                  {sleepStageSegments
                    .filter((segment) => segment.stage === row.id)
                    .map((segment) => (
                      <div
                        key={`${segment.stage}-${segment.start}`}
                        className="absolute top-1/2 h-4 -translate-y-1/2 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                        style={{
                          left: `${segment.start}%`,
                          width: `${segment.end - segment.start}%`,
                          backgroundColor: getStageColor(segment.stage),
                        }}
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[10px] font-semibold text-[#86868b]">
          {sleepStageRows.map((row) => (
            <span key={row.id} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: row.color }} />
              {row.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
