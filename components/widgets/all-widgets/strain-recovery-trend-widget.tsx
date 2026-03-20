"use client"

import { strainRecoveryTrendData } from "@/lib/mock-data"
import { RangeSummaryWidget } from "@/components/widgets/widget-primitives"

export function StrainRecoveryTrendWidget() {
  const latest = strainRecoveryTrendData[strainRecoveryTrendData.length - 1]

  return (
    <RangeSummaryWidget
      title="weekly balance"
      primaryValue={`${latest.strain.toFixed(1)}`}
      primaryLabel="latest strain"
      secondaryValue={`${latest.recovery}%`}
      secondaryLabel="latest recovery"
      color="hsl(160, 60%, 45%)"
      values={strainRecoveryTrendData.map((item) => item.recovery)}
    />
  )
}
