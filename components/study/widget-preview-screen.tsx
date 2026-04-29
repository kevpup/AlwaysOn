"use client"

import { ChevronLeft, ChevronRight, Info } from "lucide-react"

import { SortableWidget } from "@/components/sortable-widget"
import { type DeviceType, type PreviewContext, type SportCategory, type WidgetConfig } from "@/components/study/types"

interface WidgetPreviewScreenProps {
  deviceType: DeviceType
  onBack: () => void
  onPrimaryAction: () => void
  onSkipToFinish: () => void
  previewContext: PreviewContext
  sportCategory: SportCategory
  widgets: WidgetConfig[]
}

export function WidgetPreviewScreen({
  deviceType,
  onBack,
  onPrimaryAction,
  onSkipToFinish,
  previewContext,
  sportCategory,
  widgets,
}: WidgetPreviewScreenProps) {
  const isOnboarding = previewContext === "onboarding"

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-5 md:px-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-4xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {isOnboarding ? "Widget Preview" : "All Widgets"}
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              {isOnboarding ? "Get Familiar With the Metrics" : "Review All Widgets"}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              Browse the widgets in this device style and open <span className="font-medium text-foreground">More information</span> for any metric you want to discuss before continuing.
            </p>
          </div>

          <div className="flex shrink-0 rounded-2xl border border-border bg-background/60 p-4 xl:min-w-[240px] xl:justify-center">
            <div className="flex w-full flex-col gap-3 xl:max-w-[200px]">
              <button
                onClick={onBack}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
              <button
                onClick={onPrimaryAction}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {isOnboarding ? "Start Scenario 1" : "Skip to Finish"}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 py-6 md:px-6">
        <section className="rounded-2xl border border-border bg-card/50">
          <div className="border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Widget Reference</h2>
            </div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              These are the widgets participants may work with in the scenarios. Open any card to read what it shows, why staff might use it, and what might influence it.
            </p>
          </div>

          <div className="p-5">
            <div className="flex flex-wrap content-start justify-start gap-4">
              {widgets.map((widget) => (
                <div key={widget.id} className="w-full max-w-[340px] sm:w-[320px] lg:w-[340px]">
                  <SortableWidget
                    deviceType={deviceType}
                    widget={widget}
                    disableSorting
                    sportCategory={sportCategory}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
