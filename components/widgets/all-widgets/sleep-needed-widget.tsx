"use client"

import { sleepNeededData } from "@/lib/mock-data"
import { MetricTrendWidget } from "@/components/widgets/widget-primitives"

export function SleepNeededWidget() {
  const latest = sleepNeededData[sleepNeededData.length - 1].hours

  return (
    <MetricTrendWidget
      value={latest.toFixed(1)}
      unit="hrs"
      label="sleep needed"
      helper="weekly trend"
      points={sleepNeededData.map((item) => ({ label: item.day, value: item.hours }))}
      color="hsl(220, 70%, 65%)"
      trendStyle="line"
    />
  )
}
