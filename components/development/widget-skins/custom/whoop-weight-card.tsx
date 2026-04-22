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

const manualWeightEntries = [
  { day: 2, weight: 178.4 },
  { day: 7, weight: 177.9 },
  { day: 13, weight: 177.2 },
  { day: 19, weight: 176.8 },
  { day: 24, weight: 176.5 },
  { day: 30, weight: 176.9 },
]

const monthlyWeightData = Array.from({ length: 30 }, (_, index) => {
  const day = index + 1
  const entry = manualWeightEntries.find((item) => item.day === day)

  return {
    day,
    label: `Day ${day}`,
    weight: entry?.weight ?? null,
  }
})

const latestWeight = manualWeightEntries[manualWeightEntries.length - 1]
const weightValues = manualWeightEntries.map((item) => item.weight)
const axisMin = Math.floor((Math.min(...weightValues) - 1) * 2) / 2
const axisMax = Math.ceil((Math.max(...weightValues) + 1) * 2) / 2
const yTicks = [axisMin, Math.round(((axisMin + axisMax) / 2) * 2) / 2, axisMax]

function WeightTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload: { label: string; weight: number | null } }>
}) {
  const datum = payload?.[0]?.payload
  const weight = datum?.weight

  if (!active || !datum || weight == null) return null

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      <p className="text-xs font-medium text-muted-foreground">{datum.label}</p>
      <p className="text-sm font-semibold text-foreground">
        {weight.toFixed(1)} <span className="text-xs font-normal text-muted-foreground">lb</span>
      </p>
    </div>
  )
}

function WeightDot(props: any) {
  const { cx, cy, payload } = props

  if (payload.weight == null) return null

  const isLatest = payload.day === latestWeight.day

  if (isLatest) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={8} fill={WHOOP_BLUE} opacity={0.18} />
        <circle cx={cx} cy={cy} r={4.5} fill={WHOOP_BLUE} stroke="hsl(var(--card))" strokeWidth={2} />
      </g>
    )
  }

  return <circle cx={cx} cy={cy} r={3} fill={WHOOP_BLUE} opacity={0.82} />
}

export function WhoopWeightCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Weight</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-4xl font-bold leading-none tracking-[-0.04em] text-foreground">
              {latestWeight.weight.toFixed(1)}
            </span>
            <span className="text-sm font-medium text-muted-foreground">lb</span>
          </div>
        </div>

        <div className="rounded-full border border-border bg-background/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Manual entries
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[34px_1fr] gap-1">
        <div className="relative pb-[24px] pt-[8px]">
          <div className="relative h-full w-full pr-1" style={{ borderRight: `1px solid ${WHOOP_AXIS_BLACK}` }}>
            {yTicks.map((tick) => (
              <span
                key={tick}
                className="absolute right-1 translate-y-1/2 text-[9px] text-[hsl(215,12%,55%)]"
                style={{ bottom: `${((tick - axisMin) / (axisMax - axisMin)) * 100}%` }}
              >
                {tick.toFixed(0)}
              </span>
            ))}
          </div>
        </div>

        <div className="relative min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyWeightData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
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
              <Tooltip content={<WeightTooltip />} cursor={{ stroke: WHOOP_AXIS_BLACK, strokeDasharray: "3 3" }} />
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
                dataKey="weight"
                connectNulls
                stroke={WHOOP_BLUE}
                strokeWidth={1.8}
                dot={<WeightDot />}
                activeDot={{ r: 5, fill: WHOOP_BLUE, strokeWidth: 0 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="mt-2 text-right text-[11px] font-medium text-muted-foreground">
        {manualWeightEntries.length} measurements this month
      </p>
    </div>
  )
}
