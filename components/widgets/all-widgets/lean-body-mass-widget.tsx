"use client"

import { leanBodyMassData } from "@/lib/mock-data"
import { MetricTrendWidget } from "@/components/widgets/widget-primitives"

export function LeanBodyMassWidget() {
  const latest = leanBodyMassData[leanBodyMassData.length - 1].value

  return (
    <MetricTrendWidget
      value={latest.toFixed(1)}
      unit="lb"
      label="lean body mass"
      helper="monthly trend"
      points={leanBodyMassData.map((item) => ({ label: item.month, value: item.value }))}
      color="hsl(32, 88%, 58%)"
    />
  )
}
