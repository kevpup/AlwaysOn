"use client"

import { WidgetDevelopmentScreen } from "@/components/development/widget-development-screen"
import { CoachRecapScreen } from "@/components/study/coach-recap-screen"
import { DeviceScreen } from "@/components/study/device-screen"
import { ProtocolScreen } from "@/components/study/protocol-screen"
import { ScenarioIntroScreen } from "@/components/study/scenario-intro-screen"
import { ScenarioWorkspaceScreen } from "@/components/study/scenario-workspace-screen"
import { SportCategoryScreen } from "@/components/study/sport-category-screen"
import { WidgetPreviewScreen } from "@/components/study/widget-preview-screen"
import { useStudySession } from "@/hooks/use-study-session"

export function Dashboard() {
  const session = useStudySession()

  if (session.step === "protocol") {
    return (
      <ProtocolScreen
        selectedProtocol={session.participantForm.protocol}
        onSelectProtocol={session.handleProtocolSelect}
        onContinue={session.submitProtocol}
        onOpenWidgetDevelopment={session.openWidgetDevelopment}
      />
    )
  }

  if (session.step === "widget-dev") {
    return <WidgetDevelopmentScreen onBack={session.goBack} />
  }

  if (session.step === "sport") {
    return (
      <SportCategoryScreen
        protocol={session.participantForm.protocol!}
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

  if (!session.currentScenario || !session.participant) return null

  if (session.scenarioView === "preview") {
    return (
      <WidgetPreviewScreen
        deviceType={session.participant.deviceType}
        protocol={session.participant.protocol}
        onBack={session.goBack}
        onPrimaryAction={session.continueFromWidgetPreview}
        onSkipToFinish={session.skipToFinish}
        previewContext={session.previewContext}
        sportCategory={session.participant.sportCategory}
        widgets={session.previewWidgets}
      />
    )
  }

  if (session.scenarioView === "intro") {
    return (
      <ScenarioIntroScreen
        canGoBack={session.canGoBack}
        onBack={session.goBack}
        onBuildDashboard={session.openWorkspace}
        onSkipToFinish={session.skipToFinish}
        protocol={session.participant.protocol}
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
        protocol={session.participant.protocol}
        onBack={session.goBack}
        onContinue={session.continueScenario}
        onSeeAllWidgets={session.openWidgetPreviewFromRecap}
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
    protocol={session.participant.protocol}
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
