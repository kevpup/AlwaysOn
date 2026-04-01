export interface Scenario {
  id: string
  title: string
  prompt: string
  facilitatorNotes?: string
}

// Placeholder scenarios for the participatory design study flow.
// Replace these prompts with real scenarios once the study framing is finalized.
export const scenarios: Scenario[] = [
  {
    id: "athlete",
    title: "Scenario 1: Student-Athlete",
    prompt:
      "You are asked by your coaching staff to use a new wearable. What metrics would you feel comfortable sharing?",
  },
  {
    id: "coach",
    title: "Scenario 2: Coach",
    prompt:
      "You buy the team platform. Which metrics do you want access to as a coach?",
    facilitatorNotes:
      "Prompt for usefulness, oversight, and decision-making. The goal is to surface what staff would want to see.",
  },
]
