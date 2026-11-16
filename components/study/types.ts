"use client"

import { type WidgetConfig, type WidgetId } from "@/lib/mock-data"

export type ZoneId = "not_displayed" | "share"
export type StudyStep = "protocol" | "sport" | "device" | "study" | "widget-dev"
export type ScenarioView = "intro" | "preview" | "workspace" | "recap"
export type PreviewContext = "onboarding" | "recap"
export type DeviceType = "whoop" | "oura" | "apple-watch" | "garmin"
export type SportCategory = "mens" | "womens" | "both"
export type StudyProtocol = "student-athlete" | "coaching-staff"

export interface ParticipantInfo {
  protocol: StudyProtocol
  sportCategory: SportCategory
  deviceType: DeviceType
}

export interface ParticipantFormState {
  protocol: StudyProtocol | null
  sportCategory: SportCategory | null
  deviceType: DeviceType | null
}

export interface ZonesState {
  not_displayed: WidgetConfig[]
  share: WidgetConfig[]
}

export interface NavigationSnapshot {
  step: StudyStep
  scenarioView: ScenarioView
  scenarioIndex: number
  previewContext: PreviewContext
}

export type { WidgetConfig, WidgetId }
