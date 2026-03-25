"use client"

import { Activity, Circle, Navigation, Watch, type LucideIcon } from "lucide-react"

import { type DeviceType, type ZoneId } from "@/components/study/types"

export interface DeviceOption {
  id: DeviceType
  label: string
  description: string
  icon: LucideIcon
}

export const zoneContainerIds: Record<ZoneId, string> = {
  not_displayed: "zone-not-displayed",
  share: "zone-share",
}

export const zoneTitles: Record<ZoneId, string> = {
  not_displayed: "Not Displayed",
  share: "Share With Coach",
}

export const zoneDescriptions: Record<ZoneId, string> = {
  not_displayed: "Widgets in this area are not visible to the coach during this scenario.",
  share: "Arrange shared widgets from top-left to bottom-right by importance to your coach.",
}

export const deviceOptions: DeviceOption[] = [
  {
    id: "whoop",
    label: "WHOOP",
    description: "Recovery, strain, and coaching-oriented metrics.",
    icon: Activity,
  },
  {
    id: "oura",
    label: "Oura Ring",
    description: "Sleep, readiness, and recovery-focused views.",
    icon: Circle,
  },
  {
    id: "apple-watch",
    label: "Apple Watch",
    description: "General wellness, fitness, and activity summaries.",
    icon: Watch,
  },
  {
    id: "garmin",
    label: "Garmin",
    description: "Training load, performance, and endurance tracking.",
    icon: Navigation,
  },
]
