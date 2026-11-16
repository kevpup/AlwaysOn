"use client"

import { type ReactNode } from "react"
import { House } from "lucide-react"

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
  let screen: ReactNode = null

  if (session.step === "protocol") {
    screen = (
      <ProtocolScreen
        selectedProtocol={session.participantForm.protocol}
        onSelectProtocol={session.handleProtocolSelect}
        onContinue={session.submitProtocol}
        onOpenWidgetDevelopment={session.openWidgetDevelopment}
      />
    )
  } else if (session.step === "widget-dev") {
    screen = <WidgetDevelopmentScreen onBack={session.goBack} />
  } else if (session.step === "sport") {
    screen = (
      <SportCategoryScreen
        protocol={session.participantForm.protocol!}
        selectedSportCategory={session.participantForm.sportCategory}
        onSelectSportCategory={session.handleSportCategorySelect}
        onBack={session.goBack}
        onContinue={session.submitSportCategory}
      />
    )
  } else if (session.step === "device") {
    screen = (
      <DeviceScreen
        selectedDeviceType={session.participantForm.deviceType}
        onSelectDeviceType={session.handleDeviceTypeSelect}
        onBack={session.goBack}
        onContinue={session.startSession}
      />
    )
  } else if (session.currentScenario && session.participant && session.scenarioView === "preview") {
    screen = (
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
  } else if (session.currentScenario && session.participant && session.scenarioView === "intro") {
    screen = (
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
  } else if (session.currentScenario && session.participant && session.scenarioView === "recap") {
    screen = (
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
  } else if (session.currentScenario && session.participant) {
    screen = (
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

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 flex h-14 items-center border-b border-border/70 bg-background/95 px-4 backdrop-blur">
        <button
          type="button"
          onClick={session.resetSession}
          aria-label="Return to protocol selection"
          title="Return to protocol selection"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/80 px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <House className="h-4 w-4" aria-hidden="true" />
          Home
        </button>
      </header>
      {screen}
    </div>
  )
}
