"use client"

import { restingHeartRateData } from "@/lib/mock-data"
import { MetricTrendWidget } from "@/components/widgets/widget-primitives"

export function RestingHeartRateWidget() {
  const latest = restingHeartRateData[restingHeartRateData.length - 1].value

  return (
    <MetricTrendWidget
      value={`${latest}`}
      unit="bpm"
      label="latest resting HR"
      helper="7-day trend"
      points={restingHeartRateData.map((item) => ({ label: item.day, value: item.value }))}
      color="hsl(0, 72%, 51%)"
      trendStyle="line"
    />
  )
}
