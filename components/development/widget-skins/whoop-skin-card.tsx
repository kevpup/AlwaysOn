import { getToneColor, MiniBars, MiniLine, ScoreRing, SleepBands, TinyWorkoutGraph, ZoneStack } from "./skin-primitives"
import { type WidgetSkinProps } from "./types"

export function WhoopSkinCard({ metric }: WidgetSkinProps) {
  const color = getToneColor(metric)
  const graphColor = metric.visual === "line" || metric.visual === "workout" ? "#24a7ff" : color

  return (
    <div className="flex h-full flex-col rounded-[26px] border border-white/10 bg-[#050607] p-4 text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">WHOOP</p>
          <h3 className="mt-1 max-w-[190px] truncate text-lg font-semibold leading-tight">{metric.shortLabel}</h3>
        </div>
        <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em]" style={{ backgroundColor: `${color}22`, color }}>
          {metric.secondaryValue}
        </span>
      </div>

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-4xl font-black leading-none tracking-[-0.05em]" style={{ color }}>
              {metric.primaryValue}
            </p>
            <p className="mt-1 text-sm font-medium text-white/50">{metric.detail}</p>
          </div>
        </div>

        <div className="mt-4 min-h-0 flex-1 rounded-2xl bg-[#171a1f] p-3">
          {metric.visual === "score" || metric.visual === "ring" || metric.visual === "cycle" ? (
            <div className="flex h-full items-center justify-center">
              <ScoreRing
                color={color}
                size="lg"
                value={metric.primaryValue}
                label={metric.visual === "cycle" ? metric.secondaryValue : undefined}
              />
            </div>
          ) : metric.visual === "bars" ? (
            <MiniBars color={color} series={metric.series} />
          ) : metric.visual === "zones" ? (
            <div className="flex h-full flex-col justify-center gap-3">
              <ZoneStack series={metric.series} />
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/45">Zone distribution</p>
            </div>
          ) : metric.visual === "sleep" ? (
            <div className="flex h-full flex-col justify-center gap-2">
              <SleepBands series={metric.series} />
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/45">Sleep architecture</p>
            </div>
          ) : metric.visual === "workout" ? (
            <TinyWorkoutGraph color={graphColor} series={metric.series} />
          ) : (
            <MiniLine
              color={graphColor}
              fillArea
              referenceLineColor="#050607"
              series={metric.series}
              showReferenceLines
              strokeWidth={3}
            />
          )}
        </div>
      </div>
    </div>
  )
}
