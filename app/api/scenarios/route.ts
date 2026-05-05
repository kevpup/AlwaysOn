import { NextResponse } from "next/server"
import { z } from "zod"

import { scenarios } from "@/lib/scenarios"
import { allWidgets, defaultWidgets } from "@/lib/widget-selection"

const DEVICE_TYPES = ["whoop", "oura", "apple-watch", "garmin"] as const
const SPORT_CATEGORIES = ["mens", "womens"] as const
const MENSTRUAL_CYCLE_WIDGET_TITLE = "Cycle Tracking"
const MAX_BODY_BYTES = 64 * 1024
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 30
const allowedScenarioIds = new Set(scenarios.map((scenario) => scenario.id))
const allowedWidgetTitles = new Set(allWidgets.map((widget) => widget.title))
const requestTimestampsByClient = new Map<string, number[]>()

const deviceTypeSchema = z.enum(DEVICE_TYPES)
const sportCategorySchema = z.enum(SPORT_CATEGORIES)

const scenarioDecisionRowSchema = z.object({
  participantName: z.string().trim().min(1).max(120),
  sportCategory: sportCategorySchema,
  deviceType: deviceTypeSchema,
  scenarioId: z.string().trim().min(1).max(64),
  widgetTitle: z.string().trim().min(1).max(120),
  shared: z.boolean(),
}).strict()

const persistRequestSchema = z.object({
  sessionId: z.string().trim().min(1).max(120),
  participantName: z.string().trim().min(1).max(120),
  sportCategory: sportCategorySchema,
  deviceType: deviceTypeSchema,
  rows: z.array(scenarioDecisionRowSchema).min(1).max(defaultWidgets.length),
}).strict()

function jsonNoStore(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  })
}

function isSameOriginRequest(request: Request) {
  const requestOrigin = new URL(request.url).origin
  const origin = request.headers.get("origin")
  const referer = request.headers.get("referer")

  if (origin) {
    return origin === requestOrigin
  }

  if (referer) {
    try {
      return new URL(referer).origin === requestOrigin
    } catch {
      return false
    }
  }

  return false
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  const realIp = request.headers.get("x-real-ip")?.trim()
  return forwardedFor || realIp || "unknown-client"
}

function isRateLimited(request: Request) {
  const clientKey = getClientKey(request)
  const now = Date.now()
  const recentRequests = (requestTimestampsByClient.get(clientKey) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  )

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestTimestampsByClient.set(clientKey, recentRequests)
    return true
  }

  recentRequests.push(now)
  requestTimestampsByClient.set(clientKey, recentRequests)
  return false
}

function hasValidScenarioState(
  sportCategory: (typeof SPORT_CATEGORIES)[number],
  rows: z.infer<typeof scenarioDecisionRowSchema>[]
) {
  const uniqueScenarioIds = new Set(rows.map((row) => row.scenarioId))
  const uniqueWidgetTitles = new Set(rows.map((row) => row.widgetTitle))

  if (uniqueScenarioIds.size !== 1 || uniqueWidgetTitles.size !== rows.length) {
    return false
  }

  for (const row of rows) {
    if (!allowedScenarioIds.has(row.scenarioId) || !allowedWidgetTitles.has(row.widgetTitle)) {
      return false
    }

    if (row.sportCategory !== sportCategory) {
      return false
    }

    if (sportCategory !== "womens" && row.widgetTitle === MENSTRUAL_CYCLE_WIDGET_TITLE) {
      return false
    }
  }

  return true
}

async function parseRequestBody(request: Request) {
  const contentType = request.headers.get("content-type") ?? ""

  if (!contentType.toLowerCase().startsWith("application/json")) {
    return {
      error: jsonNoStore({ error: "Requests must use application/json." }, 415),
      data: null,
    }
  }

  const rawBody = await request.text()

  if (rawBody.length === 0) {
    return {
      error: jsonNoStore({ error: "Request body is required." }, 400),
      data: null,
    }
  }

  if (rawBody.length > MAX_BODY_BYTES) {
    return {
      error: jsonNoStore({ error: "Request body is too large." }, 413),
      data: null,
    }
  }

  let parsedBody: unknown

  try {
    parsedBody = JSON.parse(rawBody)
  } catch {
    return {
      error: jsonNoStore({ error: "Invalid JSON body." }, 400),
      data: null,
    }
  }

  const result = persistRequestSchema.safeParse(parsedBody)

  if (!result.success) {
    return {
      error: jsonNoStore({ error: "Invalid scenario payload." }, 400),
      data: null,
    }
  }

  if (!hasValidScenarioState(result.data.sportCategory, result.data.rows)) {
    return {
      error: jsonNoStore({ error: "Scenario payload failed validation." }, 400),
      data: null,
    }
  }

  return {
    error: null,
    data: result.data,
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return jsonNoStore({ error: "Cross-origin requests are not allowed." }, 403)
  }

  if (isRateLimited(request)) {
    return jsonNoStore({ error: "Too many requests. Please try again shortly." }, 429)
  }

  try {
    const parsedRequest = await parseRequestBody(request)

    if (parsedRequest.error) {
      return parsedRequest.error
    }

    if (!parsedRequest.data) {
      return jsonNoStore({ error: "Invalid scenario payload." }, 400)
    }

    return jsonNoStore({ ok: true, persisted: false })
  } catch (error) {
    console.error("Failed to validate research scenario rows", error)
    return jsonNoStore({ error: "Failed to persist scenario rows." }, 500)
  }
}
