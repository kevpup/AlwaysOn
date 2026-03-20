"use client"

import { type WidgetId } from "@/lib/mock-data"
import { HeartRateWidget } from "@/components/widgets/heart-rate-widget"
import { SleepGraphWidget } from "@/components/widgets/sleep-graph-widget"
import { SleepHoursWidget } from "@/components/widgets/sleep-hours-widget"
import { SleepDebtWidget } from "@/components/widgets/sleep-debt-widget"
import { RecoveryWidget } from "@/components/widgets/recovery-widget"
import { StrainWidget } from "@/components/widgets/strain-widget"
import { HrvWidget } from "@/components/widgets/hrv-widget"
import { BedtimeRoutineWidget } from "@/components/widgets/bedtime-routine-widget"
import { AlcoholWidget } from "@/components/widgets/alcohol-widget"
import { WorkoutLogWidget } from "@/components/widgets/workout-log-widget"
import { CaloriesWidget } from "@/components/widgets/calories-widget"
import { StepCountWidget } from "@/components/widgets/step-count-widget"

interface WidgetRendererProps {
  id: WidgetId
}

export function WidgetRenderer({ id }: WidgetRendererProps) {
  switch (id) {
    case "heart-rate":
      return <HeartRateWidget />
    case "sleep-graph":
      return <SleepGraphWidget />
    case "sleep-hours":
      return <SleepHoursWidget />
    case "sleep-debt":
      return <SleepDebtWidget />
    case "recovery":
      return <RecoveryWidget />
    case "strain":
      return <StrainWidget />
    case "hrv":
      return <HrvWidget />
    case "bedtime-routine":
      return <BedtimeRoutineWidget />
    case "alcohol":
      return <AlcoholWidget />
    case "workout-log":
      return <WorkoutLogWidget />
    case "calories":
      return <CaloriesWidget />
    case "step-count":
      return <StepCountWidget />
    default:
      return null
  }
}
