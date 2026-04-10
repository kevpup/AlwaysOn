# TODO

## Spreadsheet Persistence

- Review [app/api/scenarios/route.ts](/Users/kevinchilds/Desktop/PhD Documents/Research/AlwaysOn/ParticipatoryDesign/app/api/scenarios/route.ts) if we revisit Google Sheets persistence.
- The API currently times out after 5 seconds when posting to Google Apps Script.
- A `504` from `/api/scenarios` means the app stopped waiting; the save may have failed or may be in an unknown state.
- If we want to make this more robust later, likely options are:
  - increase or remove the upstream timeout
  - add retry/backoff behavior
  - add clearer save-state feedback in the UI
  - consider a more reliable persistence flow than direct Apps Script dependency

## Group Data Collection Format

- Explore a host-and-audience workflow for live group data collection.
- The host device should generate a QR code that audience members can scan to join a shared session.
- Each audience member should receive their own lightweight session with a single scenario and a simple per-widget interaction model.
- One possible mobile interaction: swipe right to indicate a willingness to share data with a coach, and swipe left to indicate a preference not to share.
- The host device should update in real time with the most frequent audience responses.
- Explore big-screen visualizations that summarize patterns across the group, for example:
  - athlete versus coach preferences
  - clearly shared versus clearly not shared data types
  - highly disputed data types
  - coaching-staff-specific consensus or disagreement views

## Core Demo Development

- Finalize the widget set and refine the content, labels, and interactions for each widget.
- Build out the scenario library so the study can support a broader range of athlete, coach, and other relationship contexts.
- Develop distinct interaction and styling variants for WHOOP, Oura, Garmin, and Apple-inspired experiences.
- Decide how much each platform variant should reflect the real product interaction patterns versus a research-oriented abstraction.
