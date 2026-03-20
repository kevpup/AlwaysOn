"use client"

export function RecoveryWidget() {
  const score = 72

  const getColor = (s: number) => {
    if (s >= 67) return "hsl(160, 60%, 45%)"
    if (s >= 34) return "hsl(45, 90%, 50%)"
    return "hsl(0, 72%, 51%)"
  }

  const getLabel = (s: number) => {
    if (s >= 67) return "Good"
    if (s >= 34) return "Moderate"
    return "Low"
  }

  const color = getColor(score)
  const circumference = 2 * Math.PI * 54
  const progress = (score / 100) * circumference
  const dashOffset = circumference - progress

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <svg width="130" height="130" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="hsl(220, 14%, 18%)"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 60 60)"
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold" style={{ color }}>{score}</span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">/ 100</span>
        </div>
      </div>
      <p className="mt-2 text-sm font-medium" style={{ color }}>
        {getLabel(score)}
      </p>
    </div>
  )
}
