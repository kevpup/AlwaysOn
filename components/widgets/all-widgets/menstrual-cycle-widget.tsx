"use client"

const cycleMarkers = [
  { label: "Period", days: "1-5", tone: "bg-rose-500" },
  { label: "Follicular", days: "6-12", tone: "bg-sky-500" },
  { label: "Ovulation", days: "13-15", tone: "bg-amber-400" },
  { label: "Luteal", days: "16-28", tone: "bg-violet-500" },
]

export function MenstrualCycleWidget() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-3xl font-bold text-foreground">Day 18</p>
          <p className="text-sm text-muted-foreground">estimated cycle day</p>
        </div>
        <span className="rounded-md bg-violet-500/15 px-2 py-1 text-xs font-medium uppercase tracking-[0.14em] text-violet-300">
          draft
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center gap-3">
        <div className="grid grid-cols-4 gap-1.5">
          {cycleMarkers.map((marker) => (
            <div key={marker.label} className="overflow-hidden rounded-lg bg-secondary/60">
              <div className={`h-2 ${marker.tone}`} />
              <div className="px-2 py-2">
                <p className="truncate text-xs font-semibold text-foreground">{marker.label}</p>
                <p className="text-xs text-muted-foreground">Days {marker.days}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-secondary/50 px-3 py-2">
          <p className="text-sm font-medium text-foreground">Next period estimate</p>
          <p className="text-xs text-muted-foreground">about 10 days</p>
        </div>
      </div>
    </div>
  )
}
