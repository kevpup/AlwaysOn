"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"
import { defaultAppleWatchHrDataset } from "@/lib/apple-watch-hr-data"
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const CHART_MIN = 40
const CHART_MAX = 140

function CustomTooltip({ active, payload }: { active?: boolean; payload?: any[] }) {
  if (active && payload && payload.length) {
    const rangeData = payload.find(p => p.dataKey === "range")?.value
    const averageData = payload.find(p => p.dataKey === "average")?.value
    const label = payload[0].payload.label

    return (
      <div className="rounded-lg border border-white/10 bg-[#1e1e1e] px-3 py-2 shadow-lg">
        <p className="mb-1 text-[10px] font-semibold text-[#8e8e93]">{label}</p>
        <p className="text-xs font-semibold text-white">
          {rangeData ? `${rangeData[0]}-${rangeData[1]}` : "-"} <span className="text-[10px] uppercase tracking-[0.1em] text-[#8e8e93]">range</span>
        </p>
        <p className="text-xs font-semibold text-white">
          {averageData || "-"} <span className="text-[10px] uppercase tracking-[0.1em] text-[#8e8e93]">avg</span>
        </p>
      </div>
    )
  }
  return null
}

const CustomBar = (props: any) => {
  const { x, y, width, height } = props
  if (height <= 0) return null
  
  return (
    <rect
      x={x + width / 2 - 3}
      y={y}
      width={6}
      height={Math.max(height, 5)}
      fill="rgba(255,255,255,0.3)"
      rx={3}
    />
  )
}

export function OuraFullDayHrCard({ hrDataset = defaultAppleWatchHrDataset }: WidgetSkinProps) {
  const chartData = hrDataset.hourlyRanges.map(r => ({
    label: r.label,
    range: [r.low, r.high],
    average: r.average
  }))

  return (
    <div className="relative flex h-full overflow-hidden rounded-[28px] border border-white/15 bg-[#1e7eaa] p-4 text-white shadow-[0_16px_38px_rgba(18,84,119,0.28)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.46),transparent_34%),radial-gradient(circle_at_72%_8%,rgba(137,214,255,0.34),transparent_30%),linear-gradient(145deg,#9edcf4_0%,#4ca6cf_42%,#145d87_100%)]" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />

      <div className="relative flex h-full w-full flex-col">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/72">Oura</p>
            <h3 className="mt-1 text-lg font-semibold leading-tight">Heart Rate</h3>
            <p className="mt-2 text-3xl font-semibold leading-none tracking-[-0.04em]">
              {hrDataset.daySummary.min}-{hrDataset.daySummary.max}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">bpm range</p>
          </div>

          <div className="text-right">
            <p className="text-3xl font-semibold leading-none tracking-[-0.04em]">{hrDataset.lastReading}</p>
            <p className="mt-1 max-w-[76px] text-[10px] font-semibold leading-3 text-white/70">last HR reading</p>
          </div>
        </div>

        <div className="relative min-h-0 flex-1 rounded-[24px] bg-white/12 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
          <div className="absolute bottom-7 left-4 right-4 top-4">
            {/* Y-axis labels */}
            {[120, 90, 60].map((tick) => (
              <div key={tick} className="absolute inset-x-0 border-t border-white/14" style={{ top: `${88 - ((tick - CHART_MIN) / (CHART_MAX - CHART_MIN)) * 76}%` }}>
                <span className="absolute -top-3.5 -left-3 text-[8.5px] font-medium text-white/50">{tick}</span>
              </div>
            ))}

            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 12, right: 0, bottom: 12, left: 0 }}>
                <XAxis dataKey="label" hide />
                <YAxis domain={[CHART_MIN, CHART_MAX]} hide />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
                
                <Bar
                  dataKey="range"
                  shape={<CustomBar />}
                  isAnimationActive={false}
                />
                
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="rgba(255,255,255,0.92)"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4, fill: "white", strokeWidth: 0 }}
                  isAnimationActive={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-1.5 left-4 right-4 flex justify-between text-[8.5px] font-medium text-white/50">
            <span>12A</span>
            <span>6A</span>
            <span>12P</span>
            <span>6P</span>
            <span>12A</span>
          </div>
        </div>
      </div>
    </div>
  )
}
