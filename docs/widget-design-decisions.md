# Widget Design Decisions

This note tracks design decisions for the widget skin development process.

## Development Testbed

- A development-only widget testbed is available from the first screen of the app.
- The testbed is separate as a screen, but it now uses the same widget rendering registry as the participant study flow.
- Changes made to `WidgetSkinCard`, platform base skins, or custom platform/widget skins should be visible in both development mode and the participant study flow.
- The testbed displays a matrix of 21 widget categories across 4 device platforms: WHOOP, Apple, Garmin, and Oura.
- The matrix contains 84 total cells.
- The page is organized by widget category rows and platform columns so every platform variation can be reviewed while scrolling.
- The initial testbed pass populates all 84 cells with base platform-styled designs.
- The base designs are not final widget implementations; they establish a visual direction for review.
- Widget testbed cells should use a square aspect ratio rather than a short rectangular row, so each platform widget has enough vertical room for realistic layouts.
- The widget testbed includes a full-day HR CSV uploader for development.
- HR CSV uploads should use simple columns named `timestamp` and `HR`.
- Uploaded HR CSVs should rebuild the Apple and WHOOP full-day HR widgets by deriving hourly ranges, hourly averages, the last hour of readings, the daily range, and the last HR reading.
- The built-in HR dataset is derived from `applewatch_hr_one_day_2020-06-14_clean.csv` and acts as the default fallback when no CSV is uploaded.

## Final Widget Categories

- Steps
- Full-Day HR Graph / HR Data
- Activity HR Graph
- Activity HR Zones
- Resting HR
- HRV / HRV Status
- Calories / Active Energy
- Weight
- VO2 Max / Cardio Capacity
- Total Sleep Time / Sleep Duration
- Sleep Hours
- Sleep Stages / Cycles
- Sleep Score
- Respiratory Rate / Respiration
- Strain / Activity Load / Training Load
- Recovery Score / Readiness Summary
- Cycle Tracking
- Activity / Workout Minutes
- Full Workout Report
- Skin / Wrist / Body Temperature / Temperature Deviation
- Blood Oxygen / SpO2

## Cross-Platform Design Direction

- Each widget category will eventually have platform-specific design variations for WHOOP, Apple, Garmin, and Oura.
- The first pass prioritizes visual fidelity for participant-facing research stimuli over maximum code reuse.
- Device-specific styling decisions will be logged here as they are made.
- The implementation should allow individual platform/widget cells to become one-off custom components later, even if some base styling is shared at first.
- High-level platform styling decisions should be applied across the full 84-widget testbed while preserving the current metric names, values, and data.
- Fine-grained widget-specific details can still be refined later through one-off custom components.

## Base Platform Visual Direction

- WHOOP base style: dark physiology dashboard, high-contrast black surfaces, neon metric accents, compact score/status language, and strong emphasis on recovery, strain, and readiness-style cards.
- WHOOP graph style: line graphs should prefer blue lines with a translucent-to-transparent blue area gradient underneath; axis/reference lines should read as black against the dark grey graph background.
- WHOOP graph axes should reserve visible label space inside the card instead of relying on negative chart margins.
- Apple base style: light iOS Health/Fitness-inspired cards, clean white surfaces, large rounded corners, system-color accents, ring-style progress, and simple metric hierarchy.
- Garmin base style: Garmin Connect-inspired cards with white surfaces, blue headers, compact "At a Glance" density, progress bars, and practical training/stat language.
- Oura base style: warm neutral cards, soft rounded surfaces, readiness/sleep/activity score framing, gentle insight language, and muted wellness-oriented presentation.
- Shared base skins should avoid fixed short chart heights now that the testbed cells are square.
- Base visual regions should scale proportionally with their parent widget card.
- Apple base widgets should use one dominant white content surface with large colored metrics and clean square bar treatments.
- Garmin base widgets should keep the blue Connect header and use larger, scalable central visuals.
- Oura base widgets should keep a soft wellness-card structure with large central values and rounded internal visual panels.

## Base Implementation Decision

- The first implementation uses four platform skin components rather than 84 separate files.
- This is intentional for speed and reviewability during the first design pass.
- The registry pattern should make it straightforward to replace any specific platform/widget cell with a unique file later.
- The WHOOP column now reuses existing athlete-dashboard widget components where a matching widget exists.
- The WHOOP dashboard widgets are mapped from the 21 development metric categories to the closest existing dashboard widget ids.
- Some WHOOP development categories currently share the same underlying dashboard widget, such as full-day heart rate and activity heart rate graph both using the existing heart-rate widget as a temporary baseline.
- The participant study flow now treats `lib/widget-development.ts` as the canonical widget-category source.
- The participant study flow renders widgets through `components/development/widget-skins/widget-skin-registry.tsx`, the same registry used by development mode.
- Spreadsheet logging should continue to use canonical widget labels from `widgetDevelopmentMetrics`, not device-specific display labels.
- Cycle Tracking remains included only when the participant selects women's sports; men's sports sessions filter it before the widget bank is created and the renderer also guards against accidental display.
- The legacy `components/widgets/all-widgets` components are retained as WHOOP fallback building blocks for now, but they are no longer the primary participant-flow rendering path.
- New rapid widget work should add one-off custom skin components only where needed, register them in `widget-skin-registry.tsx`, and log design decisions in this file.
- The app no longer imports Google Fonts through `next/font/google`; production builds should not depend on fetching external font files.

