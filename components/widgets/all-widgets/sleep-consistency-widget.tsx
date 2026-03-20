"use client"

import { sleepConsistencyData } from "@/lib/mock-data"
import { MetricTrendWidget } from "@/components/widgets/widget-primitives"

export function SleepConsistencyWidget() {
  const latest = sleepConsistencyData[sleepConsistencyData.length - 1].value

  return (
    <MetricTrendWidget
      value={`${latest}`}
      unit="%"
      label="sleep consistency"
      helper="weekly trend"
      points={sleepConsistencyData.map((item) => ({ label: item.day, value: item.value }))}
      color="hsl(280, 60%, 62%)"
      trendStyle="line"
    />
  )
}
