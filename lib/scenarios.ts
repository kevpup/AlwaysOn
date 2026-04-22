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

export interface ScenarioAssignmentPlan {
  groupIds: string[]
  weight: number
}

export const scenarios: Scenario[] = [
  {
    id: "championship-roster-head-coach",
    title: "Championship Roster Decision: Head Coach",
    prompt:
      "Imagine you are on the borderline of starting or not starting, and the championship roster will be released in two weeks. The coach making the final roster decision wants to use wearable data to help evaluate athlete readiness.\n\nIn this scenario, what wearable data would you vote to share with this decision-making coach?",
    facilitatorNotes:
      "Axis: high-power decision-maker with roster authority and team performance responsibility.",
  },
  {
    id: "championship-roster-athletic-trainer",
    title: "Championship Roster Decision: Athletic Trainer",
    prompt:
      "Imagine you are on the borderline of starting or not starting, and the championship roster will be released in two weeks. Your athletic trainer wants to use wearable data to help athletes prepare for the end of the season. They are not part of roster decisions and cannot share individual data or insights with the coach making roster decisions.\n\nIn this scenario, what wearable data would you vote to share with your athletic trainer?",
    facilitatorNotes:
      "Axis: lower-power support role with athlete-facing purpose and confidentiality from the coach making roster decisions.",
  },
  {
    id: "offseason-training-staff",
    title: "Data Sharing During the Offseason",
    prompt:
      "Imagine the person in charge of your day-to-day training is implementing wearable technology and wants athlete input on what data should be collected at different points in the season. During the offseason, what wearable data would you want this person to be able to access?",
    facilitatorNotes:
      "Set: season/training timing. Axis: lower immediate stakes and longer-term development.",
  },
  {
    id: "critical-season-training-staff",
    title: "Data Sharing During a Critical Part of the Season",
    prompt:
      "Imagine the person in charge of your day-to-day training is implementing wearable technology and wants athlete input on what data should be collected at different points in the season. During a critical part of the season, such as the week leading up to a championship, what wearable data would you want this person to be able to access?",
    facilitatorNotes:
      "Set: season/training timing. Axis: higher stakes, urgency, and performance pressure.",
  },
  {
    id: "training-block-training-staff",
    title: "Data Sharing During a Core Training Block",
    prompt:
      "Imagine the person in charge of your day-to-day training is implementing wearable technology and wants athlete input on what data should be collected at different points in the season. During a core training block, what wearable data would you want this person to be able to access?",
    facilitatorNotes:
      "Set: season/training timing. Axis: workload management, adaptation, and fatigue monitoring.",
  },
  {
    id: "sport-injury-training-staff",
    title: "Data Sharing During a Sport-Related Injury",
    prompt:
      "Imagine the person in charge of your day-to-day training is implementing wearable technology and wants athlete input on what data should be collected in different situations. If you had a sport-related injury, such as a torn ACL, and were going through rehab, what wearable data would you want this person to be able to access?",
    facilitatorNotes:
      "Set: season/training timing. Axis: sport-related injury, rehab, and return-to-play support.",
  },
  {
    id: "sc-coach-limited-tech-experience",
    title: "Data Sharing with Less-Engaged Training Staff",
    prompt:
      "Imagine the person in charge of your day-to-day training has limited experience using wearable technology. They are not usually very engaged with technology, but they have been asked by administration to implement wearable tracking with the team.\n\nIn this scenario, what wearable data would you want to share with this person?",
    facilitatorNotes:
      "Set: day-to-day training technology orientation. Axis: limited tech experience and possible data misinterpretation.",
  },
  {
    id: "sc-coach-tech-forward",
    title: "Data Sharing with Tech-Forward Training Staff",
    prompt:
      "Imagine the person in charge of your day-to-day training is highly engaged with wearable technology. They expect to factor wearable data into training plans.\n\nIn this scenario, what wearable data would you want to share with this person?",
    facilitatorNotes:
      "Set: day-to-day training technology orientation. Axis: high data reliance and possible pressure from frequent data use.",
  },
  {
    id: "sc-coach-transparent-review",
    title: "Transparent Data Sharing with Training Staff",
    prompt:
      "Imagine the person in charge of your day-to-day training is thinking about implementing wearable technology. They plan to hold weekly meetings where you sit down together, review your data, and discuss how the data is shaping your training plan.\n\nIn this scenario, what wearable data would you want this person to be able to access?",
    facilitatorNotes:
      "Set: day-to-day training transparency and visibility. Axis: transparent individual review and shared interpretation.",
  },
  {
    id: "sc-coach-limited-explanation",
    title: "Opaque Data Sharing with Training Staff",
    prompt:
      "Imagine the person in charge of your day-to-day training is thinking about implementing wearable technology. You and this person will both have access to the technology, but the process for how your data will be reviewed and used has not been clearly explained.\n\nIn this scenario, what wearable data would you want this person to be able to access?",
    facilitatorNotes:
      "Set: day-to-day training transparency and visibility. Axis: unclear data use process and limited explanation.",
  },
  {
    id: "sc-coach-public-leaderboards",
    title: "Publicly Visible Data Sharing",
    prompt:
      "Imagine the person in charge of your day-to-day training is thinking about implementing wearable technology. They plan to use the wearable data to create team leaderboards and set team goals for everyone on the team to view.\n\nIn this scenario, what wearable data would you want this person to be able to access and include in team-facing leaderboards?",
    facilitatorNotes:
      "Set: day-to-day training transparency and visibility. Axis: peer visibility, public comparison, and team-facing goals.",
  },
]

