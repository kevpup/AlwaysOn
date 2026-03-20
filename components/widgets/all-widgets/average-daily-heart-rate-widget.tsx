"use client"

import { averageDailyHeartRateData } from "@/lib/mock-data"
import { MetricTrendWidget } from "@/components/widgets/widget-primitives"

export function AverageDailyHeartRateWidget() {
  const latest = averageDailyHeartRateData[averageDailyHeartRateData.length - 1].value

  return (
    <MetricTrendWidget
      value={`${latest}`}
      unit="bpm"
      label="average daily heart rate"
      helper="7-day trend"
      points={averageDailyHeartRateData.map((item) => ({ label: item.day, value: item.value }))}
      color="hsl(355, 80%, 61%)"
      trendStyle="line"
    />
  )
}