## Per-Widget Decisions

### Full-Day HR Graph / HR Data

- Apple full-day heart rate should show hourly heart-rate ranges rather than a continuous line.
- Apple full-day heart rate should display a top selector with hour, day, and week options that can be toggled.
- Apple full-day heart rate should default to day mode because the 24-hour chart shows hourly ranges across one day.
- Apple full-day heart rate should emphasize a summary range, currently `39-96 BPM`.
- Apple hourly heart-rate view should use adjacent vertical range marks, with each mark representing the low-to-high HR range within that hour.
- Apple hour mode should show adjacent individual data points rather than a continuous line.
- Apple week mode should show daily low-to-high ranges for each day.
- Apple full-day heart rate should include a compact side BPM axis with gridlines aligned to the displayed range marks.
- WHOOP and Apple full-day heart-rate cards should describe the latest value as `last HR reading`.
- Apple full-day heart rate should show the last HR reading underneath the `H / D / W` selector.
- Apple full-day heart rate should use uploaded CSV data for hour and day modes when available.
- WHOOP full-day heart rate should use uploaded CSV-derived hourly averages when available.
- WHOOP full-day heart rate should preserve the raw uploaded HR readings when available rather than smoothing to hourly averages.
- WHOOP full-day heart rate should use straight connected segments so spikes remain visible.
- Garmin full-day heart rate should use the same uploaded CSV-derived HR data source as WHOOP and Apple.
- Garmin full-day heart rate should display range and last HR reading.
- Garmin full-day heart rate should render a variable-color line using a vertical HR gradient: pink near 40 BPM, blue around 100 BPM, and red near 200 BPM.
- Garmin and WHOOP full-day heart rate should show raw-point, minimally smoothed HR traces so the graphs look sharply spiky.
- Garmin full-day heart rate should zoom the y-axis to the relevant uploaded HR range while keeping color mapping based on real HR values.
- Garmin full-day heart rate should include bottom hour labels.
- Garmin HR color logic should clamp values below 40 BPM and above 200 BPM so unusual uploaded values do not break the visual.
- Oura full-day heart rate should use the same CSV-derived hourly range data as Apple.
- Oura full-day heart rate should layer very light range bars underneath a more solid smoothed average line.
- Oura full-day heart rate should use a hazy blue background with white text.
- Garmin full-day heart rate header should use the abbreviated "Glance" title instead of "At a glance" to better match actual device UI.
- Garmin full-day heart rate graph should use `recharts` for robust bounding boxes and tooltips, matching WHOOP's layout structure, but preserving its custom vertical SVG color gradient.
- Garmin and WHOOP full-day heart rate graph stroke widths should be rendered extremely thin (1.25px and 1px respectively) to enhance the "spikiness" and raw feel of the data.
- Oura full-day heart rate should use `preserveAspectRatio="none"` so the SVG line graph dynamically stretches to match the width of the flex bar layout.
- Oura full-day heart rate should include distinct X-axis time labels and Y-axis reference lines dynamically derived from the data's min/max bounds.

### Activity HR Graph

- Activity HR graph should dynamically extract a 2-hour workout block from the uploaded daily CSV, surrounded by 15-minute buffers.
- Activity HR graph headers should display the specific activity type (e.g., "Outdoor Run") and formatted duration (e.g., "2 hr 0 min") instead of generic "Heart Rate" labels.
- Activity HR graph should highlight the active 2-hour workout block at 100% opacity, while the 15-minute start and end buffers are faded to 25% opacity using an SVG masking/splitting technique.
- Activity HR graph should display the "average HR" for the active workout block instead of the "last HR reading".
- Activity HR graph X-axis should use actual formatted timestamps (e.g., "10:00 AM") that accurately map to the 2.5-hour duration block.
- Apple Activity HR graph should plot every minute of data as a discrete dot (ScatterChart) that smoothly interpolates its color from blue (bottom) to yellow to red (top), matching Apple Fitness workout graphs.
- Garmin and WHOOP Activity HR graphs should split their line/area traces at the buffer boundaries to cleanly drop opacity without rendering artifacts.
- Oura Activity HR graph should apply a multi-stop opacity gradient directly to the SVG stroke to fade the buffers while preserving the continuous Bezier curve.

