"use client"

import { type WidgetConfig, type WidgetId } from "@/lib/mock-data"

export type ZoneId = "not_displayed" | "share"
export type StudyStep = "name" | "device" | "study" | "complete"
export type ScenarioView = "intro" | "workspace" | "recap"
export type DeviceType = "whoop" | "oura" | "apple-watch" | "garmin"

export interface ParticipantInfo {
  name: string
  deviceType: DeviceType
}

export interface ParticipantFormState {
  name: string
  deviceType: DeviceType | null
}

export interface ScenarioDecisionRow {
  participantName: string
  deviceType: DeviceType
  scenarioId: string
  widgetTitle: string
  shared: boolean
  rank: number | ""
}

export interface ZonesState {
  not_displayed: WidgetConfig[]
  share: WidgetConfig[]
}

export interface NavigationSnapshot {
  step: StudyStep
  scenarioView: ScenarioView
  scenarioIndex: number
}

export type { WidgetConfig, WidgetId }
