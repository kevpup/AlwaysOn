"use client"

import { strengthActivityTimeData } from "@/lib/mock-data"
import { MetricTrendWidget } from "@/components/widgets/widget-primitives"

export function StrengthActivityTimeWidget() {
  const latest = strengthActivityTimeData[strengthActivityTimeData.length - 1].minutes

  return (
    <MetricTrendWidget
      value={`${latest}`}
      unit="min"
      label="strength activity time"
      helper="weekly trend"
      points={strengthActivityTimeData.map((item) => ({ label: item.day, value: item.minutes }))}
      color="hsl(12, 84%, 58%)"
    />
  )
}
