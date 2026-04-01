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
    id: "coach",
    title: "Scenario 1: Coach",
    prompt:
      "As a coaching staff, you purchase a technology that you see the championship team use. What data would you like to see?",
  },
  {
    id: "athlete",
    title: "Scenario 2: Student-Athlete",
    prompt:
      "You are asked by your coaching staff to use a new wearable. What metrics would you feel comfortable sharing?",
  },
]
