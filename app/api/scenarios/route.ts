import { NextResponse } from "next/server"

interface ScenarioDecisionRow {
  participantName: string
  scenarioId: string
  widgetTitle: string
  shared: boolean
  rank: number | ""
}

interface PersistRequestBody {
  sessionId: string
  participantName: string
  rows: ScenarioDecisionRow[]
}

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxQhibrsN32hk95XQgxqBCM1_r_iHtK8HoOY6QbE1KgZb9H5UnP5pEmXChgdEYZ_k9X/exec"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PersistRequestBody
    const participantName = body.participantName?.trim()
    const sessionId = body.sessionId?.trim()
    const rows = Array.isArray(body.rows) ? body.rows : []

    if (!participantName || !sessionId) {
      return NextResponse.json({ error: "Missing participant name or session id." }, { status: 400 })
    }

    const payload = {
      sessionId,
      participantName,
      rows: rows.map((row) => ({
        timestamp: new Date().toISOString(),
        sessionId,
        participantName: row.participantName,
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
