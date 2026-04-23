"use client"

import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const WHOOP_BLUE = "hsl(200, 70%, 50%)"
const WHOOP_AXIS_BLACK = "hsl(220, 20%, 4%)"

const monthlyHrvData = [
  58, 61, 63, 59, 66, 68, 64, 62, 67, 69,
  66, 65, 67, 70, 72, 69, 68, 64, 66, 71,
  72, 70, 69, 71, 72, 71, 70, 69, 68, 68,
].map((hrv, index) => ({
  day: index + 1,
  hrv,
  label: `Day ${index + 1}`,
}))

const latestHrv = monthlyHrvData[monthlyHrvData.length - 1]
const hrvValues = monthlyHrvData.map((item) => item.hrv)
const axisMin = Math.floor((Math.min(...hrvValues) - 4) / 5) * 5
const axisMax = Math.ceil((Math.max(...hrvValues) + 4) / 5) * 5
const yTicks = [axisMin, Math.round((axisMin + axisMax) / 2), axisMax]

function HrvTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload: { label: string; hrv: number } }>
}) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      <p className="text-xs font-medium text-muted-foreground">{payload[0].payload.label}</p>
      <p className="text-sm font-semibold text-foreground">
        {payload[0].payload.hrv} <span className="text-xs font-normal text-muted-foreground">ms HRV</span>
      </p>
    </div>
  )
}

function HrvDot(props: any) {
  const { cx, cy, payload } = props
  const isLatest = payload.day === latestHrv.day

  if (isLatest) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={8} fill={WHOOP_BLUE} opacity={0.18} />
        <circle cx={cx} cy={cy} r={4.5} fill={WHOOP_BLUE} stroke="hsl(var(--card))" strokeWidth={2} />
      </g>
    )
  }

  return <circle cx={cx} cy={cy} r={2.6} fill={WHOOP_BLUE} opacity={0.78} />
}

export function WhoopHrvCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">HRV</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-4xl font-bold leading-none tracking-[-0.04em] text-foreground">
              {latestHrv.hrv}
            </span>
            <span className="text-sm font-medium text-muted-foreground">ms</span>
          </div>
        </div>

        <div className="rounded-full border border-border bg-background/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Last 30 days
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[28px_1fr] gap-1">
        <div className="relative pb-[24px] pt-[8px]">
          <div className="relative h-full w-full pr-1" style={{ borderRight: `1px solid ${WHOOP_AXIS_BLACK}` }}>
            {yTicks.map((tick) => (
              <span
                key={tick}
                className="absolute right-1 translate-y-1/2 text-[10px] text-[hsl(215,12%,55%)]"
                style={{ bottom: `${((tick - axisMin) / (axisMax - axisMin)) * 100}%` }}
              >
                {tick}
              </span>
            ))}
          </div>
        </div>

        <div className="relative min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyHrvData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <XAxis
                dataKey="day"
                ticks={[1, 10, 20, 30]}
                tickLine={false}
                tickMargin={8}
                axisLine={{ stroke: WHOOP_AXIS_BLACK, strokeOpacity: 0.9 }}
                height={24}
                tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 10 }}
              />
              <YAxis domain={[axisMin, axisMax]} hide />
              <Tooltip content={<HrvTooltip />} cursor={{ stroke: WHOOP_AXIS_BLACK, strokeDasharray: "3 3" }} />
              {yTicks.map((tick) => (
                <ReferenceLine
                  key={tick}
                  y={tick}
                  stroke={WHOOP_AXIS_BLACK}
                  strokeDasharray="3 3"
                  strokeOpacity={0.75}
                />
              ))}
              <Line
                type="linear"
                dataKey="hrv"
                stroke={WHOOP_BLUE}
                strokeWidth={1.8}
                dot={<HrvDot />}
                activeDot={{ r: 5, fill: WHOOP_BLUE, strokeWidth: 0 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
