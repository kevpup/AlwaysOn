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
    id: "championship-roster-head-coach",
    title: "Championship Roster: Head Coach",
    prompt:
      "Imagine you are on the borderline of starting or not starting, and the championship roster will be released in two weeks. Your head coach, who makes the final roster decision, wants to use wearable data to help evaluate athlete readiness.\n\nIn this scenario, what wearable data would you vote to share with your head coach?",
    facilitatorNotes:
      "Axis: high-power decision-maker with roster authority and team performance responsibility.",
  },
  {
    id: "championship-roster-athletic-trainer",
    title: "Championship Roster: Athletic Trainer",
    prompt:
      "Imagine you are on the borderline of starting or not starting, and the championship roster will be released in two weeks. Your athletic trainer wants to use wearable data to help athletes prepare for the end of the season. They are not part of roster decisions and cannot share individual data or insights with the coaching staff.\n\nIn this scenario, what wearable data would you vote to share with your athletic trainer?",
    facilitatorNotes:
      "Axis: lower-power support role with athlete-facing purpose and confidentiality from coaching staff.",
  },
  {
    id: "offseason-training-staff",
    title: "Offseason: Training Staff",
    prompt:
      "Imagine your training staff is implementing wearable technology and wants athlete input on what data should be collected at different points in the season. During the offseason, what wearable data would you want your training staff to be able to access?",
    facilitatorNotes:
      "Set: season/training timing. Axis: lower immediate stakes and longer-term development.",
  },
  {
    id: "critical-season-training-staff",
    title: "Critical Season: Training Staff",
    prompt:
      "Imagine your training staff is implementing wearable technology and wants athlete input on what data should be collected at different points in the season. During a critical part of the season, such as the week leading up to a championship, what wearable data would you want your training staff to be able to access?",
    facilitatorNotes:
      "Set: season/training timing. Axis: higher stakes, urgency, and performance pressure.",
  },
  {
    id: "training-block-training-staff",
    title: "Core Training Block: Training Staff",
    prompt:
      "Imagine your training staff is implementing wearable technology and wants athlete input on what data should be collected at different points in the season. During a core training block, what wearable data would you want your training staff to be able to access?",
    facilitatorNotes:
      "Set: season/training timing. Axis: workload management, adaptation, and fatigue monitoring.",
  },
  {
    id: "sport-injury-training-staff",
    title: "Sport-Related Injury: Training Staff",
    prompt:
      "Imagine your training staff is implementing wearable technology and wants athlete input on what data should be collected in different situations. If you had a sport-related injury, such as a torn ACL, and were going through rehab, what wearable data would you want your training staff to be able to access?",
    facilitatorNotes:
      "Set: medical/recovery context. Axis: sport-related injury, rehab, and return-to-play support.",
  },
  {
    id: "non-sport-medical-event-training-staff",
    title: "Non-Sport Medical Event: Training Staff",
    prompt:
      "Imagine your training staff is implementing wearable technology and wants athlete input on what data should be collected in different situations. If you had a non-sport medical event, such as a concussion outside of sport or mental health concerns, and were going through recovery, what wearable data would you want your training staff to be able to access?",
    facilitatorNotes:
      "Set: medical/recovery context. Axis: private health context outside sport and boundaries around training staff access.",
  },
  {
    id: "sc-coach-limited-tech-experience",
    title: "S&C Coach: Limited Tech Experience",
    prompt:
      "Imagine you have a strength and conditioning coach who has limited experience using wearable technology. They are not usually very engaged with technology, but they have been asked by administration to implement wearable tracking with the team.\n\nIn this scenario, what wearable data would you want to share with this strength and conditioning coach?",
    facilitatorNotes:
      "Set: S&C technology orientation. Axis: limited tech experience and possible data misinterpretation.",
  },
  {
    id: "sc-coach-tech-forward",
    title: "S&C Coach: Highly Bought Into Tech",
    prompt:
      "Imagine you have a strength and conditioning coach who is highly engaged with wearable technology. They expect to factor wearable data into training plans.\n\nIn this scenario, what wearable data would you want to share with this strength and conditioning coach?",
    facilitatorNotes:
      "Set: S&C technology orientation. Axis: high data reliance and possible pressure from frequent data use.",
  },
  {
    id: "sc-coach-transparent-review",
    title: "S&C Coach: Transparent Data Review",
    prompt:
      "Imagine your strength and conditioning coach is thinking about implementing wearable technology. They plan to hold weekly meetings where you sit down together, review your data, and discuss how the data is shaping your training plan.\n\nIn this scenario, what wearable data would you want your strength and conditioning coach to be able to access?",
    facilitatorNotes:
      "Set: S&C transparency and visibility. Axis: transparent individual review and shared interpretation.",
  },
  {
    id: "sc-coach-limited-explanation",
    title: "S&C Coach: Limited Explanation",
    prompt:
      "Imagine your strength and conditioning coach is thinking about implementing wearable technology. You and the coaching staff will both have access to the technology, but the process for how your data will be reviewed and used has not been clearly explained.\n\nIn this scenario, what wearable data would you want your strength and conditioning coach to be able to access?",
    facilitatorNotes:
      "Set: S&C transparency and visibility. Axis: unclear data use process and limited explanation.",
  },
  {
    id: "sc-coach-public-leaderboards",
    title: "S&C Coach: Public Team Leaderboards",
    prompt:
      "Imagine your strength and conditioning coach is thinking about implementing wearable technology. They plan to use the wearable data to create public team leaderboards and set team goals.\n\nIn this scenario, what wearable data would you want your strength and conditioning coach to be able to access and include in team-facing leaderboards?",
    facilitatorNotes:
      "Set: S&C transparency and visibility. Axis: peer visibility, public comparison, and team-facing goals.",
  },
]

