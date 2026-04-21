import { type WidgetConfig, type WidgetId } from "@/lib/mock-data"
import { type SportCategory } from "@/components/study/types"
import { widgetDevelopmentMetrics } from "@/lib/widget-development"

export const allWidgets: WidgetConfig[] = widgetDevelopmentMetrics.map((metric) => ({
  id: metric.id as WidgetId,
  title: metric.label,
}))

// Enable all 21 core widgets
export const ENABLED_WIDGET_IDS: WidgetId[] = widgetDevelopmentMetrics.map(
  (metric) => metric.id as WidgetId
)

export function getEnabledWidgets(enabledIds: WidgetId[] = ENABLED_WIDGET_IDS) {
  return allWidgets.filter((widget) => enabledIds.includes(widget.id))
}

export const defaultWidgets = getEnabledWidgets()
export const cycleTrackingWidget = allWidgets.find((widget) => widget.id === "cycle-tracking")

export function getWidgetsForSportCategory(sportCategory: SportCategory | null | undefined) {
  return defaultWidgets.filter((widget) => sportCategory === "womens" || widget.id !== "cycle-tracking")
}
