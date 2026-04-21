import { getToneColor, MiniBars, MiniLine, ScoreRing, SleepBands, TinyWorkoutGraph, ZoneStack } from "./skin-primitives"
import { type WidgetSkinProps } from "./types"

export function AppleSkinCard({ metric }: WidgetSkinProps) {
  const color = getToneColor(metric)

  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">Health</p>
            <h3 className="mt-0.5 max-w-[190px] truncate text-lg font-semibold leading-tight">{metric.shortLabel}</h3>
          </div>
          <div className="h-9 w-9 rounded-full" style={{ background: `linear-gradient(135deg, ${color}, #ffffff)` }} />
        </div>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-4xl font-bold leading-none tracking-[-0.04em]" style={{ color }}>
              {metric.primaryValue}
            </p>
            <p className="mt-1 text-sm text-[#6e6e73]">{metric.secondaryValue}</p>
          </div>
          <p className="max-w-[88px] text-right text-xs font-medium leading-4 text-[#6e6e73]">{metric.detail}</p>
        </div>

        <div className="mt-5 min-h-0 flex-1">
          {metric.visual === "score" || metric.visual === "ring" || metric.visual === "cycle" ? (
            <div className="flex h-full items-center justify-center">
              <ScoreRing
                color={color}
                size="lg"
                value={metric.primaryValue}
                label={metric.visual === "cycle" ? metric.secondaryValue : "Today"}
              />
            </div>
          ) : metric.visual === "bars" ? (
            <MiniBars color={color} series={metric.series} rounded={false} />
          ) : metric.visual === "zones" ? (
            <div className="flex h-full flex-col justify-center gap-4">
              <ZoneStack series={metric.series} />
              <p className="text-xs text-[#6e6e73]">Time in heart rate zones</p>
            </div>
          ) : metric.visual === "sleep" ? (
            <SleepBands series={metric.series} soft />
          ) : metric.visual === "workout" ? (
            <TinyWorkoutGraph color={color} series={metric.series} />
          ) : (
            <MiniLine color={color} series={metric.series} strokeLinecap="square" strokeWidth={3.5} />
          )}
        </div>
      </div>
    </div>
  )
}
