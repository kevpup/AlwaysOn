import { useId } from "react"

import { type WidgetDevelopmentMetric, type WidgetDevelopmentTone } from "@/lib/widget-development"

export const toneHex: Record<WidgetDevelopmentTone, string> = {
  emerald: "#17d98c",
  red: "#ff453a",
  orange: "#ff8a00",
  amber: "#ffcc00",
  blue: "#0a84ff",
  cyan: "#24d6ff",
  purple: "#8f7cff",
  pink: "#ff5fb7",
}

export function getToneColor(metric: WidgetDevelopmentMetric) {
  return toneHex[metric.tone]
}

function getRange(series: number[]) {
  const min = Math.min(...series)
  const max = Math.max(...series)
  return { min, max: max === min ? min + 1 : max }
}

export function MiniLine({
  color,
  fillArea = false,
  referenceLineColor,
  series,
  showReferenceLines = false,
  strokeLinecap = "round",
  strokeWidth = 3,
}: {
  color: string
  fillArea?: boolean
  referenceLineColor?: string
  series: number[]
  showReferenceLines?: boolean
  strokeLinecap?: "round" | "butt" | "square"
  strokeWidth?: number
}) {
  const gradientId = useId()
  const { min, max } = getRange(series)
  const coordinates = series
    .map((value, index) => {
      const x = series.length === 1 ? 50 : (index / (series.length - 1)) * 100
      const y = 86 - ((value - min) / (max - min)) * 62
      return { x, y }
    })
  const points = coordinates.map(({ x, y }) => `${x},${y}`).join(" ")
  const areaPoints = [`0,100`, ...coordinates.map(({ x, y }) => `${x},${y}`), `100,100`]
    .join(" ")

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" aria-hidden="true">
      {fillArea ? (
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.34" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      ) : null}
      {showReferenceLines
        ? [28, 55, 82].map((y) => (
            <line
              key={y}
              x1="0"
              x2="100"
              y1={y}
              y2={y}
              stroke={referenceLineColor ?? "currentColor"}
              strokeOpacity="0.35"
              strokeWidth="1"
            />
          ))
        : null}
      {fillArea ? <polygon points={areaPoints} fill={`url(#${gradientId})`} /> : null}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeLinecap={strokeLinecap}
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

export function MiniBars({
  color,
  series,
  rounded = true,
}: {
  color: string
  series: number[]
  rounded?: boolean
}) {
  const { min, max } = getRange(series)

  return (
    <div className="flex h-full items-end gap-1.5">
      {series.map((value, index) => {
        const height = 22 + ((value - min) / (max - min)) * 58

        return (
          <div key={`${value}-${index}`} className="flex flex-1 items-end">
            <div
              className={rounded ? "w-full rounded-t-full" : "w-full rounded-sm"}
              style={{
                backgroundColor: color,
                height: `${height}%`,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export function ScoreRing({
  color,
  label,
  size = "md",
  value,
}: {
  color: string
  label?: string
  size?: "sm" | "md" | "lg" | "xl"
  value: string
}) {
  const numericValue = Number.parseFloat(value.replace(/[^0-9.]/g, ""))
  const percent = Number.isFinite(numericValue) ? Math.min(Math.max(numericValue, 0), 100) : 72
  const dashOffset = 88 - (percent / 100) * 88
  const sizeClass = {
    sm: "h-20 w-20",
    md: "h-24 w-24",
    lg: "h-32 w-32",
    xl: "h-40 w-40",
  }[size]
  const valueClass = size === "xl" ? "text-3xl" : size === "lg" ? "text-2xl" : "text-lg"

  return (
    <div className={`relative flex ${sizeClass} items-center justify-center`}>
      <svg viewBox="0 0 36 36" className="absolute inset-0 h-full w-full rotate-[-90deg]" aria-hidden="true">
        <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="4" />
        <circle
          cx="18"
          cy="18"
          r="14"
          fill="none"
          stroke={color}
          strokeDasharray="88"
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          strokeWidth="4"
        />
      </svg>
      <div className="text-center">
        <p className={`${valueClass} font-bold leading-none tracking-[-0.04em]`}>{value}</p>
        {label ? <p className="mt-0.5 text-[9px] uppercase tracking-[0.12em] opacity-65">{label}</p> : null}
      </div>
    </div>
  )
}

export function ZoneStack({ series }: { series: number[] }) {
  const colors = ["#49d17d", "#2dd4bf", "#facc15", "#fb923c", "#ef4444"]
  const total = series.reduce((sum, value) => sum + value, 0) || 1

  return (
    <div className="flex h-8 overflow-hidden rounded-full">
      {series.map((value, index) => (
        <div
          key={`${value}-${index}`}
          style={{
            width: `${(value / total) * 100}%`,
            backgroundColor: colors[index % colors.length],
          }}
        />
      ))}
    </div>
  )
}

export function SleepBands({ series, soft = false }: { series: number[]; soft?: boolean }) {
  const colors = soft
    ? ["#b9a8ff", "#8bc6ff", "#ffd5e8", "#d7c7ff", "#a7f3d0"]
    : ["#2d46ff", "#26c6da", "#8b5cf6", "#60a5fa", "#14b8a6"]

  return (
    <div className="flex h-12 items-end gap-1">
      {series.map((value, index) => (
        <div
          key={`${value}-${index}`}
          className="flex-1 rounded-t-md"
          style={{
            height: `${28 + value}%`,
            backgroundColor: colors[index % colors.length],
          }}
        />
      ))}
    </div>
  )
}

export function TinyWorkoutGraph({ color, series }: { color: string; series: number[] }) {
  return (
    <div className="grid h-full grid-cols-[1fr_42px] items-center gap-3">
      <MiniLine color={color} series={series} strokeWidth={4} />
      <div className="space-y-1 text-right text-[10px] opacity-70">
        <p>Avg HR</p>
        <p>Zones</p>
        <p>Time</p>
      </div>
    </div>
  )
}
