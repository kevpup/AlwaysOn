# Scenario Decisions

This note documents design decisions made while developing the research scenario set.

## Scenario Pool

- The study uses a pool of 11 scenarios.
- The scenarios are organized into 4 conceptual groups so participants can receive subsets while preserving within-group comparison.
- The scenario groups are:
  - Championship roster power relationship
  - Season and training timing
  - Strength and conditioning technology orientation
  - Strength and conditioning transparency and visibility

## Subset Assignment

- Participants receive up to 7 scenarios.
- All scenarios in a selected group are included.
- Scenario groups are selected by participant ID until the 7-scenario cap is reached.
- Scenario groups are shown as contiguous blocks rather than fully randomizing all selected scenarios together.
- The order of scenarios within each selected group is randomized for each participant.
- Assignment is seeded by participant ID so the same participant ID receives the same subset and order if they refresh or restart.
- The maximum number of assigned scenarios is intentionally easy to change if the scenario burden feels too high.
- The code also includes a place to force specific scenario groups into every participant's subset if later data collection needs more coverage for a group.

## Voting Framing

- The participant-facing script uses an anonymous team vote framing.
- The scenario prompts themselves end with direct voting language such as "what wearable data would you vote to share."
- The anonymous vote language was moved into the interviewer script rather than repeated in every scenario prompt.
- This framing is intended to reduce concern about coach judgment and help participants focus on what they would want included.

## Scenario Group 1: Championship Roster Power Relationship

- This pair compares data sharing during the same high-stakes roster context with different recipients.
- Scenario 1 uses the head coach as a high-power decision-maker who has final roster authority.
- Scenario 2 uses the athletic trainer as a lower-power support role.
- The athletic trainer scenario includes a confidentiality condition: the trainer is not part of roster decisions and cannot share individual data or insights with coaching staff.
- The goal is to map real-world roles rather than isolate a single variable experimentally.
- The intended contrast is high power with team decision-making responsibility versus lower power with athlete-facing support.
- The role was kept as "athletic trainer" rather than changing to "confidential data analyst" because it better fits the real-world athletics context.

## Scenario Group 2: Season and Training Timing

- This set compares the same general recipient context across different points in the season and athlete availability.
- The scenarios include offseason, critical season, core training block, and sport-related injury/rehab.
- The offseason scenario captures lower immediate stakes and longer-term development.
- The critical season scenario captures urgency, championship pressure, and elevated performance stakes.
- The core training block scenario captures workload management, adaptation, and fatigue monitoring.
- The sport-related injury example uses a torn ACL and rehab.
- The sport-related injury scenario was moved into the season and training timing group because it still centers the training staff relationship and athlete readiness across a season context.
- The non-sport personal medical event scenario was removed from the active scenario pool.
- Eating disorder was considered as an example but not used in the final prompt because it could be too emotionally loaded and might shift participant attention away from wearable data privacy.

## Scenario Group 3: Strength and Conditioning Technology Orientation

- This pair compares the S&C coach's orientation toward wearable technology.
- The limited-tech-experience scenario avoids the phrase "old school" to reduce age-coded or judgmental language.
- The final wording focuses on limited experience using wearable technology and implementation pressure from administration.
- The highly bought-in scenario focuses on a coach who expects wearable data to factor into training plans.
- Language about frequently discussing data with the team was removed from this scenario because it overlaps more directly with the transparency and visibility group.

## Scenario Group 4: Strength and Conditioning Transparency and Visibility

- This set compares transparent review, limited explanation, and public team-facing use.
- The transparent review scenario includes weekly meetings where the athlete and S&C coach review data together and discuss how it shapes the training plan.
- The limited explanation scenario was intentionally worded neutrally.
- Instead of saying the coach "won't discuss" data use, the final version says the process for how data will be reviewed and used has not been clearly explained.
- The public leaderboard scenario includes public team leaderboards and team goals.
- The final question for the public leaderboard scenario asks what data the S&C coach should be able to access and include in team-facing leaderboards.
- This wording preserves the key issue of peer visibility and comparison, not just staff access.

## Design Rationale

- Data granularity will be explored through interview discussion rather than embedded directly into each scenario.
- Consequences of data use were identified as an important axis, especially roster decisions and public team comparison.
- Scenario prompts were shortened where possible so participants can understand the scenario without being overloaded.
- Prompts aim to include one clear situation, one clear recipient, one clear reason for access, and one clear decision.
- Widget order is randomized once per participant session to reduce ordering effects without reshuffling between scenarios.
- Within a participant session, the same widget order is reused for each new scenario so the participant does not have to repeatedly relearn the dashboard layout.
- Widget sharing selections persist across scenarios within the same scenario group so the first scenario in a group sets the baseline and later scenarios become add/remove adjustments.
- Widget sharing selections reset when the participant moves into a new scenario group to avoid carrying decisions across conceptually different question categories.
