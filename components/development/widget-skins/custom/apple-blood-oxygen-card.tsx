"use client"

import { useState } from "react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const OXYGEN_BLUE = "#00a8ff"

type Spo2Mode = "H" | "D" | "W"

interface Spo2Range {
  label: string
  low: number
  high: number
}

const modeLabels: Spo2Mode[] = ["H", "D", "W"]

const hourRanges: Spo2Range[] = [
  { label: "12A", low: 96, high: 98 },
  { label: "", low: 95, high: 98 },
  { label: "", low: 96, high: 99 },
  { label: "", low: 97, high: 99 },
  { label: "", low: 96, high: 98 },
]

const dayRanges: Spo2Range[] = [
  { label: "12A", low: 96, high: 98 },
  { label: "", low: 95, high: 98 },
  { label: "", low: 96, high: 99 },
  { label: "", low: 97, high: 99 },
  { label: "6A", low: 96, high: 98 },
  { label: "", low: 95, high: 97 },
  { label: "", low: 96, high: 98 },
  { label: "", low: 97, high: 99 },
  { label: "12P", low: 96, high: 99 },
  { label: "", low: 95, high: 98 },
  { label: "", low: 96, high: 98 },
  { label: "", low: 97, high: 99 },
  { label: "6P", low: 96, high: 98 },
  { label: "", low: 95, high: 97 },
  { label: "", low: 97, high: 99 },
]

const weekRanges: Spo2Range[] = [
  { label: "M", low: 95, high: 98 },
  { label: "T", low: 96, high: 99 },
  { label: "W", low: 95, high: 98 },
  { label: "T", low: 97, high: 99 },
  { label: "F", low: 96, high: 98 },
  { label: "S", low: 95, high: 97 },
  { label: "S", low: 96, high: 99 },
]

function getRangesForMode(mode: Spo2Mode) {
  if (mode === "H") return hourRanges
  if (mode === "W") return weekRanges
  return dayRanges
}

function Spo2Tooltip({ active, payload, selectedMode }: any) {
  if (!active || !payload?.length) {
    return null
  }

  const rangeData = payload[0].value
  const isDot = selectedMode === "H"

  return (
    <div className="rounded-lg border border-black/10 bg-white px-3 py-2 shadow-lg">
      <p className="text-xl font-bold leading-none text-[#1d1d1f]">
        {isDot ? rangeData[1] : `${rangeData[0]}-${rangeData[1]}`}{" "}
        <span className="text-xs font-semibold text-[#6e6e73]">%</span>
      </p>
    </div>
  )
}

const Spo2Bar = (props: any) => {
  const { x, y, width, height, selectedMode } = props

  if (selectedMode === "H") {
    return <circle cx={x + width / 2} cy={y} r={3} fill={OXYGEN_BLUE} />
  }

  return (
    <rect
      x={x + width / 2 - 3}
      y={y}
      width={6}
      height={Math.max(height, 6)}
      fill={OXYGEN_BLUE}
      rx={3}
    />
  )
}

const Spo2XTick = (props: any) => {
  const { x, y, payload, selectedMode, index } = props
  const showLabel = selectedMode === "W" ? true : selectedMode === "D" ? payload.value.length > 0 : index === 0

  if (!showLabel) return null

  return (
    <text x={x} y={y} dy={12} textAnchor="middle" fill="#86868b" fontSize={9} fontWeight={500}>
      {payload.value}
    </text>
  )
}

export function AppleBloodOxygenCard(_props: WidgetSkinProps) {
  const [selectedMode, setSelectedMode] = useState<Spo2Mode>("D")
  const ranges = getRangesForMode(selectedMode)
  const minSpo2 = Math.min(...ranges.map((range) => range.low))
  const maxSpo2 = Math.max(...ranges.map((range) => range.high))
  const chartMin = Math.max(90, minSpo2 - 2)
  const chartMax = Math.min(100, maxSpo2 + 1)
  const chartRange = chartMax - chartMin
  const axisTicks = [chartMax, Math.round((chartMin + chartMax) / 2), chartMin]
  const latestSpo2 = ranges[ranges.length - 1].high

  const chartData = ranges.map((range) => ({
    label: range.label,
    range: [range.low, range.high],
  }))

  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">Blood Oxygen</p>
            <p className="mt-0.5 text-3xl font-bold leading-none tracking-[-0.04em]" style={{ color: OXYGEN_BLUE }}>
              Range
            </p>
            <p className="mt-0.5 text-lg font-semibold leading-none text-[#1d1d1f]">
              {minSpo2}-{maxSpo2} <span className="text-xs font-medium text-[#6e6e73]">%</span>
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
            <p className="mt-2 text-lg font-semibold leading-none text-[#1d1d1f]">{latestSpo2}%</p>
            <p className="mt-0.5 text-[10px] font-medium text-[#6e6e73]">latest reading</p>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[28px_1fr] gap-2">
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
                  tick={<Spo2XTick selectedMode={selectedMode} />}
                  interval={0}
                  height={20}
                />
                <YAxis domain={[chartMin, chartMax]} hide />
                <Tooltip
                  content={<Spo2Tooltip selectedMode={selectedMode} />}
                  cursor={{ fill: "rgba(0, 168, 255, 0.08)" }}
                />
                <Bar dataKey="range" shape={<Spo2Bar selectedMode={selectedMode} />} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <p className="mt-5 text-[10px] font-medium text-[#86868b]">
          {selectedMode === "H" ? "Past hour" : selectedMode === "D" ? "Today" : "This week"}
        </p>
      </div>
    </div>
  )
}