### Activity HR Zones

- Apple activity heart-rate zones should use a compact Apple Health-inspired card with a white surface, rounded corners, and clear iOS-style hierarchy.
- Apple activity heart-rate zones should show total activity time prominently at the top.
- Apple activity heart-rate zones should show Zones 1-5 with time spent in each zone.
- Apple activity heart-rate zones should use a horizontal stacked color bar to summarize the daily zone distribution.

### Resting HR

- Apple resting heart rate should use a compact Apple Health trends layout with a white card surface and red heart-rate accent.
- Apple resting heart rate should show Monday through Friday as a weekly line graph.
- Apple resting heart rate should use dynamic y-axis scaling based on the displayed weekly values.
- Apple resting heart rate should show the weekly average resting heart rate prominently at the top.

### HRV / HRV Status

- Apple HRV should reuse the same compact weekly trend structure as Apple resting heart rate.
- Apple HRV should show Monday through Friday as a line graph with dynamic y-axis scaling.
- Apple HRV should display values in milliseconds.
- Apple HRV should show the weekly average prominently at the top.

### Respiratory Rate / Respiration

- Apple respiratory rate should reuse the same range/trend structure as the Apple full-day heart-rate graph.
- Apple respiratory rate should adapt the labels to respiratory rate and display values in breaths per minute.
- Apple respiratory rate should use blue instead of red.

### Strain / Activity Load / Training Load

- Apple training load should show one month of daily data.
- Apple training load should use a smooth curve style inspired by the Oura heart-rate chart.
- Apple training load should show daily strain values with light blue to purple intensity coloring.
- Apple training load should overlay a weekly rolling average on top of the daily values.

### Recovery Score / Readiness Summary

- Apple readiness should be represented as a Vitals-style summary rather than a single recovery score.
- Apple readiness should show heart rate, respiratory rate, temperature, and sleep duration.
- Apple readiness metrics should be categorized as Low, Typical, or High.
- Apple readiness metrics should look clickable so a participant can imagine inspecting more detail.
- Apple readiness should use the Widget 16 reference screenshot as the primary visual direction, including the selected sleep-duration callout and Low/Typical/High grid.

### Cycle Tracking

- Apple cycle tracking should be simple, clear, and dashboard-friendly.
- Apple cycle tracking should focus only on the current day of the user's cycle and the predicted start date of the next period.
- Apple cycle tracking should avoid adding symptoms, fertility windows, or extra cycle detail at this stage.

### Activity / Workout Minutes

- Apple workout minutes should use a compact Apple activity-style weekly bar chart.
- Apple workout minutes should show total workout minutes today and average workout minutes over the last week.
- Apple workout minutes should use the provided development sample data for the first implementation.
- Apple workout minutes should stay visually consistent with the other Apple weekly bar widgets.

### Full Workout Report

- Apple full workout report should use a dark Apple Fitness-inspired activity history layout.
- Apple full workout report should show a dense but scannable scrollable list of workout sessions.
- Apple full workout report rows should include workout type, distance or calories, and day/date.
- Apple full workout report should use realistic dummy activities for development.

### Skin / Wrist / Body Temperature / Temperature Deviation

- Apple temperature should focus on skin temperature deviation from baseline rather than raw temperature.
- Apple temperature should show the zero baseline clearly.
- Apple temperature should show positive and negative daily deviations across the week.
- Apple temperature should show the average deviation over the last week and today's current distance from baseline.

### Blood Oxygen / SpO2

- Apple blood oxygen should reuse the Apple heart-rate range graph structure.
- Apple blood oxygen should show a clean daily SpO2 range in percent.
- Apple blood oxygen should adapt the heart-rate visual language to blue/cyan SpO2 styling and labels.

### Calories / Active Energy

- Apple calories should use a compact Apple Health trend card inspired by the Apple steps widget structure.
- Apple calories should show calories burned today in the top left.
- Apple calories should show average calories over the last week in the top right.
- Apple calories should use a sparse weekly bar chart and should not force every day to have a visible bar when data is missing.

### Weight

- Apple weight should use a compact Apple Health weekly metric card consistent with the other Apple trend widgets.
- Apple weight should display the latest weight clearly on the top left.
- Apple weight should show the average weight over the last week on the top right.
- Apple weight should use a sparse weekly graph where empty days remain blank and only days with readings are plotted.

### VO2 Max / Cardio Capacity

- Apple VO2 Max should use a compact Apple Health weekly metric card consistent with the sparse weight graph.
- Apple VO2 Max should display the latest available VO2 Max value clearly.
- Apple VO2 Max should show the average over the last week.
- Apple VO2 Max should only plot days where readings exist and leave other days empty.

### Total Sleep Time / Sleep Duration