export const SCENARIO_GROUPS_TO_ASSIGN = 4

// Optional study override for targeted sampling.
// Add group ids here if a group needs to be forced into every participant's subset.
export const FORCE_INCLUDE_SCENARIO_GROUP_IDS: string[] = []

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
    ],
  },
  {
    id: "medical-recovery-context",
    label: "Medical and recovery context",
    scenarioIds: [
      "sport-injury-training-staff",
      "non-sport-medical-event-training-staff",
    ],
  },
  {
    id: "sc-technology-orientation",
    label: "S&C technology orientation",
    scenarioIds: [
      "sc-coach-limited-tech-experience",
      "sc-coach-tech-forward",
    ],
  },
  {
    id: "sc-transparency-visibility",
    label: "S&C transparency and visibility",
    scenarioIds: [
      "sc-coach-transparent-review",
      "sc-coach-limited-explanation",
      "sc-coach-public-leaderboards",
    ],
  },
]

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

export function getScenariosForParticipant(participantId: string) {
  const forcedGroupIds = new Set(FORCE_INCLUDE_SCENARIO_GROUP_IDS)
  const forcedGroups = scenarioGroups.filter((group) => forcedGroupIds.has(group.id))
  const remainingGroups = scenarioGroups.filter((group) => !forcedGroupIds.has(group.id))
  const shuffledGroups = shuffleWithSeed(remainingGroups, `${participantId}:groups`)
  const groupCount = Math.min(SCENARIO_GROUPS_TO_ASSIGN, scenarioGroups.length)
  const remainingGroupSlots = Math.max(groupCount - forcedGroups.length, 0)
  const selectedGroups = [...forcedGroups, ...shuffledGroups.slice(0, remainingGroupSlots)]
  const selectedScenarioIds = new Set(selectedGroups.flatMap((group) => group.scenarioIds))
  const selectedScenarios = scenarios.filter((scenario) => selectedScenarioIds.has(scenario.id))

  return shuffleWithSeed(selectedScenarios, `${participantId}:scenarios`)
}
