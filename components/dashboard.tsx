"use client"

import { ConclusionScreen } from "@/components/study/conclusion-screen"
import { ReviewScreen } from "@/components/study/review-screen"
import { ScenarioIntroScreen } from "@/components/study/scenario-intro-screen"
import { ScenarioWorkspaceScreen } from "@/components/study/scenario-workspace-screen"
import { DemoTitleScreen } from "@/components/study/title-screen"
import { useStudySession } from "@/hooks/use-study-session"

export function Dashboard() {
  const session = useStudySession()

  if (session.step === "title") {
    return <DemoTitleScreen canGoBack={session.canGoBack} onBack={session.goBack} onStart={session.startDemo} />
  }

  if (session.step === "review") {
    return (
      <ReviewScreen
        athleteOnlyWidgets={session.reviewColumns.athleteOnly}
        bothWidgets={session.reviewColumns.both}
        canGoBack={session.canGoBack}
        coachOnlyWidgets={session.reviewColumns.coachOnly}
        highlightSupportedWidgets={session.highlightSupportedWidgets}
        neitherWidgets={session.reviewColumns.neither}
        onBack={session.goBack}
        onContinue={session.openConclusion}
        onToggleHighlightSupportedWidgets={session.toggleHighlightSupportedWidgets}
        supportedWidgetIds={session.supportedWidgetIds}
      />
    )
  }

  if (session.step === "conclusion") {
    return (
      <ConclusionScreen
        canGoBack={session.canGoBack}
        onBack={session.goBack}
        onResetSession={session.resetSession}
      />
    )
  }

  if (!session.currentScenario) return null

  if (session.step === "athlete_intro" || session.step === "coach_intro") {
    return (
      <ScenarioIntroScreen
        canGoBack={session.canGoBack}
        onBack={session.goBack}
        onBuildDashboard={session.openWorkspace}
        onContinueLabel={session.step === "athlete_intro" ? "Athlete Build" : "Coach Build"}
        scenario={session.currentScenario}
        scenarioIndex={session.scenarioIndex}
        totalScenarios={session.totalScenarios}
      />
    )
  }

  return (
    <ScenarioWorkspaceScreen
      activeWidget={session.activeWidget}
      activeZone={session.activeZone}
      canGoBack={session.canGoBack}
      continueLabel={session.step === "athlete_workspace" ? "Continue to Coach Scenario" : "Continue to Review"}
      onBack={session.goBack}
      onContinue={session.advanceFromWorkspace}
      onDragCancel={session.handleDragCancel}
      onDragEnd={session.handleDragEnd}
      onDragStart={session.handleDragStart}
      onMoveToNotDisplayed={session.moveWidgetToNotDisplayed}
      removeLabel="Remove"
      scenario={session.currentScenario}
      scenarioIndex={session.scenarioIndex}
      selectedTitle={session.step === "athlete_workspace" ? "Shared" : "Requested"}
      selectionTitle={session.step === "athlete_workspace" ? "Not Shared" : "Not Requested"}
      totalScenarios={session.totalScenarios}
      zones={session.activeZones}
    />
  )
}
