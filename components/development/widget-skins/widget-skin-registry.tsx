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
import { GarminBloodOxygenCard } from "./custom/garmin-blood-oxygen-card"
import { GarminBodyBatteryCard } from "./custom/garmin-body-battery-card"
import { GarminCaloriesCard } from "./custom/garmin-calories-card"
import { GarminCycleTrackingCard } from "./custom/garmin-cycle-tracking-card"
import { GarminFullDayHrCard } from "./custom/garmin-full-day-hr-card"
import { GarminHrvCard } from "./custom/garmin-hrv-card"
import { GarminRestingHrCard } from "./custom/garmin-resting-hr-card"
import { GarminRespiratoryRateCard } from "./custom/garmin-respiratory-rate-card"
import { GarminSleepReportCard } from "./custom/garmin-sleep-report-card"
import { GarminSleepScoreCard } from "./custom/garmin-sleep-score-card"
import { GarminStepsCard } from "./custom/garmin-steps-card"
import { GarminTemperatureDeviationCard } from "./custom/garmin-temperature-deviation-card"
import { GarminTrainingLoadCard } from "./custom/garmin-training-load-card"
import { GarminVo2MaxCard } from "./custom/garmin-vo2-max-card"
import { GarminWeightCard } from "./custom/garmin-weight-card"
import { GarminWorkoutReportCard } from "./custom/garmin-workout-report-card"
import { OuraActivityHrCard } from "./custom/oura-activity-hr-card"
import { OuraBloodOxygenCard } from "./custom/oura-blood-oxygen-card"
import { OuraCaloriesCard } from "./custom/oura-calories-card"
import { OuraCycleTrackingCard } from "./custom/oura-cycle-tracking-card"
import { OuraFullDayHrCard } from "./custom/oura-full-day-hr-card"
import { OuraHrvCard } from "./custom/oura-hrv-card"
import { OuraReadinessCard } from "./custom/oura-readiness-card"
import { OuraRestingHrCard } from "./custom/oura-resting-hr-card"
import { OuraRespiratoryRateCard } from "./custom/oura-respiratory-rate-card"
import { OuraSleepReportCard } from "./custom/oura-sleep-report-card"
import { OuraSleepScoreCard } from "./custom/oura-sleep-score-card"
import { OuraStepsCard } from "./custom/oura-steps-card"
import { OuraStressCard } from "./custom/oura-stress-card"
import { OuraTemperatureDeviationCard } from "./custom/oura-temperature-deviation-card"
import { OuraVo2MaxCard } from "./custom/oura-vo2-max-card"
import { OuraWorkoutReportCard } from "./custom/oura-workout-report-card"
import { WhoopActivityHrCard } from "./custom/whoop-activity-hr-card"
import { WhoopBloodOxygenCard } from "./custom/whoop-blood-oxygen-card"
import { WhoopCaloriesCard } from "./custom/whoop-calories-card"
import { WhoopHrvCard } from "./custom/whoop-hrv-card"
import { WhoopRecoveryCard } from "./custom/whoop-recovery-card"
import { WhoopRespiratoryRateCard } from "./custom/whoop-respiratory-rate-card"
import { WhoopSleepReportCard } from "./custom/whoop-sleep-report-card"
import { WhoopSleepScoreCard } from "./custom/whoop-sleep-score-card"
import { WhoopSleepTimeCard } from "./custom/whoop-sleep-time-card"
import { WhoopStepsCard } from "./custom/whoop-steps-card"
import { WhoopStrainCard } from "./custom/whoop-strain-card"
import { WhoopTemperatureCard } from "./custom/whoop-temperature-card"
import { WhoopVo2MaxCard } from "./custom/whoop-vo2-max-card"
import { WhoopWeightCard } from "./custom/whoop-weight-card"
import { WhoopWorkoutReportCard } from "./custom/whoop-workout-report-card"
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
  "whoop:blood-oxygen": WhoopBloodOxygenCard,
  "whoop:calories-active-energy": WhoopCaloriesCard,
  "whoop:hrv-status": WhoopHrvCard,
  "whoop:recovery-readiness": WhoopRecoveryCard,
  "whoop:respiratory-rate": WhoopRespiratoryRateCard,
  "whoop:sleep-score": WhoopSleepScoreCard,
  "whoop:sleep-hours": WhoopSleepTimeCard,
  "whoop:total-sleep-time": WhoopSleepReportCard,
  "whoop:steps": WhoopStepsCard,
  "whoop:temperature-deviation": WhoopTemperatureCard,
  "whoop:training-load": WhoopStrainCard,
  "whoop:vo2-max": WhoopVo2MaxCard,
  "whoop:weight": WhoopWeightCard,
  "whoop:full-workout-report": WhoopWorkoutReportCard,
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
  "garmin:blood-oxygen": GarminBloodOxygenCard,
  "garmin:calories-active-energy": GarminCaloriesCard,
  "garmin:cycle-tracking": GarminCycleTrackingCard,
  "garmin:full-day-hr": GarminFullDayHrCard,
  "garmin:hrv-status": GarminHrvCard,
  "garmin:recovery-readiness": GarminBodyBatteryCard,
  "garmin:resting-hr": GarminRestingHrCard,
  "garmin:respiratory-rate": GarminRespiratoryRateCard,
  "garmin:sleep-score": GarminSleepScoreCard,
  "garmin:total-sleep-time": GarminSleepReportCard,
  "garmin:steps": GarminStepsCard,
  "garmin:temperature-deviation": GarminTemperatureDeviationCard,
  "garmin:training-load": GarminTrainingLoadCard,
  "garmin:vo2-max": GarminVo2MaxCard,
  "garmin:weight": GarminWeightCard,
  "garmin:full-workout-report": GarminWorkoutReportCard,
  "oura:activity-hr-graph": OuraActivityHrCard,
  "oura:blood-oxygen": OuraBloodOxygenCard,
  "oura:calories-active-energy": OuraCaloriesCard,
  "oura:cycle-tracking": OuraCycleTrackingCard,
  "oura:full-day-hr": OuraFullDayHrCard,
  "oura:hrv-status": OuraHrvCard,
  "oura:recovery-readiness": OuraReadinessCard,
  "oura:resting-hr": OuraRestingHrCard,
  "oura:respiratory-rate": OuraRespiratoryRateCard,
  "oura:sleep-score": OuraSleepScoreCard,
  "oura:total-sleep-time": OuraSleepReportCard,
  "oura:steps": OuraStepsCard,
  "oura:temperature-deviation": OuraTemperatureDeviationCard,
  "oura:training-load": OuraStressCard,
  "oura:vo2-max": OuraVo2MaxCard,
  "oura:full-workout-report": OuraWorkoutReportCard,
}

export function WidgetSkinCard(props: WidgetSkinProps) {
  const CustomSkinComponent = customSkinRegistry[`${props.platform}:${props.metric.id}`]

  if (CustomSkinComponent) {
    return <CustomSkinComponent {...props} />
  }

  const SkinComponent = platformSkinRegistry[props.platform]
  return <SkinComponent {...props} />
}
