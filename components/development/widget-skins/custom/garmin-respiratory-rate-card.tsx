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
const GARMIN_LIGHT_BLUE = "#48c7ff"
const GARMIN_GRID_LINE = "#2c2c2e"
const GARMIN_MUTED = "#8e8e93"

const respiratoryTrend = [
  { day: "Mon", sleep: 13.7, awake: 15.1 },
  { day: "Tue", sleep: 13.5, awake: 15.4 },
  { day: "Wed", sleep: 13.8, awake: 15.2 },
  { day: "Thu", sleep: 14.0, awake: 15.8 },
  { day: "Fri", sleep: 13.6, awake: 15.0 },
  { day: "Sat", sleep: 13.9, awake: 15.6 },
  { day: "Sun", sleep: 13.8, awake: 15.3 },
]

const latestRespiratoryRate = respiratoryTrend[respiratoryTrend.length - 1]
const respiratoryValues = respiratoryTrend.flatMap((item) => [item.sleep, item.awake])
const chartMin = Math.floor((Math.min(...respiratoryValues) - 0.5) * 2) / 2
const chartMax = Math.ceil((Math.max(...respiratoryValues) + 0.5) * 2) / 2
const chartRange = chartMax - chartMin
const axisTicks = [chartMin, Math.round(((chartMin + chartMax) / 2) * 10) / 10, chartMax]

function RespiratoryRateTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ dataKey?: string; value?: number; color?: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-white/10 bg-[#1e1e1e] px-3 py-2 shadow-lg">
      <p className="mb-1 text-xs font-medium text-[#8e8e93]">{label}</p>
      {payload.map((item) => (
        <p key={item.dataKey} className="text-sm font-semibold text-white">
          <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
          {item.dataKey === "sleep" ? "Sleep" : "Awake"} {item.value?.toFixed(1)}
          <span className="ml-1 text-[10px] uppercase tracking-[0.1em] text-[#8e8e93]">br/min</span>
        </p>
      ))}
    </div>
  )
}

export function GarminRespiratoryRateCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[18px] border border-white/10 bg-[#111111] text-white shadow-lg">
      <div className="flex min-h-0 flex-1 flex-col p-4">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#8e8e93]">Sleep Avg</p>
            <div className="mt-1 flex items-baseline gap-2">
              <p className="text-4xl font-extrabold leading-none tracking-[-0.05em] text-white">
                {latestRespiratoryRate.sleep.toFixed(1)}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8e8e93]">br/min</p>
            </div>
          </div>

          <div className="space-y-1 rounded-2xl border border-white/10 bg-[#1a1a1a] px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GARMIN_BLUE }} />
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/75">Sleep</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GARMIN_LIGHT_BLUE }} />
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/75">Awake</p>
            </div>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[30px_1fr] gap-1">
          <div className="relative pb-[24px] pt-[10px]">
            <div className="relative h-full w-full border-r border-[#2c2c2e] pr-1">
              {axisTicks.map((tick) => (
                <span
                  key={tick}
                  className="absolute right-1 translate-y-1/2 text-[9px] font-bold text-[#8e8e93]"
                  style={{ bottom: `${((tick - chartMin) / chartRange) * 100}%` }}
                >
                  {tick.toFixed(1)}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={respiratoryTrend} margin={{ top: 10, right: 4, bottom: 0, left: 0 }}>
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={8}
                  axisLine={{ stroke: GARMIN_GRID_LINE }}
                  height={24}
                  interval={0}
                  tick={{ fill: GARMIN_MUTED, fontSize: 9, fontWeight: "bold" }}
                />
                <YAxis domain={[chartMin, chartMax]} hide />
                <Tooltip content={<RespiratoryRateTooltip />} cursor={{ stroke: "#3a3a3c", strokeWidth: 1 }} />
                {axisTicks.map((tick) => (
                  <ReferenceLine key={tick} y={tick} stroke={GARMIN_GRID_LINE} />
                ))}
                <Line
                  type="linear"
                  dataKey="sleep"
                  stroke={GARMIN_BLUE}
                  strokeWidth={2.25}
                  dot={false}
                  activeDot={{ r: 4, fill: GARMIN_BLUE, strokeWidth: 0 }}
                  isAnimationActive={false}
                />
                <Line
                  type="linear"
                  dataKey="awake"
                  stroke={GARMIN_LIGHT_BLUE}
                  strokeWidth={2.25}
                  dot={false}
                  activeDot={{ r: 4, fill: GARMIN_LIGHT_BLUE, strokeWidth: 0 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
