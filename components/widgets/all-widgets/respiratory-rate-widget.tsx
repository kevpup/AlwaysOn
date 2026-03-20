"use client"

import { respiratoryRateData } from "@/lib/mock-data"
import { MetricTrendWidget } from "@/components/widgets/widget-primitives"

export function RespiratoryRateWidget() {
  const latest = respiratoryRateData[respiratoryRateData.length - 1].value

  return (
    <MetricTrendWidget
      value={latest.toFixed(1)}
      unit="rpm"
      label="overnight respiratory rate"
      helper="weekly trend"
      points={respiratoryRateData.map((item) => ({ label: item.day, value: item.value }))}
      color="hsl(210, 70%, 60%)"
      trendStyle="line"
    />
  )
}
