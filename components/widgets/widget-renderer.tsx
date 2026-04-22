"use client"

import { defaultAppleWatchHrDataset } from "@/lib/apple-watch-hr-data"
import { type WidgetId } from "@/lib/mock-data"
import {
  widgetDevelopmentMetrics,
  type WidgetDevelopmentPlatformId,
} from "@/lib/widget-development"
import { WidgetSkinCard } from "@/components/development/widget-skins/widget-skin-registry"
import { type DeviceType, type SportCategory } from "@/components/study/types"

const studyDeviceToWidgetPlatform: Record<DeviceType, WidgetDevelopmentPlatformId> = {
  "apple-watch": "apple",
  garmin: "garmin",
  oura: "oura",
  whoop: "whoop",
}

const developmentMetricById = new Map(widgetDevelopmentMetrics.map((metric) => [metric.id, metric]))

interface WidgetRendererProps {
  deviceType: DeviceType
  id: WidgetId
  sportCategory: SportCategory
}

export function WidgetRenderer({ deviceType, id, sportCategory }: WidgetRendererProps) {
  const metric = developmentMetricById.get(id)

  if (!metric) {
    return null
  }

  if (id === "cycle-tracking" && sportCategory === "mens") {
    return null
  }

  return (
    <WidgetSkinCard
      hrDataset={defaultAppleWatchHrDataset}
      metric={metric}
      platform={studyDeviceToWidgetPlatform[deviceType]}
    />
  )
}
