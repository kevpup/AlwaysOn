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
    id: "1",
    title: "TEST1",
    prompt:
      "Imagine a near-future coaching situation where sharing wearable data might help with training decisions. Which information would you choose to share with your coaching staff in this moment?",
    facilitatorNotes:
      "N/A",
  },
  {
    id: "2",
    title: "TEST2",
    prompt:
      "Imagine a different context where your performance, recovery, and readiness data could be useful to support staff. Build the dashboard you would feel comfortable sharing for this case.",
    facilitatorNotes:
      "NA.",
  },

]
