export interface Scenario {
  id: string
  title: string
  prompt: string
  facilitatorNotes?: string
}

export interface ScenarioGroup {
  id: string
  label: string
  scenarioIds: string[]
}

export const scenarios: Scenario[] = [
  {
    id: "offseason-data-access",
    title: "Data Access During the Offseason",
    prompt:
      "Imagine your program is implementing wearable technology and is deciding what student-athlete data coaching staff may want to access during different points in the season. During the offseason, what, if any, wearable data would you want to view from the student-athletes you support?",
    facilitatorNotes:
      "Group 1: season and situational timing. Axis: offseason context, development priorities, and lower immediate competitive stakes.",
  },
  {
    id: "critical-season-data-access",
    title: "Data Access During a Critical Part of the Season",
    prompt:
      "Imagine your program is implementing wearable technology and is deciding what student-athlete data coaching staff may want to access during different points in the season. During a critical part of the season, such as the week leading up to a championship, what, if any, wearable data would you want to view from the student-athletes you support?",
    facilitatorNotes:
      "Group 1: season and situational timing. Axis: high-stakes competitive period, readiness, and performance pressure.",
  },
  {
    id: "core-training-block-data-access",
    title: "Data Access During a Core Training Block",
    prompt:
      "Imagine your program is implementing wearable technology and is deciding what student-athlete data coaching staff may want to access during different points in the season. During a core training block, what, if any, wearable data would you want to view from the student-athletes you support?",
    facilitatorNotes:
      "Group 1: season and situational timing. Axis: workload management, adaptation, and fatigue monitoring during structured training.",
  },
  {
    id: "sport-injury-data-access",
    title: "Data Access During a Sport-Related Injury",
    prompt:
      "Imagine your program is implementing wearable technology and is deciding what student-athlete data coaching staff may want to access in different situations. If one of your student-athletes experienced a sport-related injury, such as a torn ACL, and was going through rehab, what, if any, wearable data would you want to view to support that student-athlete?",
    facilitatorNotes:
      "Group 1: season and situational timing. Axis: injury rehabilitation, return-to-play support, and appropriate monitoring during recovery.",
  },
  {
    id: "data-driven-athlete-access",
    title: "Data Access for a Data-Driven Student-Athlete",
    prompt:
      "Imagine one of the student-athletes you support is highly engaged with wearable technology. They like reviewing their numbers, tracking trends, and using data to understand their training, recovery, and performance.\n\nIn this scenario, what, if any, wearable data would you want to view from this student-athlete? And how would you want to use it most effectively?",
    facilitatorNotes:
      "Group 2: student-athlete orientation toward data. Axis: high athlete engagement, collaborative interpretation, and interest in metric-based feedback.",
  },
  {
    id: "less-data-focused-athlete-access",
    title: "Data Access for an Intuitive Student-Athlete",
    prompt:
      "Imagine one of the student-athletes you support does not rely heavily on wearable data to understand their training, recovery, or performance. They may prefer to focus more on how they feel and on guidance from staff rather than studying the data themselves.\n\nIn this scenario, the student-athlete still wears a wearable device. What, if any, wearable data would you want to view from this student-athlete? And how would you want to use it most effectively?",
    facilitatorNotes:
      "Group 2: student-athlete orientation toward data. Axis: lower athlete engagement, staff interpretation, and reduced appetite for detailed metric review.",
  },
]

export const scenarioGroups: ScenarioGroup[] = [
  {
    id: "season-situation-timing",
    label: "Season and situational timing",
    scenarioIds: [
      "offseason-data-access",
      "critical-season-data-access",
      "core-training-block-data-access",
      "sport-injury-data-access",
    ],
  },
  {
    id: "student-athlete-data-orientation",
    label: "Student-athlete orientation toward data",
    scenarioIds: [
      "data-driven-athlete-access",
      "less-data-focused-athlete-access",
    ],
  },
]

const scenarioById = new Map(scenarios.map((scenario) => [scenario.id, scenario]))
const scenarioGroupIdByScenarioId = new Map(
  scenarioGroups.flatMap((group) => group.scenarioIds.map((scenarioId) => [scenarioId, group.id] as const))
)

function hashSeed(seed: string) {
  let hash = 2166136261

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }

  return hash >>> 0
}

function createSeededRandom(seed: string) {
  let state = hashSeed(seed) || 1

  return () => {
    state = Math.imul(1664525, state) + 1013904223
    return (state >>> 0) / 4294967296
  }
}

function shuffleWithSeed<T>(items: T[], seed: string) {
  const random = createSeededRandom(seed)
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const current = shuffled[index]
    shuffled[index] = shuffled[swapIndex]
    shuffled[swapIndex] = current
  }

  return shuffled
}

function getOrderedScenarioGroups(participantId: string) {
  const [group1, group2] = scenarioGroups

  if (!group1 || !group2) {
    return scenarioGroups
  }

  // Weight the first group order 2:1 so each individual scenario has an equal
  // likelihood of appearing first across the six-scenario set.
  const random = createSeededRandom(`${participantId}:group-order`)
  return random() < 2 / 3 ? [group1, group2] : [group2, group1]
}

export function getScenariosForParticipant(participantId: string) {
  const orderedGroups = getOrderedScenarioGroups(participantId)

  return orderedGroups.flatMap((group) =>
    shuffleWithSeed(group.scenarioIds, `${participantId}:scenarios:${group.id}`)
      .map((scenarioId) => scenarioById.get(scenarioId))
      .filter((scenario): scenario is Scenario => Boolean(scenario))
  )
}

export function getScenarioGroupId(scenarioId: string) {
  return scenarioGroupIdByScenarioId.get(scenarioId) ?? null
}
