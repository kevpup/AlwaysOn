import { getToneColor, MiniBars, MiniLine, ScoreRing, SleepBands, TinyWorkoutGraph, ZoneStack } from "./skin-primitives"
import { type WidgetSkinProps } from "./types"

export function OuraSkinCard({ metric }: WidgetSkinProps) {
  const color = getToneColor(metric)

  return (
    <div className="flex h-full flex-col rounded-[28px] border border-[#e9ded0] bg-[#f7f1e8] p-4 text-[#2a211c] shadow-[0_14px_30px_rgba(77,56,39,0.14)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b7564]">Oura Today</p>
          <h3 className="mt-1 max-w-[190px] truncate text-lg font-semibold leading-tight">{metric.shortLabel}</h3>
        </div>
        <span className="rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-semibold text-[#8b7564]">
          {metric.detail}
        </span>
      </div>

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-4xl font-semibold leading-none tracking-[-0.05em]">{metric.primaryValue}</p>
            <p className="mt-1 text-sm font-medium text-[#8b7564]">{metric.secondaryValue}</p>
          </div>
          <div className="h-10 w-10 rounded-full" style={{ backgroundColor: `${color}24` }} />
        </div>

        <div className="mt-5 min-h-0 flex-1 rounded-[24px] bg-white/65 p-4">
          {metric.visual === "score" || metric.visual === "ring" || metric.visual === "cycle" ? (
            <div className="flex h-full items-center justify-center">
              <ScoreRing
                color={color}
                size="lg"
                value={metric.primaryValue}
                label={metric.visual === "cycle" ? metric.secondaryValue : metric.detail}
              />
            </div>
          ) : metric.visual === "bars" ? (
            <MiniBars color={color} series={metric.series} />
          ) : metric.visual === "zones" ? (
            <div className="flex h-full flex-col justify-center gap-4">
              <ZoneStack series={metric.series} />
              <p className="text-xs font-semibold text-[#8b7564]">Intensity balance</p>
            </div>
          ) : metric.visual === "sleep" ? (
            <SleepBands series={metric.series} soft />
          ) : metric.visual === "workout" ? (
            <TinyWorkoutGraph color={color} series={metric.series} />
          ) : (
            <MiniLine color={color} series={metric.series} strokeWidth={3.25} />
          )}
        </div>
      </div>
    </div>
  )
}
