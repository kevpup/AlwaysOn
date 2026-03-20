"use client"

import { timeInBedData } from "@/lib/mock-data"
import { MetricTrendWidget } from "@/components/widgets/widget-primitives"

export function TimeInBedWidget() {
  const latest = timeInBedData[timeInBedData.length - 1].hours

  return (
    <MetricTrendWidget
      value={latest.toFixed(1)}
      unit="hrs"
      label="time in bed"
      helper="weekly trend"
      points={timeInBedData.map((item) => ({ label: item.day, value: item.hours }))}
      color="hsl(200, 70%, 52%)"
      trendStyle="line"
    />
  )
}
