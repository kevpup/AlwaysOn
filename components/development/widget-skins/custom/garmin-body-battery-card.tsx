"use client"

import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const GARMIN_BLUE = "#007cc3"
const GARMIN_GREEN = "#30d158"
const GARMIN_GRID_LINE = "#2c2c2e"
const GARMIN_MUTED = "#8e8e93"

const bodyBatteryDay = [
  { time: "6a", value: 72 },
  { time: "8a", value: 68 },
  { time: "10a", value: 62 },
  { time: "12p", value: 54 },
  { time: "2p", value: 46 },
  { time: "4p", value: 37 },
  { time: "6p", value: 29 },
  { time: "8p", value: 23 },
  { time: "10p", value: 18 },
]

const bodyBatteryHigh = Math.max(...bodyBatteryDay.map((item) => item.value))
const bodyBatteryLow = Math.min(...bodyBatteryDay.map((item) => item.value))

function BodyBatteryTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value?: number }>
  label?: string
}) {
  if (!active || !payload?.length || payload[0].value == null) return null

  return (
    <div className="rounded-lg border border-white/10 bg-[#1e1e1e] px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-[#8e8e93]">{label}</p>
      <p className="text-sm font-semibold text-white">
        {payload[0].value}
        <span className="ml-1 text-[10px] uppercase tracking-[0.1em] text-[#8e8e93]">body battery</span>
      </p>
    </div>
  )
}

export function GarminBodyBatteryCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[18px] border border-white/10 bg-[#111111] text-white shadow-lg">
      <div className="flex min-h-0 flex-1 flex-col p-4">
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8e8e93]">High</p>
            <p className="mt-1 text-4xl font-extrabold leading-none tracking-[-0.05em] text-white">
              {bodyBatteryHigh}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] px-4 py-3 text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8e8e93]">Low</p>
            <p className="mt-1 text-4xl font-extrabold leading-none tracking-[-0.05em] text-white">
              {bodyBatteryLow}
            </p>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[28px_1fr] gap-1">
          <div className="relative pb-[24px] pt-[10px]">
            <div className="relative h-full w-full border-r border-[#2c2c2e] pr-1">
              {[0, 50, 100].map((tick) => (
                <span
                  key={tick}
                  className="absolute right-1 translate-y-1/2 text-[9px] font-bold text-[#8e8e93]"
                  style={{ bottom: `${tick}%` }}
                >
                  {tick}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bodyBatteryDay} margin={{ top: 10, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="garminBodyBatteryFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={GARMIN_GREEN} stopOpacity={0.34} />
                    <stop offset="100%" stopColor={GARMIN_BLUE} stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  tickMargin={8}
                  axisLine={{ stroke: GARMIN_GRID_LINE }}
                  height={24}
                  interval={1}
                  tick={{ fill: GARMIN_MUTED, fontSize: 9, fontWeight: "bold" }}
                />
                <YAxis domain={[0, 100]} hide />
                <Tooltip content={<BodyBatteryTooltip />} cursor={{ stroke: "#3a3a3c", strokeWidth: 1 }} />
                {[0, 50, 100].map((tick) => (
                  <ReferenceLine key={tick} y={tick} stroke={GARMIN_GRID_LINE} />
                ))}
                <Area
                  type="linear"
                  dataKey="value"
                  stroke={GARMIN_BLUE}
                  strokeWidth={2.5}
                  fill="url(#garminBodyBatteryFill)"
                  dot={false}
                  activeDot={{ r: 4, fill: GARMIN_BLUE, strokeWidth: 0 }}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
