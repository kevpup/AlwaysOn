import type { ComponentType } from "react"

import { AlcoholWidget } from "@/components/widgets/all-widgets/alcohol-widget"
import { AverageDailyHeartRateWidget } from "@/components/widgets/all-widgets/average-daily-heart-rate-widget"
import { BedtimeRoutineWidget } from "@/components/widgets/all-widgets/bedtime-routine-widget"
import { BedtimeWidget } from "@/components/widgets/all-widgets/bedtime-widget"
import { BloodOxygenWidget } from "@/components/widgets/all-widgets/blood-oxygen-widget"
import { CaloriesWidget } from "@/components/widgets/all-widgets/calories-widget"
import { DailyActivitiesWidget } from "@/components/widgets/all-widgets/daily-activities-widget"
import { HealthMonitorWidget } from "@/components/widgets/all-widgets/health-monitor-widget"
import { HeartRateWidget } from "@/components/widgets/all-widgets/heart-rate-widget"
import { HeartZonesAllWidget } from "@/components/widgets/all-widgets/heart-zones-all-widget"
import { HeartZonesHighWidget } from "@/components/widgets/all-widgets/heart-zones-high-widget"
import { HeartZonesLowWidget } from "@/components/widgets/all-widgets/heart-zones-low-widget"
import { HrvWidget } from "@/components/widgets/all-widgets/hrv-widget"
import { JournalWidget } from "@/components/widgets/all-widgets/journal-widget"
import { LeanBodyMassWidget } from "@/components/widgets/all-widgets/lean-body-mass-widget"
import { MenstrualCycleWidget } from "@/components/widgets/all-widgets/menstrual-cycle-widget"
import { RecoveryWidget } from "@/components/widgets/all-widgets/recovery-widget"
import { RespiratoryRateWidget } from "@/components/widgets/all-widgets/respiratory-rate-widget"
import { RestingHeartRateWidget } from "@/components/widgets/all-widgets/resting-heart-rate-widget"
import { RestorativeSleepWidget } from "@/components/widgets/all-widgets/restorative-sleep-widget"
import { SleepConsistencyWidget } from "@/components/widgets/all-widgets/sleep-consistency-widget"
import { SleepDebtWidget } from "@/components/widgets/all-widgets/sleep-debt-widget"
import { SleepEfficiencyWidget } from "@/components/widgets/all-widgets/sleep-efficiency-widget"
import { SleepGraphWidget } from "@/components/widgets/all-widgets/sleep-graph-widget"
import { SleepHoursWidget } from "@/components/widgets/all-widgets/sleep-hours-widget"
import { SleepNeededWidget } from "@/components/widgets/all-widgets/sleep-needed-widget"
import { SleepScoreWidget } from "@/components/widgets/all-widgets/sleep-score-widget"
import { StepCountWidget } from "@/components/widgets/all-widgets/step-count-widget"
import { StrainRecoveryTrendWidget } from "@/components/widgets/all-widgets/strain-recovery-trend-widget"
import { StrainWidget } from "@/components/widgets/all-widgets/strain-widget"
import { StrengthActivityTimeWidget } from "@/components/widgets/all-widgets/strength-activity-time-widget"
import { StressMonitorWidget } from "@/components/widgets/all-widgets/stress-monitor-widget"
import { TemperatureDeviationWidget } from "@/components/widgets/all-widgets/temperature-deviation-widget"
import { TimeInBedWidget } from "@/components/widgets/all-widgets/time-in-bed-widget"
import { Vo2MaxWidget } from "@/components/widgets/all-widgets/vo2-max-widget"
import { WeightWidget } from "@/components/widgets/all-widgets/weight-widget"
import { WorkoutLogWidget } from "@/components/widgets/all-widgets/workout-log-widget"

export type WidgetComponent = ComponentType

export const widgetRegistry = {
  recovery: RecoveryWidget,
  strain: StrainWidget,
  "sleep-hours": SleepHoursWidget,
  "sleep-debt": SleepDebtWidget,
  hrv: HrvWidget,
  "heart-rate": HeartRateWidget,
  "sleep-graph": SleepGraphWidget,
  calories: CaloriesWidget,
  "workout-log": WorkoutLogWidget,
  "bedtime-routine": BedtimeRoutineWidget,
  alcohol: AlcoholWidget,
  "step-count": StepCountWidget,
  "resting-heart-rate": RestingHeartRateWidget,
  "stress-monitor": StressMonitorWidget,
  "strain-recovery-trend": StrainRecoveryTrendWidget,
  "respiratory-rate": RespiratoryRateWidget,
  "average-daily-heart-rate": AverageDailyHeartRateWidget,
  "heart-zones-all": HeartZonesAllWidget,
  "heart-zones-low": HeartZonesLowWidget,
  "heart-zones-high": HeartZonesHighWidget,
  "lean-body-mass": LeanBodyMassWidget,
  "restorative-sleep": RestorativeSleepWidget,
  "sleep-consistency": SleepConsistencyWidget,
  "sleep-efficiency": SleepEfficiencyWidget,
  "sleep-needed": SleepNeededWidget,
  "time-in-bed": TimeInBedWidget,
  "vo2-max": Vo2MaxWidget,
  weight: WeightWidget,
  "sleep-score": SleepScoreWidget,
  "health-monitor": HealthMonitorWidget,
  "daily-activities": DailyActivitiesWidget,
  bedtime: BedtimeWidget,
  journal: JournalWidget,
  "strength-activity-time": StrengthActivityTimeWidget,
  "menstrual-cycle": MenstrualCycleWidget,
  "temperature-deviation": TemperatureDeviationWidget,
  "blood-oxygen": BloodOxygenWidget,
} satisfies Record<string, WidgetComponent>

export type LegacyWidgetId = keyof typeof widgetRegistry
