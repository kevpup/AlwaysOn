"use client"

import { type DeviceType, type StudyProtocol, type ZoneId } from "@/components/study/types"

export interface DeviceOption {
  id: DeviceType
  label: string
  description: string
  iconPath: string
}

export const zoneContainerIds: Record<ZoneId, string> = {
  not_displayed: "zone-not-displayed",
  share: "zone-share",
}

export const zoneTitles: Record<ZoneId, string> = {
  not_displayed: "Not Displayed",
  share: "Share With Staff",
}

export const zoneDescriptions: Record<ZoneId, string> = {
  not_displayed: "Widgets in this area are not visible to staff during this scenario.",
  share: "Arrange shared widgets for staff during this scenario.",
}

export function getZoneTitle(zoneId: ZoneId, protocol: StudyProtocol) {
  if (protocol === "coaching-staff" && zoneId === "share") return "Valuable to Coaching Staff"
  return zoneTitles[zoneId]
}

export function getZoneDescription(zoneId: ZoneId, protocol: StudyProtocol) {
  if (protocol === "coaching-staff") {
    return zoneId === "not_displayed"
      ? "Widgets in this area are not included in the coaching staff view for this scenario."
      : "Arrange the wearable information that would be valuable for coaching staff in this scenario."
  }
  return zoneDescriptions[zoneId]
}

export const deviceOptions: DeviceOption[] = [
  {
    id: "whoop",
    label: "WHOOP",
    description: "Recovery, strain, and coaching-oriented metrics.",
    iconPath: "/device-logos/whoop.png",
  },
  {
    id: "oura",
    label: "Oura Ring",
    description: "Sleep, readiness, and recovery-focused views.",
    iconPath: "/device-logos/oura.png",
  },
  {
    id: "apple-watch",
    label: "Apple Watch",
    description: "General wellness, fitness, and activity summaries.",
    iconPath: "/device-logos/apple.png",
  },
  {
    id: "garmin",
    label: "Garmin",
    description: "Training load, performance, and endurance tracking.",
    iconPath: "/device-logos/garmin.png",
  },
]
