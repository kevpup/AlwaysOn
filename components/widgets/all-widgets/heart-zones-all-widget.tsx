"use client"

import { heartZoneDistributionData } from "@/lib/mock-data"
import { DistributionWidget } from "@/components/widgets/widget-primitives"

export function HeartZonesAllWidget() {
  return <DistributionWidget items={heartZoneDistributionData} totalLabel="weekly minutes across all zones" />
}
