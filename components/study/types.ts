"use client"

import { type WidgetConfig, type WidgetId } from "@/lib/mock-data"

export type ZoneId = "not_displayed" | "share"
export type Audience = "athlete" | "coach"
export type StudyStep =
  | "title"
  | "athlete_intro"
  | "athlete_workspace"
  | "coach_intro"
  | "coach_workspace"
  | "review"
  | "conclusion"

export interface ZonesState {
  not_displayed: WidgetConfig[]
  share: WidgetConfig[]
}

export interface NavigationSnapshot {
  step: StudyStep
}

export type { WidgetConfig, WidgetId }
