"use client"

import { ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react"

import { SortableWidget } from "@/components/sortable-widget"
import { type DeviceType, type SportCategory, type WidgetConfig } from "@/components/study/types"
import { type Scenario } from "@/lib/scenarios"

interface CoachRecapScreenProps {
  deviceType: DeviceType
  onBack: () => void
  onContinue: () => void
  onSeeAllWidgets: () => void
  onSkipToFinish: () => void
  scenario: Scenario
  scenarioIndex: number
  sharedWidgets: WidgetConfig[]
  sportCategory: SportCategory
  totalScenarios: number
}

export function CoachRecapScreen({
  deviceType,
  onBack,
  onContinue,
  onSeeAllWidgets,
  onSkipToFinish,
  scenario,
  scenarioIndex,
  sharedWidgets,
  sportCategory,
  totalScenarios,
}: CoachRecapScreenProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-5 md:px-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-4xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Scenario {scenarioIndex + 1} of {totalScenarios}
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">Staff View Recap</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              This is the view staff would see for{" "}
              <span className="font-medium text-foreground">{scenario.title}</span>. Use this page to discuss the
              design, then continue or go back to make changes.
            </p>
          </div>

          <div className="flex shrink-0 rounded-2xl border border-border bg-background/60 p-4 xl:min-w-[260px] xl:justify-center">
            <div className="flex w-full flex-col gap-3 xl:max-w-[220px]">
              <button
                onClick={onBack}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Edit
              </button>
              <button
                onClick={onContinue}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {scenarioIndex === totalScenarios - 1 ? "Save and Finish" : "Next Scenario"}
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={onSeeAllWidgets}
                className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                See All Widgets
              </button>
              <button
                onClick={onSkipToFinish}
                className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Skip to Finish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 py-6 md:px-6">
        <section className="rounded-2xl border border-border bg-card/50">
          <div className="border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Staff View</h2>
            </div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              These are the widgets currently shared with staff for this scenario.
            </p>
          </div>

          <div className="min-h-[720px] p-5">
            {sharedWidgets.length === 0 ? (
              <div className="flex h-full min-h-[660px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border px-8 text-center">
                <EyeOff className="h-8 w-8 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">No Shared Widgets</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  Right now staff would not see any wearable widgets for this scenario. Go back if you want to
                  revise that view.
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap content-start justify-start gap-4">
                {sharedWidgets.map((widget) => (
                  <div key={widget.id} className="w-full max-w-[360px] sm:w-[360px]">
                    <SortableWidget
                      deviceType={deviceType}
                      scenarioId={scenario.id}
                      widget={widget}
                      disableSorting
                      sportCategory={sportCategory}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
