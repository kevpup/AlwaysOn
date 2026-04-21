import { getToneColor, MiniBars, MiniLine, ScoreRing, SleepBands, TinyWorkoutGraph, ZoneStack } from "./skin-primitives"
import { type WidgetSkinProps } from "./types"

export function GarminSkinCard({ metric }: WidgetSkinProps) {
  const color = getToneColor(metric)

  return (
    <div className="flex h-full flex-col rounded-[18px] border border-[#d8e1e8] bg-white text-[#14212b] shadow-[0_10px_26px_rgba(20,33,43,0.14)]">
      <div className="rounded-t-[18px] bg-[#007cc3] px-4 py-2 text-white">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Garmin Connect</p>
          <p className="text-[10px] font-semibold opacity-80">Glance</p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="max-w-[190px] truncate text-lg font-bold leading-tight">{metric.shortLabel}</h3>
            <p className="mt-1 text-xs font-medium text-[#607080]">{metric.detail}</p>
          </div>
          <div className="rounded-md bg-[#eef7fc] px-2 py-1 text-[10px] font-bold text-[#007cc3]">
            {metric.secondaryValue}
          </div>
        </div>

        <div className="mt-4 flex min-h-0 flex-1 flex-col">
          <div className="flex items-end justify-between gap-4">
            <p className="text-4xl font-extrabold leading-none tracking-[-0.05em]" style={{ color }}>
              {metric.primaryValue}
            </p>
            <div className="h-2 w-24 rounded-full bg-[#e5edf3]">
              <div className="h-full rounded-full" style={{ width: "68%", backgroundColor: color }} />
            </div>
          </div>

          <div className="mt-4 min-h-0 flex-1">
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
              <MiniBars color={color} series={metric.series} rounded={false} />
            ) : metric.visual === "zones" ? (
              <div className="flex h-full flex-col justify-center gap-4">
                <ZoneStack series={metric.series} />
                <p className="text-xs font-semibold text-[#607080]">Training zones</p>
              </div>
            ) : metric.visual === "sleep" ? (
              <SleepBands series={metric.series} />
            ) : metric.visual === "workout" ? (
              <TinyWorkoutGraph color={color} series={metric.series} />
            ) : (
              <MiniLine color={color} series={metric.series} showReferenceLines strokeWidth={3.25} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
