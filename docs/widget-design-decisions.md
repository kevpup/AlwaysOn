# Widget Design Decisions

This note tracks design decisions for the widget skin development process.

## Development Testbed

- A development-only widget testbed is available from the first screen of the app.
- The testbed is separate from the participant study flow.
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

## Device Familiarity Screen

- Device familiarity screen should use custom high-fidelity PNG device logos (Apple, Garmin, Oura, WHOOP) rather than generic vector icons.
- Device logos should be rendered large and without padding/bounding boxes to ensure a premium, integrated feel.
