"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const SLEEP_BLUE = "#2f80ed"
const ASLEEP_BLUE = "#1c5fd4"
const AWAKE_ORANGE = "#ff9f0a"
const AXIS_START_HOUR = 12
const AXIS_END_HOUR = 36
const AXIS_RANGE = AXIS_END_HOUR - AXIS_START_HOUR

const sleepNight = {
  start: "10:54 PM",
  end: "6:42 AM",
  startHour: 22.9,
  endHour: 30.7,
  awakeMinutes: 28,
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

const latestSleep = sleepNight
const latestSleepMinutes = getSleepMinutes(latestSleep)

export function AppleTotalSleepTimeCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white p-4 shadow-sm">
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">Total Sleep</p>
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

        <div className="mt-4 flex items-center gap-4 text-[10px] font-semibold text-[#6e6e73]">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ASLEEP_BLUE }} />
            Asleep
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: AWAKE_ORANGE }} />
            Awake
          </span>
        </div>

        <div className="mt-4 min-h-0 flex-1">
          <div className="flex h-full flex-col">
            <div className="mb-2 grid grid-cols-[18px_1fr_48px] items-center gap-2">
              <p className="text-[10px] font-semibold text-[#86868b]">M</p>
              <p className="text-[10px] font-semibold text-[#6e6e73]">One day</p>
              <p className="text-right text-[10px] font-semibold text-[#1d1d1f]">
                {formatDuration(getSleepMinutes(latestSleep))}
              </p>
            </div>

            <div className="relative mx-[6px] h-4 rounded-full bg-[#f2f2f7]">
              {(() => {
                const left = getPositionPct(latestSleep.startHour)
                const width = getPositionPct(latestSleep.endHour) - left
                const awakeWidth = (latestSleep.awakeMinutes / 60 / AXIS_RANGE) * 100

                return (
                  <>
                    <div
                      className="absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        backgroundColor: SLEEP_BLUE,
                      }}
                    />
                    <div
                      className="absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full"
                      style={{
                        left: `${left + width * 0.58}%`,
                        width: `${Math.max(awakeWidth, 1.5)}%`,
                        backgroundColor: AWAKE_ORANGE,
                      }}
                    />
                  </>
                )
              })()}
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
      </div>
    </div>
  )
}
