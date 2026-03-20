"use client"

import { bedtimeData } from "@/lib/mock-data"
import { CompactListWidget } from "@/components/widgets/widget-primitives"

export function BedtimeWidget() {
  return (
    <CompactListWidget
      headline={bedtimeData[bedtimeData.length - 1].value}
      subline="latest bedtime"
      items={bedtimeData.map((item) => ({
        label: item.day,
        metaA: item.value,
      }))}
    />
  )
}
