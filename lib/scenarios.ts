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

export const studentAthleteScenarios: Scenario[] = [
  {
    id: "championship-roster-head-coach",
    title: "Championship Roster Decision: Primary Coach",
    prompt:
      "Imagine you are on the borderline of starting or not starting, and the championship roster will be released in two weeks. The primary coach responsible for your training during this period is also part of making the final roster decision and would likely be the person reviewing and interpreting your wearable data.\n\nIn this scenario, what wearable data would you vote to share with this primary coach?",
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

export const studentAthleteScenarioGroups: ScenarioGroup[] = [
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

export const coachingStaffScenarios: Scenario[] = [
  {
    id: "offseason-data-access",
    title: "Data Access During the Offseason",
    prompt:
      "Imagine your program is implementing wearable technology and is deciding what student-athlete data coaching staff may want to access during different points in the season. During the offseason, what, if any, wearable data would you want to view from the student-athletes you support?",
  },
  {
    id: "critical-season-data-access",
    title: "Data Access During a Critical Part of the Season",
    prompt:
      "Imagine your program is implementing wearable technology and is deciding what student-athlete data coaching staff may want to access during different points in the season. During a critical part of the season, such as the week leading up to a championship, what, if any, wearable data would you want to view from the student-athletes you support?",
  },
  {
    id: "core-training-block-data-access",
    title: "Data Access During a Core Training Block",
    prompt:
      "Imagine your program is implementing wearable technology and is deciding what student-athlete data coaching staff may want to access during different points in the season. During a core training block, what, if any, wearable data would you want to view from the student-athletes you support?",
  },
  {
    id: "sport-injury-data-access",
    title: "Data Access During a Sport-Related Injury",
    prompt:
      "Imagine your program is implementing wearable technology and is deciding what student-athlete data coaching staff may want to access in different situations. If one of your student-athletes experienced a sport-related injury, such as a torn ACL, and was going through rehab, what, if any, wearable data would you want to view to support that student-athlete?",
  },
  {
    id: "data-driven-athlete-access",
    title: "Data Access for a Data-Driven Student-Athlete",
    prompt:
      "Imagine one of the student-athletes you support is highly engaged with wearable technology. They like reviewing their numbers, tracking trends, and using data to understand their training, recovery, and performance.\n\nIn this scenario, what, if any, wearable data would you want to view from this student-athlete? And how would you want to use it most effectively?",
  },
  {
    id: "intuitive-athlete-access",
    title: "Data Access for an Intuitive Student-Athlete",
    prompt:
      "Imagine one of the student-athletes you support does not rely heavily on wearable data to understand their training, recovery, or performance. They may prefer to focus more on how they feel and on guidance from staff rather than studying the data themselves.\n\nIn this scenario, the student-athlete still wears a wearable device. What, if any, wearable data would you want to view from this student-athlete? And how would you want to use it most effectively?",
  },
]

export const coachingStaffScenarioGroups: ScenarioGroup[] = [
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
    scenarioIds: ["data-driven-athlete-access", "intuitive-athlete-access"],
  },
]

function shuffle<T>(items: T[]) {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const current = result[index]
    result[index] = result[swapIndex]
    result[swapIndex] = current
  }
  return result
}

export function getScenariosForProtocol(protocol: "student-athlete" | "coaching-staff") {
  const protocolScenarios = protocol === "coaching-staff" ? coachingStaffScenarios : studentAthleteScenarios
  const groups = protocol === "coaching-staff" ? coachingStaffScenarioGroups : studentAthleteScenarioGroups
  const scenarioById = new Map(protocolScenarios.map((scenario) => [scenario.id, scenario]))
  let orderedGroups: ScenarioGroup[]

  if (protocol === "coaching-staff") {
    const [timingGroup, dataOrientationGroup] = groups
    orderedGroups = Math.random() < 2 / 3
      ? [timingGroup, dataOrientationGroup]
      : [dataOrientationGroup, timingGroup]
  } else {
    orderedGroups = shuffle(groups)
  }

  return orderedGroups.flatMap((group) =>
    shuffle(group.scenarioIds)
      .map((scenarioId) => scenarioById.get(scenarioId))
      .filter((scenario): scenario is Scenario => Boolean(scenario))
  )
}
