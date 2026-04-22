"use client"

import {
  Bar,
  Cell,
  ComposedChart,
  Line,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const GARMIN_BLUE = "#007cc3"
const GARMIN_LIGHT_BLUE = "#48c7ff"
const GARMIN_GREEN = "#30d158"
const GARMIN_ORANGE = "#ff9500"
const GARMIN_GRID_LINE = "#2c2c2e"
const GARMIN_MUTED = "#8e8e93"

const trainingLoadTrend = [
  { day: "1", load: 940, ratio: 0.78 },
  { day: "3", load: 990, ratio: 0.92 },
  { day: "5", load: 1040, ratio: 1.08 },
  { day: "7", load: 1015, ratio: 1.02 },
  { day: "9", load: 1090, ratio: 1.24 },
  { day: "11", load: 1140, ratio: 1.42 },
  { day: "13", load: 1085, ratio: 1.31 },
  { day: "15", load: 1030, ratio: 1.18 },
  { day: "17", load: 960, ratio: 0.88 },
  { day: "19", load: 1010, ratio: 0.96 },
  { day: "21", load: 1065, ratio: 1.14 },
  { day: "23", load: 1125, ratio: 1.38 },
  { day: "25", load: 1170, ratio: 1.56 },
  { day: "27", load: 1105, ratio: 1.29 },
  { day: "29", load: 1035, ratio: 1.12 },
]

const latestTrainingLoad = trainingLoadTrend[trainingLoadTrend.length - 1]
const loadValues = trainingLoadTrend.map((item) => item.load)
const loadMin = Math.floor((Math.min(...loadValues) - 60) / 50) * 50
const loadMax = Math.ceil((Math.max(...loadValues) + 60) / 50) * 50
const loadRange = loadMax - loadMin
const loadTicks = [loadMin, Math.round((loadMin + loadMax) / 2), loadMax]

function getRatioColor(ratio: number) {
  if (ratio < 0.8) return GARMIN_LIGHT_BLUE
  if (ratio > 1.5) return GARMIN_ORANGE
  return GARMIN_GREEN
}

function TrainingLoadTooltip({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) {
  if (!active || !payload?.length) return null

  const load = payload.find((item) => item.dataKey === "load")?.value
  const ratio = payload.find((item) => item.dataKey === "ratio")?.value

  return (
    <div className="rounded-lg border border-white/10 bg-[#1e1e1e] px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-[#8e8e93]">Day {label}</p>
      <p className="text-sm font-semibold text-white">{load} absolute load</p>
      <p className="text-xs font-semibold text-[#8e8e93]">ACWR {ratio?.toFixed(2)}</p>
    </div>
  )
}

export function GarminTrainingLoadCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[18px] border border-white/10 bg-[#111111] text-white shadow-lg">
      <div className="rounded-t-[18px] bg-[#1e1e1e] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90">Garmin Connect</p>
          <p className="text-[11px] font-semibold text-white/70">Training Load</p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-[#8e8e93]">Absolute Load</p>
            <p className="mt-1 text-4xl font-extrabold leading-none tracking-[-0.05em] text-white">
              {latestTrainingLoad.load}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] px-3 py-2 text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8e8e93]">ACWR</p>
            <p className="mt-1 text-xl font-extrabold leading-none" style={{ color: getRatioColor(latestTrainingLoad.ratio) }}>
              {latestTrainingLoad.ratio.toFixed(2)}
            </p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#8e8e93]">Optimal 0.8-1.5</p>
          </div>
        </div>

        <div className="mb-2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white/75">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GARMIN_BLUE }} />
            Load
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GARMIN_GREEN }} />
            Optimal Ratio
          </span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[32px_1fr] gap-1">
          <div className="relative pb-[24px] pt-[10px]">
            <div className="relative h-full w-full border-r border-[#2c2c2e] pr-1">
              {loadTicks.map((tick) => (
                <span
                  key={tick}
                  className="absolute right-1 translate-y-1/2 text-[9px] font-bold text-[#8e8e93]"
                  style={{ bottom: `${((tick - loadMin) / loadRange) * 100}%` }}
                >
                  {tick}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trainingLoadTrend} margin={{ top: 10, right: 4, bottom: 0, left: 0 }}>
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={8}
                  axisLine={{ stroke: GARMIN_GRID_LINE }}
                  height={24}
                  interval={1}
                  tick={{ fill: GARMIN_MUTED, fontSize: 9, fontWeight: "bold" }}
                />
                <YAxis yAxisId="load" domain={[loadMin, loadMax]} hide />
                <YAxis yAxisId="ratio" domain={[0, 2]} hide />
                <Tooltip content={<TrainingLoadTooltip />} cursor={{ stroke: "#3a3a3c", strokeWidth: 1 }} />
                <ReferenceArea yAxisId="ratio" y1={0.8} y2={1.5} fill={GARMIN_GREEN} fillOpacity={0.08} />
                {[0.8, 1.5].map((ratio) => (
                  <ReferenceLine
                    key={ratio}
                    yAxisId="ratio"
                    y={ratio}
                    stroke={GARMIN_GREEN}
                    strokeOpacity={0.45}
                    strokeDasharray="4 4"
                  />
                ))}
                {loadTicks.map((tick) => (
                  <ReferenceLine key={tick} yAxisId="load" y={tick} stroke={GARMIN_GRID_LINE} />
                ))}
                <Bar yAxisId="ratio" dataKey="ratio" barSize={5} radius={[4, 4, 0, 0]}>
                  {trainingLoadTrend.map((item) => (
                    <Cell key={item.day} fill={getRatioColor(item.ratio)} fillOpacity={0.62} />
                  ))}
                </Bar>
                <Line
                  yAxisId="load"
                  type="linear"
                  dataKey="load"
                  stroke={GARMIN_BLUE}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4, fill: GARMIN_BLUE, strokeWidth: 0 }}
                  isAnimationActive={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
