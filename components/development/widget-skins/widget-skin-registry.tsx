import { type ReactNode } from "react"

import { AppleSkinCard } from "./apple-skin-card"
import { AppleActivityHrCard } from "./custom/apple-activity-hr-card"
import { AppleFullDayHrCard } from "./custom/apple-full-day-hr-card"
import { AppleStepsCard } from "./custom/apple-steps-card"
import { GarminActivityHrCard } from "./custom/garmin-activity-hr-card"
import { GarminFullDayHrCard } from "./custom/garmin-full-day-hr-card"
import { GarminStepsCard } from "./custom/garmin-steps-card"
import { OuraActivityHrCard } from "./custom/oura-activity-hr-card"
import { OuraFullDayHrCard } from "./custom/oura-full-day-hr-card"
import { OuraStepsCard } from "./custom/oura-steps-card"
import { WhoopActivityHrCard } from "./custom/whoop-activity-hr-card"
import { WhoopStepsCard } from "./custom/whoop-steps-card"
import { GarminSkinCard } from "./garmin-skin-card"
import { OuraSkinCard } from "./oura-skin-card"
import { WhoopDashboardWidgetCard } from "./whoop-dashboard-widget-card"
import { type WidgetSkinProps } from "./types"
import { type WidgetDevelopmentPlatformId } from "@/lib/widget-development"

const platformSkinRegistry: Record<WidgetDevelopmentPlatformId, (props: WidgetSkinProps) => ReactNode> = {
  whoop: WhoopDashboardWidgetCard,
  apple: AppleSkinCard,
  garmin: GarminSkinCard,
  oura: OuraSkinCard,
}

const customSkinRegistry: Partial<Record<string, (props: WidgetSkinProps) => ReactNode>> = {
  "whoop:activity-hr-graph": WhoopActivityHrCard,
  "whoop:steps": WhoopStepsCard,
  "apple:activity-hr-graph": AppleActivityHrCard,
  "apple:full-day-hr": AppleFullDayHrCard,
  "apple:steps": AppleStepsCard,
  "garmin:activity-hr-graph": GarminActivityHrCard,
  "garmin:full-day-hr": GarminFullDayHrCard,
  "garmin:steps": GarminStepsCard,
  "oura:activity-hr-graph": OuraActivityHrCard,
  "oura:full-day-hr": OuraFullDayHrCard,
  "oura:steps": OuraStepsCard,
}

export function WidgetSkinCard(props: WidgetSkinProps) {
  const CustomSkinComponent = customSkinRegistry[`${props.platform}:${props.metric.id}`]

  if (CustomSkinComponent) {
    return <CustomSkinComponent {...props} />
  }

  const SkinComponent = platformSkinRegistry[props.platform]
  return <SkinComponent {...props} />
}
