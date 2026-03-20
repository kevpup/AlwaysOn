"use client"

import { heartZoneDistributionData } from "@/lib/mock-data"
import { DistributionWidget } from "@/components/widgets/widget-primitives"

export function HeartZonesHighWidget() {
  const items = heartZoneDistributionData.filter((item) => ["Z4", "Z5"].includes(item.label))
  return <DistributionWidget items={items} totalLabel="weekly minutes in zones 4-5" />
}
