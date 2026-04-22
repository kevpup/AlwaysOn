"use client"

import {
  Bar,
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const LOAD_BLUE = "#5ac8fa"
const LOAD_PURPLE = "#af52de"

const monthlyTrainingLoad = [
  8.8, 10.4, 12.1, 9.7, 13.6, 15.8, 11.2,
  7.9, 9.5, 14.2, 16.1, 12.7, 10.8, 18.4,
  15.1, 13.2, 8.6, 11.9, 17.3, 19.1, 14.6,
  9.8, 12.4, 15.7, 13.9, 10.3, 16.8, 18.0,
  14.1, 15.8,
]

function getRollingAverage(values: number[], index: number) {
  const start = Math.max(0, index - 6)
  const window = values.slice(start, index + 1)

  return Number((window.reduce((sum, value) => sum + value, 0) / window.length).toFixed(1))
}

function getIntensityColor(value: number) {
  if (value >= 16) return LOAD_PURPLE
  if (value >= 12) return "#7b8cff"
  return LOAD_BLUE
}

const chartData = monthlyTrainingLoad.map((load, index) => ({
  day: index + 1,
  label: index === 0 || index === 9 || index === 19 || index === 29 ? String(index + 1) : "",
  load,
  rollingAverage: getRollingAverage(monthlyTrainingLoad, index),
}))

const latestLoad = monthlyTrainingLoad[monthlyTrainingLoad.length - 1]
const latestRollingAverage = chartData[chartData.length - 1].rollingAverage
const chartMax = Math.ceil((Math.max(...monthlyTrainingLoad) + 2) / 5) * 5

function TrainingLoadTooltip({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) {
  if (!active || !payload?.length) {
    return null
  }

  const load = payload.find((item) => item.dataKey === "load")?.value
  const rollingAverage = payload.find((item) => item.dataKey === "rollingAverage")?.value

  return (
    <div className="rounded-lg border border-black/10 bg-white px-3 py-2 shadow-lg">
      <p className="text-xs text-[#6e6e73]">Day {label}</p>
      <p className="text-sm font-semibold text-[#1d1d1f]">{load?.toFixed(1)} daily strain</p>
      <p className="text-xs font-medium text-[#6e6e73]">{rollingAverage?.toFixed(1)} weekly avg</p>
    </div>
  )
}

export function AppleTrainingLoadCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white px-3 pb-2.5 pt-3 shadow-sm">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">Training Load</p>
            <p className="mt-0.5 text-3xl font-bold leading-none tracking-[-0.04em]" style={{ color: LOAD_PURPLE }}>
              {latestLoad.toFixed(1)}
            </p>
            <p className="mt-0.5 text-[10px] text-[#6e6e73]">daily strain</p>
          </div>

          <div className="text-right">
            <p className="text-[11px] font-semibold lowercase text-[#6e6e73]">rolling avg</p>
            <p className="mt-0.5 text-base font-semibold leading-none text-[#1d1d1f]">
              {latestRollingAverage.toFixed(1)}
            </p>
            <p className="mt-0.5 text-[10px] text-[#6e6e73]">7 days</p>
          </div>
        </div>

        <div className="min-h-0 flex-1 rounded-[18px] bg-[#f8f8fb] px-1 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
              <XAxis
                dataKey="label"
                tick={{ fontSize: 9, fontWeight: 600, fill: "#86868b" }}
                tickLine={false}
                axisLine={false}
                interval={0}
                height={20}
              />
              <YAxis domain={[0, chartMax]} hide />
              <Tooltip content={<TrainingLoadTooltip />} cursor={{ fill: "rgba(90, 200, 250, 0.08)" }} />
              <Bar dataKey="load" barSize={5} radius={[4, 4, 0, 0]}>
                {chartData.map((item) => (
                  <Cell key={item.day} fill={getIntensityColor(item.load)} fillOpacity={0.46} />
                ))}
              </Bar>
              <Line
                type="monotone"
                dataKey="rollingAverage"
                stroke={LOAD_PURPLE}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 4, fill: LOAD_PURPLE, stroke: "white", strokeWidth: 2 }}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
