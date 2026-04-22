"use client"

import { WidgetDevelopmentScreen } from "@/components/development/widget-development-screen"
import { CompletionScreen } from "@/components/study/completion-screen"
import { CoachRecapScreen } from "@/components/study/coach-recap-screen"
import { DeviceScreen } from "@/components/study/device-screen"
import { NameScreen } from "@/components/study/name-screen"
import { ScenarioIntroScreen } from "@/components/study/scenario-intro-screen"
import { ScenarioWorkspaceScreen } from "@/components/study/scenario-workspace-screen"
import { SportCategoryScreen } from "@/components/study/sport-category-screen"
import { useStudySession } from "@/hooks/use-study-session"

export function Dashboard() {
  const session = useStudySession()

  if (session.step === "name") {
    return (
      <NameScreen
        name={session.participantForm.name}
        onNameChange={session.handleParticipantNameChange}
        onOpenWidgetDevelopment={session.openWidgetDevelopment}
        onSubmit={session.submitName}
      />
    )
  }

  if (session.step === "widget-dev") {
    return <WidgetDevelopmentScreen onBack={session.goBack} />
  }

  if (session.step === "sport") {
    return (
      <SportCategoryScreen
        selectedSportCategory={session.participantForm.sportCategory}
        onSelectSportCategory={session.handleSportCategorySelect}
        onBack={session.goBack}
        onContinue={session.submitSportCategory}
      />
    )
  }

  if (session.step === "device") {
    return (
      <DeviceScreen
        selectedDeviceType={session.participantForm.deviceType}
        onSelectDeviceType={session.handleDeviceTypeSelect}
        onBack={session.goBack}
        onContinue={session.startSession}
      />
    )
  }

  if (session.step === "complete") {
    return (
      <CompletionScreen
        canGoBack={session.canGoBack}
        onBack={session.goBack}
        onResetSession={session.resetSession}
      />
    )
  }

  if (!session.currentScenario || !session.participant) return null

  if (session.scenarioView === "intro") {
    return (
      <ScenarioIntroScreen
        canGoBack={session.canGoBack}
        onBack={session.goBack}
        onBuildDashboard={session.openWorkspace}
        onSkipToFinish={session.skipToFinish}
        scenario={session.currentScenario}
        scenarioIndex={session.scenarioIndex}
        totalScenarios={session.totalScenarios}
      />
    )
  }

  if (session.scenarioView === "recap") {
    return (
      <CoachRecapScreen
        deviceType={session.participant.deviceType}
        onBack={session.goBack}
        onContinue={session.saveScenario}
        onSkipToFinish={session.skipToFinish}
        scenario={session.currentScenario}
        scenarioIndex={session.scenarioIndex}
        sharedWidgets={session.zones.share}
        sportCategory={session.participant.sportCategory}
        totalScenarios={session.totalScenarios}
      />
    )
  }

  return (
    <ScenarioWorkspaceScreen
      activeWidget={session.activeWidget}
      activeZone={session.activeZone}
      canGoBack={session.canGoBack}
      deviceType={session.participant.deviceType}
      onBack={session.goBack}
      onDragCancel={session.handleDragCancel}
      onDragEnd={session.handleDragEnd}
      onDragStart={session.handleDragStart}
      onMoveToNotDisplayed={session.moveWidgetToNotDisplayed}
      onReviewCoachView={session.openRecap}
      onSkipToFinish={session.skipToFinish}
      scenario={session.currentScenario}
      scenarioIndex={session.scenarioIndex}
      sportCategory={session.participant.sportCategory}
      totalScenarios={session.totalScenarios}
      zones={session.zones}
    />
  )
}
