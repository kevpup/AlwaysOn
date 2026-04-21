"use client"

import { useRef, useState } from "react"
import { ChevronLeft } from "lucide-react"

import { WidgetSkinCard } from "@/components/development/widget-skins/widget-skin-registry"
import {
  defaultAppleWatchHrDataset,
  parseHeartRateCsv,
  type AppleWatchHrDataset,
} from "@/lib/apple-watch-hr-data"
import { widgetDevelopmentMetrics, widgetDevelopmentPlatforms } from "@/lib/widget-development"

interface WidgetDevelopmentScreenProps {
  onBack: () => void
}

export function WidgetDevelopmentScreen({ onBack }: WidgetDevelopmentScreenProps) {
  const [hrDataset, setHrDataset] = useState<AppleWatchHrDataset>(defaultAppleWatchHrDataset)
  const [hrUploadError, setHrUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  async function handleHrCsvUpload(file: File | undefined) {
    if (!file) return

    try {
      const csvText = await file.text()
      setHrDataset(parseHeartRateCsv(csvText, file.name))
      setHrUploadError(null)
    } catch (error) {
      setHrUploadError(error instanceof Error ? error.message : "Could not parse that CSV.")
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="min-h-screen bg-background px-4 py-6 text-foreground md:px-6">
      <div className="mx-auto flex max-w-[1800px] flex-col gap-5">
        <header className="flex flex-col gap-4 rounded-3xl border border-border bg-card/70 p-5 shadow-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Development Mode</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Widget Skin Testbed</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              This screen shows the 21 finalized widget categories across WHOOP, Apple, Garmin, and Oura. These are
              base designs for reviewing platform direction before we replace individual cells with custom widgets.
            </p>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Start
          </button>
        </header>

        <section className="rounded-3xl border border-border bg-card/70 p-5 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Full-Day HR Data</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">CSV-powered HR widgets</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                Current source: {hrDataset.source}. Upload a CSV with columns <span className="font-semibold">timestamp</span>{" "}
                and <span className="font-semibold">HR</span> to rebuild the Apple and WHOOP full-day HR widgets.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Range {hrDataset.daySummary.min}-{hrDataset.daySummary.max} BPM · Last HR reading{" "}
                {hrDataset.lastReading}
              </p>
              {hrUploadError ? <p className="mt-2 text-sm font-medium text-destructive">{hrUploadError}</p> : null}
            </div>

            <label className="inline-flex w-fit cursor-pointer items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              Upload HR CSV
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                className="sr-only"
                onChange={(event) => {
                  void handleHrCsvUpload(event.target.files?.[0])
                }}
              />
            </label>
          </div>
        </section>

        <section className="overflow-x-auto rounded-3xl border border-border bg-card/60 shadow-xl">
          <div className="min-w-[1460px]">
            <div className="sticky top-0 z-10 grid grid-cols-[280px_repeat(4,minmax(280px,1fr))] border-b border-border bg-card">
              <div className="border-r border-border px-4 py-4">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Widget</p>
              </div>
              {widgetDevelopmentPlatforms.map((platform) => (
                <div key={platform.id} className="border-r border-border px-4 py-4 last:border-r-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{platform.label}</p>
                </div>
              ))}
            </div>

            {widgetDevelopmentMetrics.map((metric, index) => (
              <div
                key={metric.id}
                className="grid grid-cols-[280px_repeat(4,minmax(280px,1fr))] border-b border-border last:border-b-0"
              >
                <div className="border-r border-border bg-background/45 px-4 py-4">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Widget {index + 1}
                  </p>
                  <h2 className="mt-2 text-base font-semibold leading-5 text-foreground">{metric.label}</h2>
                </div>

                {widgetDevelopmentPlatforms.map((platform) => (
                  <div
                    key={`${metric.id}-${platform.id}`}
                    className="aspect-square border-r border-border p-3 last:border-r-0"
                  >
                    <WidgetSkinCard hrDataset={hrDataset} metric={metric} platform={platform.id} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
