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

const monthlyRespiratoryRateData = [
  13.4, 13.5, 13.7, 13.6, 13.8, 14.0, 13.9, 13.7, 13.6, 13.8,
  14.1, 14.0, 13.9, 13.7, 13.6, 13.5, 13.7, 13.8, 14.0, 14.2,
  14.1, 13.9, 13.8, 13.6, 13.7, 13.9, 14.0, 13.8, 13.7, 13.9,
].map((respiratoryRate, index) => ({
  day: index + 1,
  respiratoryRate,
  label: `Day ${index + 1}`,
}))

const latestRespiratoryRate = monthlyRespiratoryRateData[monthlyRespiratoryRateData.length - 1]
const respiratoryRateValues = monthlyRespiratoryRateData.map((item) => item.respiratoryRate)
const axisMin = Math.floor((Math.min(...respiratoryRateValues) - 0.3) * 2) / 2
const axisMax = Math.ceil((Math.max(...respiratoryRateValues) + 0.3) * 2) / 2
const yTicks = [axisMin, Math.round(((axisMin + axisMax) / 2) * 10) / 10, axisMax]

function RespiratoryRateTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload: { label: string; respiratoryRate: number } }>
}) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      <p className="text-xs font-medium text-muted-foreground">{payload[0].payload.label}</p>
      <p className="text-sm font-semibold text-foreground">
        {payload[0].payload.respiratoryRate.toFixed(1)}{" "}
        <span className="text-xs font-normal text-muted-foreground">br/min</span>
      </p>
    </div>
  )
}

function RespiratoryRateDot(props: any) {
  const { cx, cy, payload } = props
  const isLatest = payload.day === latestRespiratoryRate.day

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

export function WhoopRespiratoryRateCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Respiratory Rate</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-4xl font-bold leading-none tracking-[-0.04em] text-foreground">
              {latestRespiratoryRate.respiratoryRate.toFixed(1)}
            </span>
            <span className="text-sm font-medium text-muted-foreground">br/min</span>
          </div>
        </div>

        <div className="rounded-full border border-border bg-background/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Last 30 nights
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[32px_1fr] gap-1">
        <div className="relative pb-[24px] pt-[8px]">
          <div className="relative h-full w-full pr-1" style={{ borderRight: `1px solid ${WHOOP_AXIS_BLACK}` }}>
            {yTicks.map((tick) => (
              <span
                key={tick}
                className="absolute right-1 translate-y-1/2 text-[9px] text-[hsl(215,12%,55%)]"
                style={{ bottom: `${((tick - axisMin) / (axisMax - axisMin)) * 100}%` }}
              >
                {tick.toFixed(1)}
              </span>
            ))}
          </div>
        </div>

        <div className="relative min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyRespiratoryRateData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
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
              <Tooltip content={<RespiratoryRateTooltip />} cursor={{ stroke: WHOOP_AXIS_BLACK, strokeDasharray: "3 3" }} />
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
                dataKey="respiratoryRate"
                stroke={WHOOP_BLUE}
                strokeWidth={1.8}
                dot={<RespiratoryRateDot />}
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
