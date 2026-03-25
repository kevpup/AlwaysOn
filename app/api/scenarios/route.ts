import { NextResponse } from "next/server"

interface ScenarioDecisionRow {
  participantName: string
  deviceType: "whoop" | "oura" | "apple-watch" | "garmin"
  scenarioId: string
  widgetTitle: string
  shared: boolean
  rank: number | ""
}

interface PersistRequestBody {
  sessionId: string
  participantName: string
  deviceType: "whoop" | "oura" | "apple-watch" | "garmin"
  rows: ScenarioDecisionRow[]
}

interface ReplaceScenarioPayload {
  action: "replaceScenario"
  sessionId: string
  participantName: string
  deviceType: "whoop" | "oura" | "apple-watch" | "garmin"
  scenarioId: string
  rows: Array<{
    timestamp: string
    sessionId: string
    participantName: string
    deviceType: "whoop" | "oura" | "apple-watch" | "garmin"
    scenarioId: string
    widgetTitle: string
    shared: boolean
    rank: number | ""
  }>
}

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxQhibrsN32hk95XQgxqBCM1_r_iHtK8HoOY6QbE1KgZb9H5UnP5pEmXChgdEYZ_k9X/exec"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PersistRequestBody
    const participantName = body.participantName?.trim()
    const sessionId = body.sessionId?.trim()
    const deviceType = body.deviceType
    const rows = Array.isArray(body.rows) ? body.rows : []
    const scenarioIds = Array.from(new Set(rows.map((row) => row.scenarioId?.trim()).filter(Boolean)))

    if (!participantName || !sessionId || !deviceType) {
      return NextResponse.json({ error: "Missing participant name, device type, or session id." }, { status: 400 })
    }

    if (scenarioIds.length !== 1) {
      return NextResponse.json(
        { error: "Scenario saves must contain rows for exactly one scenario." },
        { status: 400 }
      )
    }

    const payload: ReplaceScenarioPayload = {
      action: "replaceScenario",
      sessionId,
      participantName,
      deviceType,
      scenarioId: scenarioIds[0],
      rows: rows.map((row) => ({
        timestamp: new Date().toISOString(),
        sessionId,
        participantName: row.participantName,
        deviceType: row.deviceType,
        scenarioId: row.scenarioId,
        widgetTitle: row.widgetTitle,
        shared: row.shared,
        rank: row.rank,
      })),
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    const responseText = await response.text()

    if (!response.ok) {
      return NextResponse.json(
        { error: "Google Sheet request failed.", details: responseText },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true, upstream: responseText })
  } catch (error) {
    console.error("Failed to persist scenario rows to Google Sheets", error)
    return NextResponse.json({ error: "Failed to persist scenario rows." }, { status: 500 })
  }
}
