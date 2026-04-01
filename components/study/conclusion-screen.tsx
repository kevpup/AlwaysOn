"use client"

import { ChevronLeft, RotateCcw } from "lucide-react"

interface ConclusionScreenProps {
  canGoBack: boolean
  onBack: () => void
  onResetSession: () => void
}

export function ConclusionScreen({ canGoBack, onBack, onResetSession }: ConclusionScreenProps) {
  return (
    <div className="h-[100dvh] overflow-hidden bg-background px-4 py-3 text-foreground md:px-6">
      <div className="mx-auto grid h-[calc(100dvh-1.5rem)] max-w-7xl gap-3 lg:grid-cols-[1.18fr_0.82fr]">
        <div className="overflow-hidden rounded-[2.25rem] bg-card">
          <img
            alt="Oura for Organizations screenshot"
            className="h-full min-h-[300px] w-full object-contain p-4 md:min-h-[520px] md:p-5"
            src="/Oura.png"
          />
        </div>

        <div className="grid gap-3">
          <div className="flex flex-col justify-between rounded-[2.25rem] bg-card p-4 md:p-5">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-[2.8rem] xl:text-[3.5rem] xl:leading-[0.95]">
                Questions?
              </h1>
              <p className="mt-2 text-lg leading-tight text-muted-foreground md:text-[1.15rem]">
                This work is supported by:
              </p>

              <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 text-slate-900 shadow-lg">
                <div className="grid items-center gap-4 md:grid-cols-[1.05fr_0.95fr]">
                  <div className="flex items-center justify-center p-1">
                    <img
                      alt="FICS logo"
                      className="h-20 w-auto object-contain md:h-24"
                      src="/FICS-Logo.png"
                    />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-center p-1">
                      <img
                        alt="AI Powered Athletics logo"
                        className="h-14 w-auto object-contain md:h-16"
                        src="/AI-PoweredAthleticsLogo.png"
                      />
                    </div>
                    <div className="flex items-center justify-center rounded-2xl bg-[#0021A5] p-2">
                      <img
                        alt="PRISM logo"
                        className="h-14 w-auto object-contain md:h-16"
                        src="/PRISM.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {canGoBack ? (
                <button
                  onClick={onBack}
                  className="inline-flex items-center gap-3 rounded-2xl border border-border bg-background px-5 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              ) : null}
              <button
                onClick={onResetSession}
                className="inline-flex items-center gap-3 rounded-2xl border border-border bg-background px-5 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <RotateCcw className="h-4 w-4" />
                Restart Demo
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-[2.25rem] bg-card p-4 md:p-5">
            <p className="mb-4 text-center text-lg font-medium text-foreground md:text-xl">
              More information on this work:
            </p>
            <img
              alt="QR code for the AlwaysOn demo"
              className="h-52 w-52 rounded-2xl bg-white p-3 md:h-60 md:w-60"
              src="/PersonalWebsiteQRCode.png"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
