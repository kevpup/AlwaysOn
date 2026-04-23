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

const weeklyVo2Estimates = [
  { day: 3, vo2: 52.6 },
  { day: 10, vo2: 52.9 },
  { day: 17, vo2: 53.1 },
  { day: 24, vo2: 53.0 },
  { day: 30, vo2: 53.4 },
]

const monthlyVo2Data = Array.from({ length: 30 }, (_, index) => {
  const day = index + 1
  const estimate = weeklyVo2Estimates.find((item) => item.day === day)

  return {
    day,
    label: `Day ${day}`,
    vo2: estimate?.vo2 ?? null,
  }
})

const latestVo2 = weeklyVo2Estimates[weeklyVo2Estimates.length - 1]
const vo2Values = weeklyVo2Estimates.map((item) => item.vo2)
const axisMin = Math.floor((Math.min(...vo2Values) - 0.8) * 2) / 2
const axisMax = Math.ceil((Math.max(...vo2Values) + 0.8) * 2) / 2
const yTicks = [axisMin, Math.round(((axisMin + axisMax) / 2) * 2) / 2, axisMax]

function Vo2Tooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload: { label: string; vo2: number | null } }>
}) {
  const datum = payload?.[0]?.payload
  const vo2 = datum?.vo2

  if (!active || !datum || vo2 == null) return null

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      <p className="text-xs font-medium text-muted-foreground">{datum.label}</p>
      <p className="text-sm font-semibold text-foreground">
        {vo2.toFixed(1)} <span className="text-xs font-normal text-muted-foreground">VO2 max</span>
      </p>
    </div>
  )
}

function Vo2Dot(props: any) {
  const { cx, cy, payload } = props

  if (payload.vo2 == null) return null

  const isLatest = payload.day === latestVo2.day

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

export function WhoopVo2MaxCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">VO2 Max</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-4xl font-bold leading-none tracking-[-0.04em] text-foreground">
              {latestVo2.vo2.toFixed(1)}
            </span>
            <span className="text-sm font-medium text-muted-foreground">ml/kg/min</span>
          </div>
        </div>

        <div className="rounded-full border border-border bg-background/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Weekly estimates
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
            <LineChart data={monthlyVo2Data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
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
              <Tooltip content={<Vo2Tooltip />} cursor={{ stroke: WHOOP_AXIS_BLACK, strokeDasharray: "3 3" }} />
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
                dataKey="vo2"
                connectNulls
                stroke={WHOOP_BLUE}
                strokeWidth={1.8}
                dot={<Vo2Dot />}
                activeDot={{ r: 5, fill: WHOOP_BLUE, strokeWidth: 0 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="mt-2 text-right text-[11px] font-medium text-muted-foreground">
        {weeklyVo2Estimates.length} estimates this month
      </p>
    </div>
  )
}
