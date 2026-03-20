"use client"

import { sleepScoreData } from "@/lib/mock-data"
import { ScoreRingWidget } from "@/components/widgets/widget-primitives"

export function SleepScoreWidget() {
  const latest = sleepScoreData[sleepScoreData.length - 1].value
  return <ScoreRingWidget score={latest} label="Good sleep" color="hsl(210, 75%, 60%)" />
}
