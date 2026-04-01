"use client"

import { ChevronLeft, ChevronRight, Square, SquareDashedMousePointer } from "lucide-react"

import { WidgetRenderer } from "@/components/widgets/widget-renderer"
import { type WidgetConfig, type WidgetId } from "@/lib/mock-data"

interface ReviewScreenProps {
  athleteOnlyWidgets: WidgetConfig[]
  bothWidgets: WidgetConfig[]
  canGoBack: boolean
  coachOnlyWidgets: WidgetConfig[]
  highlightSupportedWidgets: boolean
  neitherWidgets: WidgetConfig[]
  onBack: () => void
  onContinue: () => void
  onToggleHighlightSupportedWidgets: () => void
  supportedWidgetIds: WidgetId[]
}

export function ReviewScreen({
  athleteOnlyWidgets,
  bothWidgets,
  canGoBack,
  coachOnlyWidgets,
  highlightSupportedWidgets,
  neitherWidgets,
  onBack,
  onContinue,
  onToggleHighlightSupportedWidgets,
  supportedWidgetIds,
}: ReviewScreenProps) {
  const supportedSet = new Set(supportedWidgetIds)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1700px] flex-col gap-6 px-4 py-6 md:px-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-5xl">
            <p className="text-base font-medium uppercase tracking-[0.24em] text-primary md:text-lg">Review</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">Where do perspectives align?</h1>
          </div>

          <div className="flex shrink-0 rounded-3xl border border-border bg-background/70 p-4 xl:min-w-[700px] xl:justify-center">
            <div className="grid w-full gap-3 md:grid-cols-3">
              <button
                onClick={onToggleHighlightSupportedWidgets}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-background px-5 py-5 text-lg font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {highlightSupportedWidgets ? <Square className="h-4 w-4 text-red-500" /> : <SquareDashedMousePointer className="h-4 w-4" />}
                {highlightSupportedWidgets ? "Hide Red Highlights" : "Show Red Highlights"}
              </button>
              {canGoBack ? (
                <button
                  onClick={onBack}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-background px-5 py-5 text-lg font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              ) : null}
              <button
                onClick={onContinue}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-5 text-lg font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Continue to Conclusion
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1700px] px-4 py-6 md:px-6">
        <div className="grid gap-4 xl:grid-cols-4">
          <ReviewColumn
            title="Both"
            widgets={bothWidgets}
            highlightSupportedWidgets={highlightSupportedWidgets}
            supportedSet={supportedSet}
          />
          <ReviewColumn
            title="Athlete Only"
            widgets={athleteOnlyWidgets}
            highlightSupportedWidgets={highlightSupportedWidgets}
            supportedSet={supportedSet}
          />
          <ReviewColumn
            title="Coach Only"
            widgets={coachOnlyWidgets}
            highlightSupportedWidgets={highlightSupportedWidgets}
            supportedSet={supportedSet}
          />
          <ReviewColumn
            title="Neither"
            widgets={neitherWidgets}
            highlightSupportedWidgets={highlightSupportedWidgets}
            supportedSet={supportedSet}
          />
        </div>
      </div>
    </div>
  )
}

function ReviewColumn({
  highlightSupportedWidgets,
  supportedSet,
  title,
  widgets,
}: {
  highlightSupportedWidgets: boolean
  supportedSet: Set<WidgetId>
  title: string
  widgets: WidgetConfig[]
}) {
  return (
    <section className="rounded-2xl border border-border bg-card/50">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-2xl font-semibold text-foreground md:text-3xl">{title}</h2>
      </div>

      <div className="min-h-[780px] p-4">
        {widgets.length === 0 ? (
          <div className="flex h-full min-h-[720px] items-center justify-center rounded-2xl border border-dashed border-border px-6 text-center text-xl leading-8 text-muted-foreground">
            No widgets here.
          </div>
        ) : (
          <div className="grid content-start gap-4">
            {widgets.map((widget) => (
              <ReviewWidgetCard
                key={widget.id}
                highlight={highlightSupportedWidgets && supportedSet.has(widget.id)}
                widget={widget}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ReviewWidgetCard({ highlight, widget }: { highlight: boolean; widget: WidgetConfig }) {
  return (
    <div
      className={`h-[232px] rounded-xl border bg-card p-3 shadow-sm transition-colors ${
        highlight ? "border-red-500 shadow-red-500/20" : "border-border"
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-foreground md:text-xl">{widget.title}</h3>
        {highlight ? (
          <span className="rounded-md bg-red-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-red-500">
            Supported
          </span>
        ) : null}
      </div>
      <div className="h-[calc(100%-2.25rem)]">
        <WidgetRenderer id={widget.id} />
      </div>
    </div>
  )
}
