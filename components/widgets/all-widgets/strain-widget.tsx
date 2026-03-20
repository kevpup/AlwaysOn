"use client"

export function StrainWidget() {
  const strain = 14.2
  const max = 21
  const pct = (strain / max) * 100

  const getColor = (s: number) => {
    if (s >= 18) return "hsl(0, 72%, 51%)"
    if (s >= 14) return "hsl(35, 90%, 55%)"
    if (s >= 10) return "hsl(45, 90%, 50%)"
    return "hsl(160, 60%, 45%)"
  }

  const color = getColor(strain)

  // Semicircular gauge
  const radius = 54
  const semicircumference = Math.PI * radius
  const progress = (pct / 100) * semicircumference
  const dashOffset = semicircumference - progress

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <svg width="140" height="85" viewBox="0 0 140 85">
          <path
            d="M 10 80 A 54 54 0 0 1 130 80"
            fill="none"
            stroke="hsl(220, 14%, 18%)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 10 80 A 54 54 0 0 1 130 80"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={semicircumference}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute bottom-0 flex flex-col items-center">
          <span className="text-3xl font-bold" style={{ color }}>
            {strain}
          </span>
        </div>
      </div>
      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
        <span>0</span>
        <div className="h-1 w-20 rounded-full bg-secondary">
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, backgroundColor: color, transition: "width 0.6s ease" }}
          />
        </div>
        <span>{max}</span>
      </div>
    </div>
  )
}
