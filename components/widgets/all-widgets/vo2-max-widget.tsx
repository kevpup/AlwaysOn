"use client"

import { vo2MaxData } from "@/lib/mock-data"
import { MetricTrendWidget } from "@/components/widgets/widget-primitives"

export function Vo2MaxWidget() {
  const latest = vo2MaxData[vo2MaxData.length - 1].value

  return (
    <MetricTrendWidget
      value={latest.toFixed(1)}
      unit="ml/kg/min"
      label="estimated VO2 max"
      helper="monthly trend"
      points={vo2MaxData.map((item) => ({ label: item.month, value: item.value }))}
      color="hsl(165, 62%, 48%)"
      trendStyle="line"
    />
  )
}