export const scenarioGroups: ScenarioGroup[] = [
  {
    id: "championship-roster-power",
    label: "Championship roster power relationship",
    scenarioIds: [
      "championship-roster-head-coach",
      "championship-roster-athletic-trainer",
    ],
  },
  {
    id: "season-training-timing",
    label: "Season and training timing",
    scenarioIds: [
      "offseason-training-staff",
      "critical-season-training-staff",
      "training-block-training-staff",
      "sport-injury-training-staff",
    ],
  },
  {
    id: "sc-technology-orientation",
    label: "Day-to-day training technology orientation",
    scenarioIds: [
      "sc-coach-limited-tech-experience",
      "sc-coach-tech-forward",
    ],
  },
  {
    id: "sc-transparency-visibility",
    label: "Day-to-day training transparency and visibility",
    scenarioIds: [
      "sc-coach-transparent-review",
      "sc-coach-limited-explanation",
      "sc-coach-public-leaderboards",
    ],
  },
]

export const MAX_SCENARIOS_TO_ASSIGN = 7

export const scenarioAssignmentPlans: ScenarioAssignmentPlan[] = [
  {
    groupIds: ["championship-roster-power", "season-training-timing"],
    weight: 1,
  },
  {
    groupIds: ["season-training-timing", "sc-technology-orientation"],
    weight: 1,
  },
  {
    groupIds: ["season-training-timing", "sc-transparency-visibility"],
    weight: 1,
  },
  {
    groupIds: [
      "championship-roster-power",
      "sc-technology-orientation",
      "sc-transparency-visibility",
    ],
    weight: 2,
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

function chooseWeightedPlan(seed: string) {
  const validPlans = scenarioAssignmentPlans.filter((plan) => {
    const scenarioCount = plan.groupIds.reduce((total, groupId) => {
      const group = scenarioGroups.find((candidate) => candidate.id === groupId)
      return total + (group?.scenarioIds.length ?? 0)
    }, 0)

    return scenarioCount <= MAX_SCENARIOS_TO_ASSIGN && plan.weight > 0
  })

  if (validPlans.length === 0) {
    return null
  }

  const totalWeight = validPlans.reduce((total, plan) => total + plan.weight, 0)
  const random = createSeededRandom(seed)
  let threshold = random() * totalWeight

  for (const plan of validPlans) {
    threshold -= plan.weight

    if (threshold <= 0) {
      return plan
    }
  }

  return validPlans[validPlans.length - 1]
}

export function getScenariosForParticipant(participantId: string) {
  const selectedPlan = chooseWeightedPlan(`${participantId}:assignment-plan`)
  const selectedGroups = selectedPlan
    ? shuffleWithSeed(
      selectedPlan.groupIds
        .map((groupId) => scenarioGroups.find((group) => group.id === groupId))
        .filter((group): group is ScenarioGroup => Boolean(group)),
      `${participantId}:selected-groups`
    )
    : []

  return selectedGroups.flatMap((group) =>
    shuffleWithSeed(group.scenarioIds, `${participantId}:scenarios:${group.id}`)
      .map((scenarioId) => scenarioById.get(scenarioId))
      .filter((scenario): scenario is Scenario => Boolean(scenario))
  )
}

export function getScenarioGroupId(scenarioId: string) {
  return scenarioGroupIdByScenarioId.get(scenarioId) ?? null
}
