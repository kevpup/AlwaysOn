"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface DemoTitleScreenProps {
  canGoBack: boolean
  onBack: () => void
  onStart: () => void
}

export function DemoTitleScreen({ canGoBack, onBack, onStart }: DemoTitleScreenProps) {
  return (
    <div className="min-h-screen bg-background px-4 py-4 text-foreground md:px-6">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl gap-0 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative min-h-[320px] overflow-hidden rounded-t-[2.25rem] lg:rounded-l-[2.25rem] lg:rounded-tr-none">
          <img
            alt="Information flow diagram featured on the intro screen"
            className="absolute inset-0 h-full w-full object-contain bg-card p-4 md:p-6"
            src="/InformationFlow.png"
          />
        </div>

        <div className="flex flex-col justify-between rounded-b-[2.25rem] bg-card p-6 lg:rounded-r-[2.25rem] lg:rounded-bl-none md:p-8">
          <div>
            <p className="text-base font-medium uppercase tracking-[0.28em] text-primary md:text-lg">
              Student-athlete Data Sharing Demo
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl xl:text-[4.4rem] xl:leading-[0.95]">
              What athlete data should be shared?
            </h1>
            
          </div>

          <div className="mt-6">
            <p className="mb-3 text-base font-medium uppercase tracking-[0.24em] text-primary md:text-lg">
              Supported By
            </p>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 text-slate-900 shadow-lg">
              <div className="grid items-center gap-4 md:grid-cols-[1.05fr_0.95fr]">
                <div className="flex items-center justify-center p-2">
                  <img
                    alt="FICS logo"
                    className="h-28 w-auto object-contain md:h-36"
                    src="/FICS-Logo.png"
                  />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-center p-2">
                    <img
                      alt="AI Powered Athletics logo"
                      className="h-20 w-auto object-contain md:h-24"
                      src="/AI-PoweredAthleticsLogo.png"
                    />
                  </div>
                  <div className="flex items-center justify-center rounded-2xl bg-[#0021A5] p-3">
                    <img
                      alt="PRISM logo"
                      className="h-20 w-auto object-contain md:h-24"
                      src="/PRISM.png"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {canGoBack ? (
                <button
                  onClick={onBack}
                  className="inline-flex items-center gap-3 rounded-2xl border border-border bg-background px-7 py-4 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              ) : null}
              <button
                onClick={onStart}
                className="inline-flex items-center gap-3 rounded-2xl bg-primary px-7 py-4 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Begin
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
