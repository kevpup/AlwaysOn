"use client"

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface TrendPoint {
  label: string
  value: number
}

function TrendTooltip({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
  unit: string
}) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-base font-semibold text-foreground">
          {payload[0].value}
          {unit ? <span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span> : null}
        </p>
      </div>
    )
  }

  return null
}

interface MetricTrendWidgetProps {
  value: string
  unit: string
  label: string
  helper: string
  points: TrendPoint[]
  color: string
  trendStyle?: "bars" | "line"
}

export function MetricTrendWidget({
  value,
  unit,
  label,
  helper,
  points,
  color,
  trendStyle = "bars",
}: MetricTrendWidgetProps) {
  const values = points.map((point) => point.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const paddedMin = Math.max(0, Math.floor(min - (max - min || 1) * 0.25))
  const paddedMax = Math.ceil(max + (max - min || 1) * 0.25)

  return (
    <div className="flex h-full min-w-0 flex-col">
      <div className="shrink-0 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-end gap-1">
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <span className="pb-1 text-sm text-muted-foreground">{unit}</span>
          </div>
          <p className="truncate text-sm text-muted-foreground">{label}</p>
        </div>
        <span
          className="shrink-0 rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-[0.14em]"
          style={{ backgroundColor: `${color}22`, color }}
        >
          {helper}
        </span>
      </div>

      <div className="-mx-1 mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="rounded-xl border border-border bg-background/60 p-3 pb-4">
          <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <span>{trendStyle === "line" ? "recent trend" : "daily distribution"}</span>
            <span>
              {min.toFixed(1).replace(".0", "")} - {max.toFixed(1).replace(".0", "")}
            </span>
          </div>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {trendStyle === "line" ? (
                <LineChart data={points} margin={{ top: 8, right: 8, bottom: 12, left: 2 }}>
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 12, fill: "hsl(215, 12%, 55%)" }}
                    tickMargin={8}
                    minTickGap={0}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(215, 12%, 28%)", strokeOpacity: 0.45 }}
                  />
                  <YAxis
                    domain={[paddedMin, paddedMax]}
                    tick={{ fontSize: 12, fill: "hsl(215, 12%, 55%)" }}
                    tickMargin={6}
                    tickLine={false}
                    axisLine={false}
                    width={34}
                  />
                  <Tooltip content={<TrendTooltip unit={unit} />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2.5}
                    dot={{ r: 3.5, fill: "hsl(var(--card))", stroke: color, strokeWidth: 2 }}
                    activeDot={{ r: 4.5, fill: color, strokeWidth: 0 }}
                  />
                </LineChart>
              ) : (
                <BarChart data={points} margin={{ top: 8, right: 8, bottom: 12, left: 2 }}>
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 12, fill: "hsl(215, 12%, 55%)" }}
                    tickMargin={8}
                    minTickGap={0}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(215, 12%, 28%)", strokeOpacity: 0.45 }}
                  />
                  <YAxis
                    domain={[paddedMin, paddedMax]}
                    tick={{ fontSize: 12, fill: "hsl(215, 12%, 55%)" }}
                    tickMargin={6}
                    tickLine={false}
                    axisLine={false}
                    width={34}
                  />
                  <Tooltip cursor={{ fill: "transparent" }} content={<TrendTooltip unit={unit} />} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={18} fill={color} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

interface RangeSummaryWidgetProps {
  title: string
  primaryValue: string
  primaryLabel: string
  secondaryValue: string
  secondaryLabel: string
  color: string
  values: number[]
}

export function RangeSummaryWidget({
  title,
  primaryValue,
  primaryLabel,
  secondaryValue,
  secondaryLabel,
  color,
  values,
}: RangeSummaryWidgetProps) {
  const max = Math.max(...values)

  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden">
      <div className="grid grid-cols-2 gap-3">
        <div className="min-w-0 rounded-xl border border-border bg-background/60 p-3">
          <p className="text-2xl font-bold text-foreground">{primaryValue}</p>
          <p className="text-sm leading-tight text-muted-foreground">{primaryLabel}</p>
        </div>
        <div className="min-w-0 rounded-xl border border-border bg-background/60 p-3">
          <p className="text-2xl font-bold" style={{ color }}>{secondaryValue}</p>
          <p className="text-sm leading-tight text-muted-foreground">{secondaryLabel}</p>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <p className="mt-3 truncate text-sm uppercase tracking-[0.14em] text-muted-foreground">{title}</p>
        <div className="mt-4 flex h-16 items-end gap-1.5">
          {values.map((value, index) => (
            <div
              key={`${value}-${index}`}
              className="flex-1 rounded-t-md"
              style={{
                height: `${Math.max(12, (value / max) * 100)}%`,
                backgroundColor: color,
                opacity: 0.35 + (value / max) * 0.65,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface DistributionWidgetProps {
  items: Array<{ label: string; minutes: number; color: string }>
  totalLabel: string
}

export function DistributionWidget({ items, totalLabel }: DistributionWidgetProps) {
  const total = items.reduce((sum, item) => sum + item.minutes, 0)

  return (
    <div className="flex h-full flex-col">
      <div>
        <p className="text-3xl font-bold text-foreground">{total}</p>
        <p className="text-sm text-muted-foreground">{totalLabel}</p>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{item.label}</span>
              <span className="text-muted-foreground">{item.minutes} min</span>
            </div>
            <div className="h-2 rounded-full bg-secondary">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(item.minutes / total) * 100}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ScoreRingWidgetProps {
  score: number
  label: string
  color: string
}

export function ScoreRingWidget({ score, label, color }: ScoreRingWidgetProps) {
  const circumference = 2 * Math.PI * 54
  const progress = (score / 100) * circumference
  const dashOffset = circumference - progress

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <svg width="130" height="130" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(220, 14%, 18%)" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-bold text-foreground">{score}</span>
          <span className="text-xs uppercase tracking-wider text-muted-foreground">/ 100</span>
        </div>
      </div>
      <p className="mt-3 text-base font-medium" style={{ color }}>{label}</p>
    </div>
  )
}

interface StatusListWidgetProps {
  title: string
  count: number
  total: number
  items: Array<{ label: string; status: string; value: string }>
}

export function StatusListWidget({ title, count, total, items }: StatusListWidgetProps) {
  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden">
      <div className="mb-4">
        <p className="text-3xl font-bold text-foreground">{count}/{total}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="min-w-0 rounded-xl border border-border bg-background/60 p-2.5">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-medium text-foreground">{item.label}</p>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                  item.status === "In range"
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-amber-500/15 text-amber-300"
                }`}
              >
                {item.status}
              </span>
            </div>
            <p className="mt-1 truncate text-sm text-muted-foreground">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

interface CompactListWidgetProps {
  headline: string
  subline: string
  items: Array<{ label: string; metaA: string; metaB?: string }>
}

export function CompactListWidget({ headline, subline, items }: CompactListWidgetProps) {
  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden">
      <div className="mb-4">
        <p className="text-3xl font-bold text-foreground">{headline}</p>
        <p className="text-sm text-muted-foreground">{subline}</p>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2.5"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-medium text-foreground">{item.label}</p>
              {item.metaB ? <p className="truncate text-sm text-muted-foreground">{item.metaB}</p> : null}
            </div>
            <p className="shrink-0 text-right text-sm font-medium text-muted-foreground">{item.metaA}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
