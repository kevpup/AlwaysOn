"use client"

import { sleepEfficiencyData } from "@/lib/mock-data"
import { MetricTrendWidget } from "@/components/widgets/widget-primitives"

export function SleepEfficiencyWidget() {
  const latest = sleepEfficiencyData[sleepEfficiencyData.length - 1].value

  return (
    <MetricTrendWidget
      value={`${latest}`}
      unit="%"
      label="sleep efficiency"
      helper="weekly trend"
      points={sleepEfficiencyData.map((item) => ({ label: item.day, value: item.value }))}
      color="hsl(210, 75%, 62%)"
      trendStyle="line"
    />
  )
}
