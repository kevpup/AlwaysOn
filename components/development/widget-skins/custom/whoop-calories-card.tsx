"use client"

import {
  Bar,
  BarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"
import { parseMetricInteger } from "@/components/development/widget-skins/custom/widget-metric-utils"

const WHOOP_BLUE = "hsl(200, 70%, 50%)"
const WHOOP_AXIS_BLACK = "hsl(220, 20%, 4%)"

const monthlyCaloriesData = [
  612, 688, 701, 754, 638, 722, 804, 676, 692, 758,
  718, 663, 822, 784, 705, 726, 768, 796, 681, 694,
  742, 731, 648, 772, 812, 724, 686, 736, 768, 742,
].map((calories, index) => ({
  day: index + 1,
  calories,
  label: `Day ${index + 1}`,
}))

const latestCalories = monthlyCaloriesData[monthlyCaloriesData.length - 1]
const averageCalories = Math.round(
  monthlyCaloriesData.reduce((total, item) => total + item.calories, 0) / monthlyCaloriesData.length
)
const calorieValues = monthlyCaloriesData.map((item) => item.calories)
const axisMin = Math.floor((Math.min(...calorieValues) - 150) / 250) * 250
const axisMax = Math.ceil((Math.max(...calorieValues) + 150) / 250) * 250
const yTicks = [axisMin, averageCalories, axisMax]

function CaloriesTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload: { label: string; calories: number } }>
}) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      <p className="text-xs font-medium text-muted-foreground">{payload[0].payload.label}</p>
      <p className="text-sm font-semibold text-foreground">
        {payload[0].payload.calories.toLocaleString()}{" "}
        <span className="text-xs font-normal text-muted-foreground">cal</span>
      </p>
    </div>
  )
}

export function WhoopCaloriesCard({ metric }: WidgetSkinProps) {
  const displayCalories = parseMetricInteger(metric.primaryValue)

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Calories</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-4xl font-bold leading-none tracking-[-0.04em] text-foreground">
              {displayCalories.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-muted-foreground">cal</span>
          </div>
        </div>

        <div className="rounded-full border border-border bg-background/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Last 30 days
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[36px_1fr] gap-1">
        <div className="relative pb-[24px] pt-[8px]">
          <div className="relative h-full w-full pr-1" style={{ borderRight: `1px solid ${WHOOP_AXIS_BLACK}` }}>
            {yTicks.map((tick) => (
              <span
                key={tick}
                className="absolute right-1 translate-y-1/2 text-[9px] text-[hsl(215,12%,55%)]"
                style={{ bottom: `${((tick - axisMin) / (axisMax - axisMin)) * 100}%` }}
              >
                {tick >= 1000 ? `${Math.round(tick / 100) / 10}k` : tick}
              </span>
            ))}
          </div>
        </div>

        <div className="relative min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyCaloriesData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }} barGap={4}>
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
              <Tooltip content={<CaloriesTooltip />} cursor={{ fill: "hsl(var(--muted) / 0.22)" }} />
              <ReferenceLine
                y={averageCalories}
                stroke={WHOOP_BLUE}
                strokeDasharray="4 4"
                strokeOpacity={0.95}
                strokeWidth={1}
              />
              <Bar dataKey="calories" fill={WHOOP_BLUE} radius={[3, 3, 0, 0]} barSize={3} opacity={0.88} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="mt-2 text-right text-[11px] font-medium text-muted-foreground">
        Avg {averageCalories.toLocaleString()} cal
      </p>
    </div>
  )
}
