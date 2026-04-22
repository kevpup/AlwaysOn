import { type LegacyWidgetId, widgetRegistry } from "@/components/widgets/widget-registry"
import { HeartRateWidget } from "@/components/widgets/all-widgets/heart-rate-widget"
import { type WidgetSkinProps } from "./types"
import { WhoopSkinCard } from "./whoop-skin-card"

const whoopDashboardWidgetMap: Partial<Record<string, LegacyWidgetId>> = {
  steps: "step-count",
  "full-day-hr": "heart-rate",
  "activity-hr-graph": "heart-rate",
  "activity-hr-zones": "heart-zones-all",
  "resting-hr": "resting-heart-rate",
  "hrv-status": "hrv",
  "calories-active-energy": "calories",
  weight: "weight",
  "vo2-max": "vo2-max",
  "total-sleep-time": "sleep-hours",
  "sleep-hours": "sleep-hours",
  "sleep-stages-cycles": "sleep-graph",
  "sleep-score": "sleep-score",
  "respiratory-rate": "respiratory-rate",
  "training-load": "strain",
  "recovery-readiness": "recovery",
  "cycle-tracking": "menstrual-cycle",
  "activity-workout-minutes": "strength-activity-time",
  "full-workout-report": "workout-log",
  "temperature-deviation": "temperature-deviation",
  "blood-oxygen": "blood-oxygen",
}

export function WhoopDashboardWidgetCard({ hrDataset, metric, platform }: WidgetSkinProps) {
  const widgetId = whoopDashboardWidgetMap[metric.id]
  const WidgetComponent = widgetId ? widgetRegistry[widgetId] : null

  if (!WidgetComponent) {
    return <WhoopSkinCard metric={metric} platform={platform} />
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-3 shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <h3 className="max-w-[190px] truncate text-sm font-semibold text-foreground">{metric.shortLabel}</h3>
        </div>
      </div>
      <div className="min-h-0 flex-1">
        {widgetId === "heart-rate" ? <HeartRateWidget data={hrDataset?.fullDayLine} /> : <WidgetComponent />}
      </div>
    </div>
  )
}
