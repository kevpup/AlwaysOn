"use client"

import { heartZoneDistributionData } from "@/lib/mock-data"
import { DistributionWidget } from "@/components/widgets/widget-primitives"

export function HeartZonesLowWidget() {
  const items = heartZoneDistributionData.filter((item) => ["Z1", "Z2", "Z3"].includes(item.label))
  return <DistributionWidget items={items} totalLabel="weekly minutes in zones 1-3" />
}
