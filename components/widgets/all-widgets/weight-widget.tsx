"use client"

import { weightData } from "@/lib/mock-data"
import { MetricTrendWidget } from "@/components/widgets/widget-primitives"

export function WeightWidget() {
  const latest = weightData[weightData.length - 1].value

  return (
    <MetricTrendWidget
      value={latest.toFixed(1)}
      unit="lb"
      label="body weight"
      helper="monthly trend"
      points={weightData.map((item) => ({ label: item.month, value: item.value }))}
      color="hsl(26, 84%, 58%)"
      trendStyle="line"
    />
  )
}
