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

const GARMIN_BLUE = "#007cc3"
const GARMIN_GRID_LINE = "#2c2c2e"
const GARMIN_MUTED = "#8e8e93"

const monthlyWeightData = [
  { day: 1, weight: 178.4 },
  { day: 2, weight: null },
  { day: 3, weight: null },
  { day: 4, weight: null },
  { day: 5, weight: 178.0 },
  { day: 6, weight: null },
  { day: 7, weight: null },
  { day: 8, weight: null },
  { day: 9, weight: 177.8 },
  { day: 10, weight: null },
  { day: 11, weight: null },
  { day: 12, weight: null },
  { day: 13, weight: null },
  { day: 14, weight: 177.1 },
  { day: 15, weight: null },
  { day: 16, weight: null },
  { day: 17, weight: null },
  { day: 18, weight: 176.9 },
  { day: 19, weight: null },
  { day: 20, weight: null },
  { day: 21, weight: null },
  { day: 22, weight: null },
  { day: 23, weight: 176.5 },
  { day: 24, weight: null },
  { day: 25, weight: null },
  { day: 26, weight: null },
  { day: 27, weight: null },
  { day: 28, weight: null },
  { day: 29, weight: null },
  { day: 30, weight: 176.8 },
]

const loggedWeights = monthlyWeightData.filter((item): item is { day: number; weight: number } => item.weight !== null)
const currentWeight = loggedWeights[loggedWeights.length - 1]
const values = loggedWeights.map((item) => item.weight)
const chartMin = Math.floor((Math.min(...values) - 1) * 2) / 2
const chartMax = Math.ceil((Math.max(...values) + 1) * 2) / 2
const chartRange = chartMax - chartMin
const axisTicks = [chartMin, Math.round(((chartMin + chartMax) / 2) * 2) / 2, chartMax]

function WeightTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload: { day: number; weight: number | null } }>
}) {
  const datum = payload?.[0]?.payload
  const weight = datum?.weight

  if (!active || !datum || weight == null) return null

  return (
    <div className="rounded-lg border border-white/10 bg-[#1e1e1e] px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-[#8e8e93]">Day {datum.day}</p>
      <p className="text-sm font-semibold text-white">
        {weight.toFixed(1)} <span className="text-[10px] uppercase tracking-[0.1em] text-[#8e8e93]">lb</span>
      </p>
    </div>
  )
}

function WeightDot(props: any) {
  const { cx, cy, payload } = props

  if (payload.weight == null) return null

  return <circle cx={cx} cy={cy} r={3.5} fill={GARMIN_BLUE} stroke="#111111" strokeWidth={1.5} />
}

export function GarminWeightCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[18px] border border-white/10 bg-[#111111] text-white shadow-lg">
      <div className="rounded-t-[18px] bg-[#1e1e1e] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90">Garmin Connect</p>
          <p className="text-[11px] font-semibold text-white/70">Weight</p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4">
        <div className="grid min-h-0 flex-1 grid-cols-[28px_1fr] gap-1">
          <div className="relative pb-[24px] pt-[10px]">
            <div className="relative h-full w-full border-r border-[#2c2c2e] pr-1">
              {axisTicks.map((tick) => (
                <span
                  key={tick}
                  className="absolute right-1 translate-y-1/2 text-[9px] font-bold text-[#8e8e93]"
                  style={{ bottom: `${((tick - chartMin) / chartRange) * 100}%` }}
                >
                  {tick.toFixed(0)}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyWeightData} margin={{ top: 10, right: 4, bottom: 0, left: 0 }}>
                <XAxis
                  dataKey="day"
                  ticks={[1, 10, 20, 30]}
                  tickLine={false}
                  tickMargin={8}
                  axisLine={{ stroke: GARMIN_GRID_LINE }}
                  height={24}
                  tick={{ fill: GARMIN_MUTED, fontSize: 9, fontWeight: "bold" }}
                />
                <YAxis domain={[chartMin, chartMax]} hide />
                <Tooltip content={<WeightTooltip />} cursor={{ stroke: "#3a3a3c", strokeWidth: 1 }} />
                {axisTicks.map((tick) => (
                  <ReferenceLine key={tick} y={tick} stroke={GARMIN_GRID_LINE} />
                ))}
                <Line
                  type="linear"
                  dataKey="weight"
                  connectNulls
                  stroke={GARMIN_BLUE}
                  strokeWidth={2}
                  dot={<WeightDot />}
                  activeDot={{ r: 5, fill: GARMIN_BLUE, strokeWidth: 0 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-[#1a1a1a] px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8e8e93]">Current weight</p>
          <div className="mt-1 flex items-baseline gap-2">
            <p className="text-3xl font-extrabold leading-none tracking-[-0.04em] text-white">
              {currentWeight.weight.toFixed(1)}
            </p>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8e8e93]">lb</p>
          </div>
        </div>
      </div>
    </div>
  )
}
