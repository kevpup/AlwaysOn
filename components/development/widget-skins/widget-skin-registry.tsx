import { type ReactNode } from "react"

import { AppleSkinCard } from "./apple-skin-card"
import { AppleActivityHrCard } from "./custom/apple-activity-hr-card"
import { AppleActivityHrZonesCard } from "./custom/apple-activity-hr-zones-card"
import { AppleBloodOxygenCard } from "./custom/apple-blood-oxygen-card"
import { AppleCaloriesCard } from "./custom/apple-calories-card"
import { AppleCycleTrackingCard } from "./custom/apple-cycle-tracking-card"
import { AppleFullDayHrCard } from "./custom/apple-full-day-hr-card"
import { AppleHrvCard } from "./custom/apple-hrv-card"
import { AppleReadinessVitalsCard } from "./custom/apple-readiness-vitals-card"
import { AppleRestingHrCard } from "./custom/apple-resting-hr-card"
import { AppleRespiratoryRateCard } from "./custom/apple-respiratory-rate-card"
import { AppleSleepHoursCard } from "./custom/apple-sleep-hours-card"
import { AppleSleepScoreCard } from "./custom/apple-sleep-score-card"
import { AppleSleepStagesCard } from "./custom/apple-sleep-stages-card"
import { AppleStepsCard } from "./custom/apple-steps-card"
import { AppleTemperatureDeviationCard } from "./custom/apple-temperature-deviation-card"
import { AppleTotalSleepTimeCard } from "./custom/apple-total-sleep-time-card"
import { AppleTrainingLoadCard } from "./custom/apple-training-load-card"
import { AppleVo2MaxCard } from "./custom/apple-vo2-max-card"
import { AppleWeightCard } from "./custom/apple-weight-card"
import { AppleWorkoutHistoryCard } from "./custom/apple-workout-history-card"
import { AppleWorkoutMinutesCard } from "./custom/apple-workout-minutes-card"
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
  "apple:activity-hr-zones": AppleActivityHrZonesCard,
  "apple:blood-oxygen": AppleBloodOxygenCard,
  "apple:calories-active-energy": AppleCaloriesCard,
  "apple:cycle-tracking": AppleCycleTrackingCard,
  "apple:full-day-hr": AppleFullDayHrCard,
  "apple:hrv-status": AppleHrvCard,
  "apple:recovery-readiness": AppleReadinessVitalsCard,
  "apple:resting-hr": AppleRestingHrCard,
  "apple:respiratory-rate": AppleRespiratoryRateCard,
  "apple:sleep-hours": AppleSleepHoursCard,
  "apple:sleep-score": AppleSleepScoreCard,
  "apple:sleep-stages-cycles": AppleSleepStagesCard,
  "apple:steps": AppleStepsCard,
  "apple:temperature-deviation": AppleTemperatureDeviationCard,
  "apple:total-sleep-time": AppleTotalSleepTimeCard,
  "apple:training-load": AppleTrainingLoadCard,
  "apple:vo2-max": AppleVo2MaxCard,
  "apple:weight": AppleWeightCard,
  "apple:activity-workout-minutes": AppleWorkoutMinutesCard,
  "apple:full-workout-report": AppleWorkoutHistoryCard,
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
