"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { type Scenario } from "@/lib/scenarios"

interface ScenarioIntroScreenProps {
  canGoBack: boolean
  onBack: () => void
  onBuildDashboard: () => void
  onSkipToFinish: () => void
  scenario: Scenario
  scenarioIndex: number
  totalScenarios: number
}

export function ScenarioIntroScreen({
  canGoBack,
  onBack,
  onBuildDashboard,
  onSkipToFinish,
  scenario,
  scenarioIndex,
  totalScenarios,
}: ScenarioIntroScreenProps) {
  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground md:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl items-center justify-center">
        <div className="w-full rounded-[2rem] border border-border bg-card/80 p-8 text-center shadow-2xl md:p-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Scenario {scenarioIndex + 1} of {totalScenarios}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{scenario.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            {scenario.prompt}
          </p>

          <div className="mt-10 flex justify-center">
            <div className="flex flex-wrap justify-center gap-3">
              {canGoBack ? (
                <button
                  onClick={onBack}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              ) : null}
              <button
                onClick={onBuildDashboard}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Build Dashboard
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={onSkipToFinish}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Skip to Finish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
