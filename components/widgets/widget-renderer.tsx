"use client"

import { type WidgetId } from "@/lib/mock-data"
import { ENABLED_WIDGET_IDS } from "@/lib/widget-selection"
import { widgetRegistry } from "@/components/widgets/widget-registry"

const enabledWidgetSet = new Set<WidgetId>(ENABLED_WIDGET_IDS)

interface WidgetRendererProps {
  id: WidgetId
}

export function WidgetRenderer({ id }: WidgetRendererProps) {
  if (!enabledWidgetSet.has(id)) {
    return null
  }

  const WidgetComponent = widgetRegistry[id]
  return WidgetComponent ? <WidgetComponent /> : null
}
