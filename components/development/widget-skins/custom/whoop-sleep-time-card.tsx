"use client"

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const WHOOP_BLUE = "hsl(200, 70%, 50%)"
const WHOOP_AXIS_BLACK = "hsl(220, 20%, 4%)"

const weeklySleepDurations = [
  { day: "M", hours: 7.1 },
  { day: "T", hours: 6.4 },
  { day: "W", hours: 7.8 },
  { day: "T", hours: 6.9 },
  { day: "F", hours: 8.2 },
  { day: "S", hours: 7.4 },
  { day: "S", hours: 6.7 },
]

const lastNightSleep = weeklySleepDurations[weeklySleepDurations.length - 1]
const averageSleep = weeklySleepDurations.reduce((total, item) => total + item.hours, 0) / weeklySleepDurations.length
const maxSleep = Math.ceil(Math.max(...weeklySleepDurations.map((item) => item.hours)) + 0.5)

function formatSleepDuration(hours: number) {
  const wholeHours = Math.floor(hours)
  const minutes = Math.round((hours - wholeHours) * 60)

  return `${wholeHours}h ${minutes}m`
}

function SleepTimeTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value?: number }>
  label?: string
}) {
  if (!active || !payload?.length || payload[0].value == null) return null

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">{formatSleepDuration(payload[0].value)}</p>
    </div>
  )
}

export function WhoopSleepTimeCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Sleep Time</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-4xl font-bold leading-none tracking-[-0.05em] text-foreground">
              {formatSleepDuration(lastNightSleep.hours)}
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold text-foreground">{formatSleepDuration(averageSleep)}</p>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">7-day avg</p>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[26px_1fr] gap-1">
        <div className="relative pb-[24px] pt-[8px]">
          <div className="relative h-full w-full pr-1" style={{ borderRight: `1px solid ${WHOOP_AXIS_BLACK}` }}>
            {[0, Math.round(maxSleep / 2), maxSleep].map((tick) => (
              <span
                key={tick}
                className="absolute right-1 translate-y-1/2 text-[9px] text-[hsl(215,12%,55%)]"
                style={{ bottom: `${(tick / maxSleep) * 100}%` }}
              >
                {tick}
              </span>
            ))}
          </div>
        </div>

        <div className="relative min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklySleepDurations} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={8}
                axisLine={{ stroke: WHOOP_AXIS_BLACK, strokeOpacity: 0.9 }}
                height={24}
                tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 10 }}
              />
              <YAxis domain={[0, maxSleep]} hide />
              <Tooltip content={<SleepTimeTooltip />} cursor={{ fill: "hsl(var(--muted) / 0.22)" }} />
              <Bar dataKey="hours" barSize={14} radius={[4, 4, 0, 0]}>
                {weeklySleepDurations.map((item, index) => (
                  <Cell
                    key={`${item.day}-${index}`}
                    fill={index === weeklySleepDurations.length - 1 ? WHOOP_BLUE : "hsl(200, 70%, 50% / 0.38)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
