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

const RESPIRATORY_BLUE = "#007aff"

type RespiratoryMode = "H" | "D" | "W"

interface RespiratoryRange {
  label: string
  low: number
  high: number
}

const modeLabels: RespiratoryMode[] = ["H", "D", "W"]

const hourRanges: RespiratoryRange[] = [
  { label: "12A", low: 13.8, high: 14.8 },
  { label: "", low: 14.1, high: 15.0 },
  { label: "", low: 14.4, high: 15.2 },
  { label: "", low: 14.0, high: 15.1 },
  { label: "", low: 13.9, high: 14.9 },
]

const dayRanges: RespiratoryRange[] = [
  { label: "12A", low: 13.8, high: 14.8 },
  { label: "", low: 14.0, high: 15.0 },
  { label: "", low: 14.2, high: 15.4 },
  { label: "", low: 13.9, high: 15.1 },
  { label: "6A", low: 14.4, high: 15.6 },
  { label: "", low: 14.1, high: 15.3 },
  { label: "", low: 13.7, high: 14.8 },
  { label: "", low: 14.0, high: 15.0 },
  { label: "12P", low: 14.2, high: 15.2 },
  { label: "", low: 14.4, high: 15.8 },
  { label: "", low: 14.0, high: 15.3 },
  { label: "", low: 13.9, high: 15.0 },
  { label: "6P", low: 14.3, high: 15.7 },
  { label: "", low: 14.1, high: 15.4 },
  { label: "", low: 13.8, high: 14.9 },
]

const weekRanges: RespiratoryRange[] = [
  { label: "M", low: 13.9, high: 15.1 },
  { label: "T", low: 14.0, high: 15.3 },
  { label: "W", low: 14.2, high: 15.5 },
  { label: "T", low: 13.8, high: 15.0 },
  { label: "F", low: 14.1, high: 15.4 },
  { label: "S", low: 14.3, high: 15.8 },
  { label: "S", low: 13.9, high: 15.2 },
]

function getRangesForMode(mode: RespiratoryMode) {
  if (mode === "H") return hourRanges
  if (mode === "W") return weekRanges
  return dayRanges
}

function buildAxisTicks(chartMin: number, chartMax: number) {
  return [chartMax, (chartMin + chartMax) / 2, chartMin]
}

function formatRespiratoryValue(value: number) {
  return value.toFixed(1)
}

function RespiratoryTooltip({ active, payload, selectedMode }: any) {
  if (!active || !payload?.length) {
    return null
  }

  const rangeData = payload[0].value
  const isDot = selectedMode === "H"

  return (
    <div className="rounded-lg border border-black/10 bg-white px-3 py-2 shadow-lg">
      <p className="text-xl font-bold leading-none text-[#1d1d1f]">
        {isDot ? formatRespiratoryValue(rangeData[1]) : `${formatRespiratoryValue(rangeData[0])}-${formatRespiratoryValue(rangeData[1])}`}{" "}
        <span className="text-xs font-semibold text-[#6e6e73]">br/min</span>
      </p>
    </div>
  )
}

const RespiratoryBar = (props: any) => {
  const { x, y, width, height, selectedMode } = props

  if (selectedMode === "H") {
    return <circle cx={x + width / 2} cy={y} r={3} fill={RESPIRATORY_BLUE} />
  }

  return (
    <rect
      x={x + width / 2 - 3}
      y={y}
      width={6}
      height={Math.max(height, 6)}
      fill={RESPIRATORY_BLUE}
      rx={3}
    />
  )
}

const RespiratoryXTick = (props: any) => {
  const { x, y, payload, selectedMode, index } = props
  const showLabel = selectedMode === "W" ? true : selectedMode === "D" ? payload.value.length > 0 : index === 0

  if (!showLabel) return null

  return (
    <text x={x} y={y} dy={12} textAnchor="middle" fill="#86868b" fontSize={9} fontWeight={500}>
      {payload.value}
    </text>
  )
}

export function AppleRespiratoryRateCard(_props: WidgetSkinProps) {
  const [selectedMode, setSelectedMode] = useState<RespiratoryMode>("D")
  const ranges = getRangesForMode(selectedMode)
  const minRate = Math.min(...ranges.map((range) => range.low))
  const maxRate = Math.max(...ranges.map((range) => range.high))
  const chartMin = Math.floor((minRate - 0.6) * 2) / 2
  const chartMax = Math.ceil((maxRate + 0.6) * 2) / 2
  const chartRange = chartMax - chartMin
  const axisTicks = buildAxisTicks(chartMin, chartMax)
  const latestRate = ranges[ranges.length - 1].high

  const chartData = ranges.map((range) => ({
    label: range.label,
    range: [range.low, range.high],
  }))

  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">Respiratory Rate</p>
            <p className="mt-0.5 text-3xl font-bold leading-none tracking-[-0.04em]" style={{ color: RESPIRATORY_BLUE }}>
              Range
            </p>
            <p className="mt-0.5 text-lg font-semibold leading-none text-[#1d1d1f]">
              {formatRespiratoryValue(minRate)}-{formatRespiratoryValue(maxRate)}{" "}
              <span className="text-xs font-medium text-[#6e6e73]">br/min</span>
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
            <p className="mt-2 text-lg font-semibold leading-none text-[#1d1d1f]">
              {formatRespiratoryValue(latestRate)}
            </p>
            <p className="mt-0.5 text-[10px] font-medium text-[#6e6e73]">latest reading</p>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[30px_1fr] gap-2">
          <div className="relative mb-5 mt-1 border-r border-[#d1d1d6] pr-1">
            {axisTicks.map((tick) => (
              <span
                key={tick}
                className="absolute right-1 translate-y-1/2 text-[9px] font-medium text-[#86868b]"
                style={{ bottom: `${((tick - chartMin) / chartRange) * 100}%` }}
              >
                {formatRespiratoryValue(tick)}
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
                  tick={<RespiratoryXTick selectedMode={selectedMode} />}
                  interval={0}
                  height={20}
                />
                <YAxis domain={[chartMin, chartMax]} hide />
                <Tooltip
                  content={<RespiratoryTooltip selectedMode={selectedMode} />}
                  cursor={{ fill: "rgba(0, 122, 255, 0.08)" }}
                />
                <Bar
                  dataKey="range"
                  shape={<RespiratoryBar selectedMode={selectedMode} />}
                  isAnimationActive={false}
                />
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
