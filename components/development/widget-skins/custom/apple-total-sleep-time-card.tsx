"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const SLEEP_BLUE = "#2f80ed"
const AWAKE_ORANGE = "#ff9f0a"
const AXIS_START_HOUR = 12
const AXIS_END_HOUR = 36
const AXIS_RANGE = AXIS_END_HOUR - AXIS_START_HOUR

const sleepStageRows = [
  { id: "wake", label: "Awake", duration: "15m", color: AWAKE_ORANGE },
  { id: "rem", label: "REM", duration: "2h 00m", color: "#66d4ff" },
  { id: "core", label: "Core", duration: "4h 24m", color: SLEEP_BLUE },
  { id: "deep", label: "Deep", duration: "1h 18m", color: "#3b3fd9" },
] as const

const sleepStageSegments = [
  { stage: "core", start: 22.9, end: 23.55 },
  { stage: "deep", start: 23.55, end: 24.25 },
  { stage: "core", start: 24.25, end: 25.2 },
  { stage: "rem", start: 25.2, end: 25.75 },
  { stage: "wake", start: 25.75, end: 25.86 },
  { stage: "core", start: 25.86, end: 27.1 },
  { stage: "deep", start: 27.1, end: 27.65 },
  { stage: "core", start: 27.65, end: 28.7 },
  { stage: "rem", start: 28.7, end: 29.45 },
  { stage: "wake", start: 29.45, end: 29.62 },
  { stage: "core", start: 29.62, end: 30.2 },
  { stage: "rem", start: 30.2, end: 30.7 },
] as const

const sleepNight = {
  start: "10:46 PM",
  end: "6:43 AM",
  startHour: 22.77,
  endHour: 30.72,
  awakeMinutes: 15,
}

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return `${hours}h ${remainingMinutes}m`
}

function getSleepMinutes(entry: typeof sleepNight) {
  return Math.round((entry.endHour - entry.startHour) * 60 - entry.awakeMinutes)
}

function getPositionPct(hour: number) {
  return ((hour - AXIS_START_HOUR) / AXIS_RANGE) * 100
}

function getStageColor(stage: (typeof sleepStageSegments)[number]["stage"]) {
  return sleepStageRows.find((row) => row.id === stage)?.color ?? SLEEP_BLUE
}

const latestSleep = sleepNight
const latestSleepMinutes = getSleepMinutes(latestSleep)

export function AppleTotalSleepTimeCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="min-h-0 flex-1 overflow-y-auto rounded-[20px] bg-white p-4 shadow-sm">
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">Sleep Report</p>
            <p className="mt-0.5 text-[32px] font-bold leading-none tracking-[-0.05em]" style={{ color: SLEEP_BLUE }}>
              {formatDuration(latestSleepMinutes)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-right">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#86868b]">Start</p>
              <p className="text-[13px] font-semibold">{latestSleep.start}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#86868b]">End</p>
              <p className="text-[13px] font-semibold">{latestSleep.end}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#86868b]">Awake</p>
              <p className="text-[13px] font-semibold">{latestSleep.awakeMinutes}m</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#86868b]">In bed</p>
              <p className="text-[13px] font-semibold">{formatDuration(Math.round((latestSleep.endHour - latestSleep.startHour) * 60))}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 h-[112px]">
          <div className="flex h-full flex-col">
            <div className="mb-2 grid grid-cols-[18px_1fr_48px] items-center gap-2">
              <p className="text-[10px] font-semibold text-[#86868b]">M</p>
              <p className="text-[10px] font-semibold text-[#6e6e73]">Sleep stages</p>
              <p className="text-right text-[10px] font-semibold text-[#1d1d1f]">
                {formatDuration(getSleepMinutes(latestSleep))}
              </p>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-[42px_1fr] gap-2 rounded-[16px] bg-[#f8f8fb] px-2 py-2">
              <div className="grid grid-rows-4 gap-1">
                {sleepStageRows.map((row) => (
                  <div key={row.id} className="flex items-center">
                    <p className="text-[9px] font-semibold text-[#6e6e73]">{row.label}</p>
                  </div>
                ))}
              </div>

              <div className="relative grid grid-rows-4 gap-1 overflow-hidden">
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
                          className="absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                          style={{
                            left: `${getPositionPct(segment.start)}%`,
                            width: `${getPositionPct(segment.end) - getPositionPct(segment.start)}%`,
                            backgroundColor: getStageColor(segment.stage),
                          }}
                        />
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-5 text-[10px] font-medium text-[#86868b]">
          <span>12 PM</span>
          <span className="text-center">6 PM</span>
          <span className="text-center">12 AM</span>
          <span className="text-center">6 AM</span>
          <span className="text-right">12 PM</span>
        </div>

        <div className="mt-3 space-y-2 pb-1">
          {sleepStageRows.map((row) => (
            <div key={row.id} className="flex items-center justify-between rounded-xl bg-[#f8f8fb] px-3 py-2">
              <span className="flex items-center gap-2 text-[11px] font-semibold text-[#1d1d1f]">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: row.color }} />
                {row.label}
              </span>
              <span className="text-[11px] font-semibold text-[#6e6e73]">{row.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
