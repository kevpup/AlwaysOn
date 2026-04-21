"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"
import { Bar, BarChart, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const weeklySteps = [
  { day: "M", value: 9840 },
  { day: "T", value: 10320 },
  { day: "W", value: 4180 },
  { day: "T", value: 10810 },
  { day: "F", value: 12640 },
  { day: "S", value: 9575 },
  { day: "S", value: 7104 },
]

function StepsTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">{payload[0].value.toLocaleString()} steps</p>
    </div>
  )
}

export function WhoopStepsCard({ metric }: WidgetSkinProps) {
  const tickInterval = 5000
  const maxValue = Math.max(...weeklySteps.map((item) => item.value))
  const maxSteps = Math.ceil(maxValue / tickInterval) * tickInterval
  const axisLabels = Array.from({ length: maxSteps / tickInterval + 1 }, (_, index) => index * tickInterval)
  const visibleAxisLabels = axisLabels.filter((label) => label > 0)

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-3 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-3xl font-bold leading-none text-foreground">{metric.primaryValue}</p>
          <p className="mt-1 text-sm text-muted-foreground">steps</p>
        </div>
      </div>

      <div className="min-h-0 flex-1 rounded-xl bg-secondary/40 px-3 py-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklySteps} margin={{ top: 8, right: 10, bottom: 2, left: 0 }}>
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10, fontWeight: 600, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
              interval={0}
            />
            <YAxis
              domain={[0, maxSteps]}
              ticks={axisLabels}
              tickFormatter={(value) => (Number(value) === 0 ? "0" : `${Number(value) / 1000}k`)}
              tick={{ fontSize: 9, fontWeight: 500, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              width={40}
            />
            <Tooltip content={<StepsTooltip />} cursor={{ fill: "hsl(var(--muted) / 0.35)" }} />
            {visibleAxisLabels.map((label) => (
              <ReferenceLine key={label} y={label} stroke="hsl(var(--border))" strokeOpacity={0.8} />
            ))}
            <Bar dataKey="value" barSize={9} radius={[6, 6, 0, 0]}>
              {weeklySteps.map((item, index) => (
                <Cell
                  key={`${item.day}-${index}`}
                  fill={index === weeklySteps.length - 1 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.35)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
