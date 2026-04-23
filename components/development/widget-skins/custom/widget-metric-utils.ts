"use client"

export function parseMetricNumber(value: string) {
  const normalized = value.replace(/,/g, "")
  const match = normalized.match(/-?\d+(\.\d+)?/)
  return match ? Number(match[0]) : 0
}

export function parseMetricInteger(value: string) {
  return Math.round(parseMetricNumber(value))
}

export function getSleepScoreStatus(score: number) {
  if (score >= 85) return "Optimal"
  if (score >= 70) return "Good"
  if (score >= 60) return "Fair"
  return "Poor"
}

export function getVo2Status(score: number) {
  if (score >= 52) return "Superior"
  if (score >= 46) return "Excellent"
  if (score >= 42) return "Good"
  if (score >= 38) return "Fair"
  return "Low"
}
