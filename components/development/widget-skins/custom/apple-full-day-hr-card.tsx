"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"
import { defaultAppleWatchHrDataset } from "@/lib/apple-watch-hr-data"

const HEART_RED = "#ff2d55"

type HrMode = "H" | "D" | "W"

interface HrRange {
  label: string
  low: number
  high: number
}

const modeLabels: HrMode[] = ["H", "D", "W"]

const weekRanges: HrRange[] = [
  { label: "M", low: 42, high: 92 },
  { label: "T", low: 44, high: 105 },
  { label: "W", low: 39, high: 88 },
  { label: "T", low: 43, high: 96 },
  { label: "F", low: 46, high: 112 },
  { label: "S", low: 41, high: 84 },
  { label: "S", low: 40, high: 78 },
]

function buildAxisTicks(chartMin: number, chartMax: number) {
  return Array.from({ length: (chartMax - chartMin) / 20 + 1 }, (_, index) => chartMax - index * 20)
}

function CustomTooltip({ active, payload, selectedMode }: any) {
  if (active && payload && payload.length) {
    const rangeData = payload[0].value
    const isDot = selectedMode === "H"

    return (
      <div className="rounded-lg border border-black/10 bg-white px-3 py-2 shadow-lg">
        <p className="text-xl font-bold leading-none text-[#1d1d1f]">
          {isDot ? rangeData[1] : `${rangeData[0]}-${rangeData[1]}`} <span className="text-xs font-semibold text-[#6e6e73]">BPM</span>
        </p>
      </div>
    )
  }
  return null
}

const CustomBar = (props: any) => {
  const { x, y, width, height, selectedMode } = props

  if (selectedMode === "H") {
    return <circle cx={x + width / 2} cy={y} r={3} fill={HEART_RED} />
  }

  return (
    <rect
      x={x + width / 2 - 3}
      y={y}
      width={6}
      height={Math.max(height, 6)}
      fill={HEART_RED}
      rx={3}
    />
  )
}

const CustomXTick = (props: any) => {
  const { x, y, payload, selectedMode, index } = props
  const showLabel = selectedMode === "W" ? true : selectedMode === "D" ? index % 6 === 0 : payload.value.length > 0
  if (!showLabel) return null

  return (
    <text x={x} y={y} dy={12} textAnchor="middle" fill="#86868b" fontSize={9} fontWeight={500}>
      {payload.value}
    </text>
  )
}

export function AppleFullDayHrCard({ hrDataset = defaultAppleWatchHrDataset, metric }: WidgetSkinProps) {
  const [selectedMode, setSelectedMode] = useState<HrMode>("D")
  const ranges = selectedMode === "H" ? hrDataset.lastHourPoints : selectedMode === "D" ? hrDataset.hourlyRanges : weekRanges
  const lastHrReading = hrDataset.lastReading
  const minHr = Math.min(...ranges.map((range) => range.low))
  const maxHr = Math.max(...ranges.map((range) => range.high))
  const chartMin = 40
  const chartMax = Math.ceil(Math.max(maxHr, 100) / 20) * 20
  const chartRange = chartMax - chartMin
  const axisTicks = buildAxisTicks(chartMin, chartMax)

  const chartData = ranges.map(r => ({
    label: r.label,
    range: [r.low, r.high],
  }))

  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">Heart Rate</p>
            <p className="mt-0.5 text-3xl font-bold leading-none tracking-[-0.04em]" style={{ color: HEART_RED }}>
              Range
            </p>
            <p className="mt-0.5 text-lg font-semibold leading-none text-[#1d1d1f]">
              {minHr}-{maxHr} <span className="text-xs font-medium text-[#6e6e73]">BPM</span>
            </p>
          </div>

          <div className="text-right">
            <div className="grid grid-cols-3 rounded-full bg-[#f2f2f7] p-0.5 text-[10px] font-semibold text-[#6e6e73]">
              {modeLabels.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSelectedMode(mode)}
                  className={`rounded-full px-2.5 py-1 transition-colors ${
                    selectedMode === mode ? "bg-white text-[#1d1d1f] shadow-sm" : "text-[#6e6e73]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <p className="mt-2 text-lg font-semibold leading-none text-[#1d1d1f]">{lastHrReading}</p>
            <p className="mt-0.5 text-[10px] font-medium text-[#6e6e73]">last HR reading</p>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[24px_1fr] gap-2">
          <div className="relative mb-5 mt-1 border-r border-[#d1d1d6] pr-1">
            {axisTicks.map((tick) => (
              <span
                key={tick}
                className="absolute right-1 translate-y-1/2 text-[9px] font-medium text-[#86868b]"
                style={{ bottom: `${((tick - chartMin) / chartRange) * 100}%` }}
              >
                {tick}
              </span>
            ))}
          </div>

          <div className="relative min-h-0 border-b border-[#d1d1d6]">
            {axisTicks.map((tick) => (
              <div
                key={tick}
                className="absolute left-0 right-0 border-t border-[#e5e5ea]"
                style={{ bottom: `${((tick - chartMin) / chartRange) * 100}%` }}
              />
            ))}

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={<CustomXTick selectedMode={selectedMode} />}
                  interval={0}
                  height={20}
                />
                <YAxis domain={[chartMin, chartMax]} hide />
                <Tooltip
                  content={<CustomTooltip selectedMode={selectedMode} />}
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                />
                <Bar
                  dataKey="range"
                  shape={<CustomBar selectedMode={selectedMode} />}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <p className="mt-5 text-[10px] font-medium text-[#86868b]">
          {selectedMode === "H" ? "Past hour" : selectedMode === "D" ? "Today" : metric?.detail || "This week"}
        </p>
      </div>
    </div>
  )
}
