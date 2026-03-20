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
    id: "scenario-01",
    title: "Placeholder Scenario 1",
    prompt:
      "Imagine a near-future coaching situation where sharing wearable data might help with training decisions. Which information would you choose to share with your coaching staff in this moment?",
    facilitatorNotes:
      "Filler scenario. Replace with a concrete sport, timeline, stakes, and audience before running participants.",
  },
  {
    id: "scenario-02",
    title: "Placeholder Scenario 2",
    prompt:
      "Imagine a different context where your performance, recovery, and readiness data could be useful to support staff. Build the dashboard you would feel comfortable sharing for this case.",
    facilitatorNotes:
      "Filler scenario. Consider varying who receives the data, what decision is being made, and whether the sharing is optional or expected.",
  },
  {
    id: "scenario-03",
    title: "Placeholder Scenario 3",
    prompt:
      "Imagine a higher-pressure situation where wearable metrics could influence preparation for an upcoming event. Select only the widgets you believe should be visible to others.",
    facilitatorNotes:
      "Filler scenario. This can later be tuned to test pressure, trust, or consequences of non-sharing.",
  },
]
