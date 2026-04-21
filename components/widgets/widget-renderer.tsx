"use client"

import type { ComponentType } from "react"
import { type WidgetId } from "@/lib/mock-data"
import { ENABLED_WIDGET_IDS } from "@/lib/widget-selection"
import { widgetRegistry } from "@/components/widgets/widget-registry"
import { useStudySession } from "@/hooks/use-study-session"
import { type DeviceType } from "@/components/study/types"

// Apple
import { AppleFullDayHrCard } from "@/components/development/widget-skins/custom/apple-full-day-hr-card"
import { AppleActivityHrCard } from "@/components/development/widget-skins/custom/apple-activity-hr-card"
import { AppleStepsCard } from "@/components/development/widget-skins/custom/apple-steps-card"

// Garmin
import { GarminFullDayHrCard } from "@/components/development/widget-skins/custom/garmin-full-day-hr-card"
import { GarminActivityHrCard } from "@/components/development/widget-skins/custom/garmin-activity-hr-card"
import { GarminStepsCard } from "@/components/development/widget-skins/custom/garmin-steps-card"

// Oura
import { OuraFullDayHrCard } from "@/components/development/widget-skins/custom/oura-full-day-hr-card"
import { OuraActivityHrCard } from "@/components/development/widget-skins/custom/oura-activity-hr-card"
import { OuraStepsCard } from "@/components/development/widget-skins/custom/oura-steps-card"

// Whoop
import { WhoopActivityHrCard } from "@/components/development/widget-skins/custom/whoop-activity-hr-card"
import { WhoopStepsCard } from "@/components/development/widget-skins/custom/whoop-steps-card"

const enabledWidgetSet = new Set<WidgetId>(ENABLED_WIDGET_IDS)

const deviceOverrides: Record<DeviceType, Partial<Record<WidgetId, ComponentType<any>>>> = {
  "apple-watch": {
    "heart-rate": AppleFullDayHrCard,
    "step-count": AppleStepsCard,
    "workout-log": AppleActivityHrCard,
  },
  garmin: {
    "heart-rate": GarminFullDayHrCard,
    "step-count": GarminStepsCard,
    "workout-log": GarminActivityHrCard,
  },
  oura: {
    "heart-rate": OuraFullDayHrCard,
    "step-count": OuraStepsCard,
    "workout-log": OuraActivityHrCard,
  },
  whoop: {
    "step-count": WhoopStepsCard,
    "workout-log": WhoopActivityHrCard,
    // Note: Whoop Full Day HR defaults to the standard generic HeartRateWidget which is already whoop styled.
  },
}

interface WidgetRendererProps {
  id: WidgetId
}

export function WidgetRenderer({ id }: WidgetRendererProps) {
  const { participant } = useStudySession()

  if (!enabledWidgetSet.has(id)) {
    return null
  }

  // Enforce sport category logic for menstrual cycle tracking
  if (id === "menstrual-cycle" && participant?.sportCategory === "mens") {
    return null
  }

  // Device-specific override
  if (participant?.deviceType) {
    const OverrideComponent = deviceOverrides[participant.deviceType][id]
    if (OverrideComponent) {
      return <OverrideComponent />
    }
  }

  // Default generic widget
  const WidgetComponent = widgetRegistry[id]
  return WidgetComponent ? <WidgetComponent /> : null
}
