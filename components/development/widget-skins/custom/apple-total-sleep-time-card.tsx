"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const SLEEP_BLUE = "#2f80ed"
const ASLEEP_BLUE = "#1c5fd4"
const AWAKE_ORANGE = "#ff9f0a"
const AXIS_START_HOUR = 20
const AXIS_END_HOUR = 34
const AXIS_RANGE = AXIS_END_HOUR - AXIS_START_HOUR

const weeklySleep = [
  { day: "M", start: "10:54 PM", end: "6:42 AM", startHour: 22.9, endHour: 30.7, awakeMinutes: 28 },
  { day: "T", start: "11:22 PM", end: "7:04 AM", startHour: 23.37, endHour: 31.07, awakeMinutes: 35 },
  { day: "W", start: "12:08 AM", end: "7:15 AM", startHour: 24.13, endHour: 31.25, awakeMinutes: 18 },
  { day: "T", start: "10:47 PM", end: "6:31 AM", startHour: 22.78, endHour: 30.52, awakeMinutes: 24 },
  { day: "F", start: "11:08 PM", end: "7:12 AM", startHour: 23.13, endHour: 31.2, awakeMinutes: 22 },
]

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return `${hours}h ${remainingMinutes}m`
}

function getSleepMinutes(entry: (typeof weeklySleep)[number]) {
  return Math.round((entry.endHour - entry.startHour) * 60 - entry.awakeMinutes)
}

function getPositionPct(hour: number) {
  return ((hour - AXIS_START_HOUR) / AXIS_RANGE) * 100
}

const latestSleep = weeklySleep[weeklySleep.length - 1]
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
          <div className="flex h-full flex-col justify-between">
            {weeklySleep.map((entry) => {
              const left = getPositionPct(entry.startHour)
              const width = getPositionPct(entry.endHour) - left
              const awakeWidth = (entry.awakeMinutes / 60 / AXIS_RANGE) * 100

              return (
                <div key={`${entry.day}-${entry.start}`} className="grid grid-cols-[18px_1fr_48px] items-center gap-2">
                  <p className="text-[10px] font-semibold text-[#86868b]">{entry.day}</p>
                  <div className="relative h-5 rounded-full bg-[#f2f2f7]">
                    <div
                      className="absolute top-1/2 h-3 -translate-y-1/2 rounded-full"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        backgroundColor: SLEEP_BLUE,
                      }}
                    />
                    <div
                      className="absolute top-1/2 h-3 -translate-y-1/2 rounded-full"
                      style={{
                        left: `${left + width * 0.58}%`,
                        width: `${Math.max(awakeWidth, 1.5)}%`,
                        backgroundColor: AWAKE_ORANGE,
                      }}
                    />
                  </div>
                  <p className="text-right text-[10px] font-semibold text-[#1d1d1f]">{formatDuration(getSleepMinutes(entry))}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 text-[10px] font-medium text-[#86868b]">
          <span>8 PM</span>
          <span className="text-center">2 AM</span>
          <span className="text-right">10 AM</span>
        </div>
      </div>
    </div>
  )
}
