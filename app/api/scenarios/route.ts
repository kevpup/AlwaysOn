import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

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

function sanitizeFilePart(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function escapeCsvValue(value: string | number | boolean) {
  const text = String(value)
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replace(/"/g, '""')}"`
  }
  return text
}

function buildCsv(rows: ScenarioDecisionRow[]) {
  const headers = ["participantName", "scenarioId", "widgetTitle", "shared", "rank"]

  return [
    headers.join(","),
    ...rows.map((row) =>
      [
        escapeCsvValue(row.participantName),
        escapeCsvValue(row.scenarioId),
        escapeCsvValue(row.widgetTitle),
        escapeCsvValue(row.shared),
        escapeCsvValue(row.rank),
      ].join(",")
    ),
  ].join("\n")
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PersistRequestBody
    const participantName = body.participantName?.trim()
    const sessionId = body.sessionId?.trim()
    const rows = Array.isArray(body.rows) ? body.rows : []

    if (!participantName || !sessionId) {
      return NextResponse.json({ error: "Missing participant name or session id." }, { status: 400 })
    }

    const scenariosDir = path.join(process.cwd(), "scenarios")
    await mkdir(scenariosDir, { recursive: true })

    const fileName = `${sanitizeFilePart(participantName) || "participant"}-${sanitizeFilePart(sessionId)}.csv`
    const filePath = path.join(scenariosDir, fileName)

    await writeFile(filePath, buildCsv(rows), "utf8")

    return NextResponse.json({ ok: true, fileName })
  } catch (error) {
    console.error("Failed to persist scenario CSV", error)
    return NextResponse.json({ error: "Failed to persist scenario CSV." }, { status: 500 })
  }
}
