"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { type Scenario } from "@/lib/scenarios"

interface ScenarioIntroScreenProps {
  canGoBack: boolean
  onBack: () => void
  onBuildDashboard: () => void
  onContinueLabel?: string
  scenario: Scenario
  scenarioIndex: number
  totalScenarios: number
}

export function ScenarioIntroScreen({
  canGoBack,
  onBack,
  onBuildDashboard,
  onContinueLabel = "Selection",
  scenario,
  scenarioIndex,
  totalScenarios,
}: ScenarioIntroScreenProps) {
  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground md:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <div className="w-full rounded-[2.25rem] border border-border bg-card/90 p-10 text-center shadow-2xl md:p-16">
          <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">{scenario.title}</h1>
          <p className="mx-auto mt-8 max-w-4xl text-2xl leading-tight text-muted-foreground md:text-4xl">
            {scenario.prompt}
          </p>

          <div className="mt-12 flex justify-center">
            <div className="flex flex-wrap justify-center gap-4">
              {canGoBack ? (
                <button
                  onClick={onBack}
                  className="inline-flex items-center gap-3 rounded-2xl border border-border bg-background px-8 py-5 text-lg font-medium text-foreground transition-colors hover:bg-secondary md:text-xl"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              ) : null}
              <button
                onClick={onBuildDashboard}
                className="inline-flex items-center gap-3 rounded-2xl bg-primary px-8 py-5 text-lg font-medium text-primary-foreground transition-colors hover:bg-primary/90 md:text-xl"
              >
                {onContinueLabel}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
