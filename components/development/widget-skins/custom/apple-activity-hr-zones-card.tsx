"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const zoneSummary = [
  { zone: "Zone 1", range: "Warm-up", minutes: 18, color: "#4cd964" },
  { zone: "Zone 2", range: "Endurance", minutes: 26, color: "#5ac8fa" },
  { zone: "Zone 3", range: "Tempo", minutes: 34, color: "#ffcc00" },
  { zone: "Zone 4", range: "Hard", minutes: 42, color: "#ff9500" },
  { zone: "Zone 5", range: "Peak", minutes: 22, color: "#ff3b30" },
] as const

const totalMinutes = zoneSummary.reduce((sum, item) => sum + item.minutes, 0)

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) {
    return `${remainingMinutes}m`
  }

  return `${hours}h ${remainingMinutes}m`
}

export function AppleActivityHrZonesCard(_props: WidgetSkinProps) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-black/5 bg-[#f5f5f7] p-3 text-[#1d1d1f] shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73]">Heart Rate Zones</p>
            <h3 className="mt-0.5 text-[26px] font-bold leading-none tracking-[-0.05em]">
              {formatMinutes(totalMinutes)}
            </h3>
            <p className="mt-1 text-xs font-medium text-[#6e6e73]">Total activity time</p>
          </div>

          <div className="rounded-full bg-[#f2f2f7] px-3 py-1 text-[11px] font-semibold text-[#6e6e73]">
            Today
          </div>
        </div>

        <div className="mt-5 flex h-4 overflow-hidden rounded-full bg-[#f2f2f7]">
          {zoneSummary.map((item) => (
            <div
              key={item.zone}
              className="h-full"
              style={{
                width: `${(item.minutes / totalMinutes) * 100}%`,
                backgroundColor: item.color,
              }}
            />
          ))}
        </div>

        <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1 divide-y divide-[#e5e5ea]">
          {zoneSummary.map((item) => (
            <div key={item.zone} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold leading-tight tracking-[-0.02em]">{item.zone}</p>
                  <p className="truncate text-[11px] font-medium leading-tight text-[#86868b]">{item.range}</p>
                </div>
              </div>
              <p className="text-[15px] font-semibold leading-none tracking-[-0.03em]">{formatMinutes(item.minutes)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
