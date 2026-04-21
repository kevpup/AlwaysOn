import {
  type WidgetDevelopmentMetric,
  type WidgetDevelopmentPlatformId,
} from "@/lib/widget-development"
import { type AppleWatchHrDataset } from "@/lib/apple-watch-hr-data"

export interface WidgetSkinProps {
  hrDataset?: AppleWatchHrDataset
  metric: WidgetDevelopmentMetric
  platform: WidgetDevelopmentPlatformId
}