- Apple total sleep time should act as the richer sleep-session summary that later sleep widgets can break apart.
- Apple total sleep time should show sleep start time, sleep end time, hours awake, and total sleep.
- Apple total sleep time should use a weekly sleep bar graph with each bar positioned on an overnight timeline.
- Apple total sleep time should distinguish asleep time and awake interruptions with separate colors.

### Sleep Hours

- Apple sleep hours should be a simple total-sleep-time widget, not a sleep-stage or sleep-session-detail widget.
- Apple sleep hours should show last night's total sleep duration.
- Apple sleep hours should show the average sleep over the past week.
- Apple sleep hours should use a minimal weekly bar chart focused only on total sleep time.

### Sleep Stages / Cycles

- Apple sleep stages should use a compact time-series timeline.
- Apple sleep stages should show four rows from top to bottom: Wake, REM, Core, and Deep.
- Apple sleep stages should use orange for Wake, light blue for REM, blue for Core, and dark blue or purple for Deep.
- Apple sleep stages should show when each stage occurs across the night without displaying start or end time labels.

### Steps

- Use `7104` as the shared step count across all four platforms.
- Rationale: `7104` communicates meaningful progress without implying completion and avoids looking artificially round.
- Garmin steps should use a circular progress ring rather than a bar chart.
- Garmin steps should not show an explicit goal label.
- The Garmin ring should fill according to progress toward 10,000 steps internally, while keeping the goal implicit.
- Garmin steps should keep the ring centered and avoid extra explanatory copy or time-of-day summary blocks.
- Garmin steps should scale the ring proportionally to the widget testbed cell instead of using a small fixed-size center graphic.
- WHOOP steps should use a simple weekly bar chart.
- WHOOP Monday through Saturday values should sit around 10,000 steps.
- WHOOP and Apple weekly step histories should include one notably low day and one notably high day to create more realistic normal variance.
- WHOOP Sunday should represent the shared value of `7104`.
- WHOOP steps should follow the draft Blood Oxygen/SpO2 card structure: large value on the top left, chart panel underneath, day labels on the x-axis, and horizontal reference lines with y-axis labels.
- WHOOP steps should use thin bars rather than thick pill-shaped bars.
- WHOOP steps should expose step counts on hover using the same tooltip pattern as the current athlete dashboard.
- WHOOP steps should reserve visible chart space for axis labels rather than using negative chart margins that can clip labels.
- WHOOP steps should generate y-axis ticks and reference lines in 5,000-step increments from the chart scale.
- Apple steps should show a weekly step-history bar chart similar to the WHOOP steps concept.
- Apple steps should use bright orange on a white background.
- Apple steps should display `average` with the average step count underneath it.
- Apple steps should use sharp square bars rather than rounded bars.
- Oura steps should use a half-circle gauge.
- Oura steps should show a water texture asset behind the gauge.
- Oura steps should label the left endpoint as `0` and the right endpoint as `10,000`.
- Oura steps should place `7104` underneath the half-circle.

### Sleep Score

- Apple sleep score should use the Widget 13 reference screenshot as the primary visual direction.
- Apple sleep score should show the breakdown values on the left and the segmented score ring on the right.
- Apple sleep score breakdown values are Duration `48/50`, Bedtime `30/30`, and Interruptions `11/20`.
- Apple sleep score should not include the small `Hi` label above the breakdown list.
- Apple sleep score ring should segment the total score as 50% blue Duration, 30% teal Bedtime, and 20% orange Interruptions.
- Apple sleep score should display the overall score in the center of the ring.
- Apple sleep score should place the breakdown in the top third and the ring in the lower portion of the card.

### Sleep Timeline

- Apple total sleep time should read as a single overnight day rather than a weekly history.
- Apple total sleep time should use a wider noon-to-noon timeline so the sleep bar and time labels have room to breathe.
- Apple total sleep time should compress the graph band vertically so the top summary labels stay legible.

## Device Familiarity Screen

- Device familiarity screen should use custom high-fidelity PNG device logos (Apple, Garmin, Oura, WHOOP) rather than generic vector icons.
- Device logos should be rendered large and without padding/bounding boxes to ensure a premium, integrated feel.

## Widget Labels

- Participant-facing widget labels may vary by device or scenario.
- Spreadsheet logging should continue to use the canonical widget titles so data remains stable across label changes.
- Apple-facing labels currently override widget names as: `Steps`, `HR Graph`, `Activity HR`, `Resting HR`, `HRV`, `Active Energy`, `Weight`, `VO2 Max`, `Sleep Duration`, `Sleep Hours`, `Sleep Stages`, `Sleep Score`, `Respiratory Rate`, `Training Load`, `Vitals`, `Cycle Tracking`, `Activity Minutes`, `Workout History`, `Temperature Deviation`, and `SpO2`.
