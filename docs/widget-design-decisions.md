# Widget Design Decisions

This note tracks design decisions for the widget skin development process.

## Development Testbed

- A development-only widget testbed is available from the first screen of the app.
- The testbed is separate as a screen, but it now uses the same widget rendering registry as the participant study flow.
- Changes made to `WidgetSkinCard`, platform base skins, or custom platform/widget skins should be visible in both development mode and the participant study flow.
- The testbed displays a matrix of 15 active widget categories across 4 device platforms: WHOOP, Apple, Garmin, and Oura.
- The matrix contains 60 active cells.
- The page is organized by widget category rows and platform columns so every platform variation can be reviewed while scrolling.
- The initial testbed pass populated the original 84 cells with base platform-styled designs before the widget list was narrowed.
- The base designs are not final widget implementations; they establish a visual direction for review.
- Widget testbed cells should use a square aspect ratio rather than a short rectangular row, so each platform widget has enough vertical room for realistic layouts.
- The widget testbed includes a full-day HR CSV uploader for development.
- HR CSV uploads should use simple columns named `timestamp` and `HR`.
- Uploaded HR CSVs should rebuild the Apple and WHOOP full-day HR widgets by deriving hourly ranges, hourly averages, the last hour of readings, the daily range, and the last HR reading.
- The built-in HR dataset is derived from `applewatch_hr_one_day_2020-06-14_clean.csv` and acts as the default fallback when no CSV is uploaded.

## Active Widget Categories

- Full-Day HR Graph / HR Data
- Activity HR Graph + Zones
- Resting HR
- HRV / HRV Status
- Calories / Active Energy
- VO2 Max / Cardio Capacity
- Sleep Report
- Sleep Score
- Respiratory Rate / Respiration
- Strain / Activity Load / Training Load
- Recovery Score / Readiness Summary
- Cycle Tracking
- Full Workout Report
- Skin / Wrist / Body Temperature / Temperature Deviation
- Blood Oxygen / SpO2

## Widget Pruning Decisions

- Steps are removed from the active research widget set. Although steps are shared across consumer wearable technologies, they are not a common primary metric in college athletics; workload, strain, and training-load style measures are more aligned with the study context.
- Weight is removed from the active research widget set.
- Activity HR Graph and Activity HR Zones are combined into one scrollable workout heart-rate widget. The graph appears first, with zone summaries below, because zones are a derived subset of the workout HR data and participants have generally treated workout-specific data as interesting but comparatively comfortable.
- Sleep Stages are removed as a standalone widget and folded into Sleep Report. Sleep now has three levels of detail: Sleep Report, Sleep Time, and Sleep Score.
- Sleep Time is removed from the active research widget set, leaving Sleep Report and Sleep Score as the active sleep widgets.
- Workout Minutes are removed from the active research widget set because they duplicate information already represented in workout history/reporting and workload-oriented widgets.

## Cross-Platform Design Direction

- Each widget category will eventually have platform-specific design variations for WHOOP, Apple, Garmin, and Oura.
- The first pass prioritizes visual fidelity for participant-facing research stimuli over maximum code reuse.
- Device-specific styling decisions will be logged here as they are made.
- The implementation should allow individual platform/widget cells to become one-off custom components later, even if some base styling is shared at first.
- High-level platform styling decisions should be applied across the active 60-cell widget testbed while preserving the current metric names, values, and data.
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

- The first implementation uses four platform skin components rather than separate files for every platform/widget cell.
- This is intentional for speed and reviewability during the first design pass.
- The registry pattern should make it straightforward to replace any specific platform/widget cell with a unique file later.
- The WHOOP column now reuses existing athlete-dashboard widget components where a matching widget exists.
- The WHOOP dashboard widgets are mapped from the development metric categories to the closest existing dashboard widget ids.
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

### Activity HR Graph + Zones

- Activity HR graph should dynamically extract a 2-hour workout block from the uploaded daily CSV, surrounded by 15-minute buffers.
- Activity HR graph headers should display the specific activity type (e.g., "Outdoor Run") and formatted duration (e.g., "2 hr 0 min") instead of generic "Heart Rate" labels.
- Activity HR graph should highlight the active 2-hour workout block at 100% opacity, while the 15-minute start and end buffers are faded to 25% opacity using an SVG masking/splitting technique.
- Activity HR graph should display the "average HR" for the active workout block instead of the "last HR reading".
- Activity HR graph X-axis should use actual formatted timestamps (e.g., "10:00 AM") that accurately map to the 2.5-hour duration block.
- Apple Activity HR graph should plot every minute of data as a discrete dot (ScatterChart) that smoothly interpolates its color from blue (bottom) to yellow to red (top), matching Apple Fitness workout graphs.
- Garmin and WHOOP Activity HR graphs should split their line/area traces at the buffer boundaries to cleanly drop opacity without rendering artifacts.
- Oura Activity HR graph should apply a multi-stop opacity gradient directly to the SVG stroke to fade the buffers while preserving the continuous Bezier curve.
- Activity HR Zones are no longer a separate active widget; zone summaries should appear below the workout HR graph in a scrollable combined widget.
- Apple activity heart-rate zones should show Zones 1-5 with time spent in each zone beneath the graph.

### Resting HR

- Apple resting heart rate should use a compact Apple Health trends layout with a white card surface and red heart-rate accent.
- Apple resting heart rate should show Monday through Friday as a weekly line graph.
- Apple resting heart rate should use dynamic y-axis scaling based on the displayed weekly values.
- Apple resting heart rate should show the weekly average resting heart rate prominently at the top.
- Garmin resting heart rate should use dark-mode Garmin styling consistent with the existing Garmin heart-rate widgets.
- Garmin resting heart rate should use a blue line graph across a period of days with no highlighted area fill underneath.
- Garmin resting heart rate should serve as the visual reference for subsequent Garmin dark-mode trend widgets.
- Oura resting heart rate should use a dark, premium, minimal metric card rather than a graph.
- Oura resting heart rate should show `Lowest Heart Rate`, a large `43 bpm` primary value, and `Average 56 bpm` as supporting text.
- Oura resting heart rate should be left-aligned, spacious, and quiet with refined typography and minimal chrome.

### HRV / HRV Status

- Apple HRV should reuse the same compact weekly trend structure as Apple resting heart rate.
- Apple HRV should show Monday through Friday as a line graph with dynamic y-axis scaling.
- Apple HRV should display values in milliseconds.
- Apple HRV should show the weekly average prominently at the top.
- WHOOP HRV should use a daily graph over the last month.
- WHOOP HRV should show individual daily HRV data points with the most recent day visually highlighted.
- WHOOP HRV should display the most recent HRV value as the primary top-left summary metric.
- WHOOP HRV should use the same blue color treatment as the WHOOP average-heart-rate workout graph.
- Garmin HRV should use a compact dark-mode summary card rather than a chart-heavy layout.
- Garmin HRV should show the label `HRV`, the most recent HRV value in milliseconds as the primary metric, and a small status/reference line.
- Garmin HRV should match the black-background Garmin styling established by the existing Garmin heart-rate widgets.
- Oura HRV should use a dark premium recovery card with the metric header more prominent than the chart.
- Oura HRV should show `Average HRV`, a large `48 ms` primary value, and `Max 72 ms` as supporting text.
- Oura HRV should include a restrained overnight white line chart with subtle horizontal gridlines and no heavy axis styling.

### Respiratory Rate / Respiration

- Apple respiratory rate should reuse the same range/trend structure as the Apple full-day heart-rate graph.
- Apple respiratory rate should adapt the labels to respiratory rate and display values in breaths per minute.
- Apple respiratory rate should use blue instead of red.
- WHOOP respiratory rate should use a last-month daily line graph.
- WHOOP respiratory rate should show average respiratory rate for each night with one-decimal values.
- WHOOP respiratory rate should highlight the most recent night and display that value as the primary top-left summary metric.
- WHOOP respiratory rate should use the light-blue WHOOP graph treatment.
- Garmin respiratory rate should use a Garmin dark-mode dual-line graph.
- Garmin respiratory rate should show sleep average respiratory rate as a Garmin blue line and awake average respiratory rate as a light-blue line.
- Garmin respiratory rate should keep the chart readable with a small legend and dynamic y-axis labels.
- Oura respiratory rate should use a dark weekly trend card with a smooth pale cyan line and subtle teal-blue gradient fill.
- Oura respiratory rate should show `Respiratory rate` as the title and clearly display the selected day's value.
- Oura respiratory rate should highlight the selected day with a marker/emphasis line and avoid tabs or extra navigation controls.

### Calories / Active Energy

- WHOOP calories should use a monthly bar graph.
- WHOOP calories should show very thin blue bars across the last month with enough spacing to make the full month readable.
- WHOOP calories should include a horizontal average-calories reference line.
- WHOOP calories should display calories burned today as the primary summary metric.
- WHOOP calories should stay minimal, dense, and consistent with the dark WHOOP graph style.
- Garmin calories should use a black-background dark-mode card.
- Garmin calories should use a simple circular metric display rather than a chart.
- Garmin calories should show total calories burned centered inside the circle.
- Garmin calories should remain visually consistent with Garmin dark-mode Widgets 1-3.

### Strain / Activity Load / Training Load

- Apple training load should show one month of daily data.
- Apple training load should use a smooth curve style inspired by the Oura heart-rate chart.
- Apple training load should show daily strain values with light blue to purple intensity coloring.
- Apple training load should overlay a weekly rolling average on top of the daily values.
- WHOOP strain should use a minimal blue circular score display.
- WHOOP strain should show the current strain value for the day as a 1-21 scale value centered inside the circle.
- WHOOP strain should label the centered value with `Strain` underneath.
- WHOOP strain should match WHOOP's circular metric-card style without extra chart detail.
- Garmin training load should use the shared Garmin dark-mode chart shell.
- Garmin training load should show absolute training load around `1000` as the main line graph.
- Garmin training load should also show acute-to-chronic workload ratio as dense vertical bars.
- Garmin training load should highlight the optimal ACWR range from `0.8` to `1.5` with a green band/reference treatment.
- Garmin training load should be data-dense but still readable inside the square widget.
- Oura should represent the training-load/stress widget slot as `Daytime stress`.
- Oura stress should use a dark daytime trend chart with small point markers and a white line over a dark blue-to-green gradient chart background.
- Oura stress should show right-side qualitative bands: Restored, Relaxed, Engaged, and Stressed.
- Oura stress should use soft horizontal dividers and stay chart-centric without dense analytics controls.

### Recovery Score / Readiness Summary

- Apple readiness should be represented as a Vitals-style summary rather than a single recovery score.
- Apple readiness should show heart rate, respiratory rate, temperature, and sleep duration.
- Apple readiness metrics should be categorized as Low, Typical, or High.
- Apple readiness metrics should look clickable so a participant can imagine inspecting more detail.
- Apple readiness should use the Widget 16 reference screenshot as the primary visual direction, including the selected sleep-duration callout and Low/Typical/High grid.
- WHOOP recovery should use a circular percentage score display.
- WHOOP recovery should use red, yellow, or green depending on the score.
- WHOOP recovery currently uses a score of `72%` and displays it in green.
- WHOOP recovery should stay simple and consistent with WHOOP's recovery/readiness circular metric style.
- Garmin readiness should be represented as Body Battery.
- Garmin Body Battery should use a dark-mode card with Body Battery High and Low values on a 1-100 scale.
- Garmin Body Battery should show an intraday chart that generally starts high in the morning and drains lower by the end of the day.
- Oura readiness should use an immersive premium dark score card with cool blue atmospheric background treatment.
- Oura readiness should show a large centered `88` value with `READINESS` below it in uppercase.
- Oura readiness should include a broad curved 0-100-style arc near the top with subtle tick marks and a clean white stroke.
- Oura readiness should keep the score dominant over the scenic/atmospheric treatment.

### Cycle Tracking

- Apple cycle tracking should be simple, clear, and dashboard-friendly.
- Apple cycle tracking should focus only on the current day of the user's cycle and the predicted start date of the next period.
- Apple cycle tracking should avoid adding symptoms, fertility windows, or extra cycle detail at this stage.
- Garmin cycle tracking should use a dark-mode circular summary card.
- Garmin cycle tracking should show only the current cycle day and current phase.
- Garmin cycle tracking should not add calendar-view functionality.
- Oura cycle tracking should use a dark stacked informational card layout without a temperature graph.
- Oura cycle tracking should show current cycle day prominently, followed by rows/cards for cycle phase and period status.
- Oura cycle tracking should include a bottom-summary-card style estimate for the next period start timeframe.
- Oura cycle tracking should use deep blue-dark surfaces, soft rounded cards, clean typography, and subtle separation between blocks.

### Activity / Workout Minutes

- Activity / Workout Minutes is retired from the active widget list because it is redundant with workout history/reporting and workload-oriented widgets.

### Full Workout Report

- Apple full workout report should use a dark Apple Fitness-inspired activity history layout.
- Apple full workout report should show a dense but scannable scrollable list of workout sessions.
- Apple full workout report rows should include workout type, distance or calories, and day/date.
- Apple full workout report should use realistic dummy activities for development.
- WHOOP workout report should preserve the existing scrollable recent-session concept.
- WHOOP workout report should use dark WHOOP card styling with dense session rows, dates, durations, calories, and intensity labels.
- WHOOP workout report should avoid adding new chart complexity unless later refinement requires it.
- Garmin workout report should reuse the WHOOP workout report structure and sample data.
- Garmin workout report should preserve the scrollable dense recent-session list.
- Garmin workout report should restyle the structure with Garmin dark-mode surfaces, blue accents, compact metric panels, and Garmin-like spacing.
- Oura workout report should reuse the same workout-report structure and sample data as WHOOP and Garmin.
- Oura workout report should preserve the scrollable dense recent-session list while using very dark surfaces, elegant typography, soft contrast, and restrained separators.
- Oura workout report should be a visual reskin of the shared workout-report concept rather than a new widget type.

### Skin / Wrist / Body Temperature / Temperature Deviation

- Apple temperature should focus on skin temperature deviation from baseline rather than raw temperature.
- Apple temperature should show the zero baseline clearly.
- Apple temperature should show positive and negative daily deviations across the week.
- Apple temperature should show the average deviation over the last week and today's current distance from baseline.
- WHOOP skin temperature should use a compact health-status summary card rather than a weekly chart.
- WHOOP skin temperature should show `Skin Temp from baseline`, the value `+0.2°`, and a green check status.
- WHOOP skin temperature should include the message `within -0.6 to +0.7`.
- Garmin skin temperature should use a very simple dark-mode summary card.
- Garmin skin temperature should show only the daily change from baseline.
- Garmin skin temperature should not add charting or additional explanatory detail.
- Oura skin temperature should use a deep cool-blue dark chart card focused only on temperature deviation from baseline.
- Oura skin temperature should show positive and negative narrow bars around a clearly defined zero baseline.
- Oura skin temperature should highlight the selected day and show its deviation as the primary metric, for example `+0.2°C`.
- Oura skin temperature should not include cycle-phase, period, or other reproductive-health summary content.

### Blood Oxygen / SpO2

- Apple blood oxygen should reuse the Apple heart-rate range graph structure.
- Apple blood oxygen should show a clean daily SpO2 range in percent.
- Apple blood oxygen should adapt the heart-rate visual language to blue/cyan SpO2 styling and labels.
- WHOOP blood oxygen should use the same compact health-status card style as WHOOP skin temperature.
- WHOOP blood oxygen should show one day of data only: `Blood Oxygen (SpO2)` and `97%`.
- WHOOP blood oxygen should include a green check status with `within 95 to 100%`.
- Garmin blood oxygen should use a dark-mode circular percentage display.
- Garmin blood oxygen should show the SpO2 percentage inside the circle, `SpO2` below the value, and the most recent reading time below that.
- Garmin blood oxygen should stay visually simple and consistent with Garmin circular summary cards.
- Oura blood oxygen should be an extremely minimal dark single-metric card.
- Oura blood oxygen should show `Average Oxygen Saturation` in small uppercase text and a large `98%` value.
- Oura blood oxygen should not include charts, trends, or additional supporting graphs.

### Calories / Active Energy

- Apple calories should use a compact Apple Health trend card inspired by the Apple steps widget structure.
- Apple calories should show calories burned today in the top left.
- Apple calories should show average calories over the last week in the top right.
- Apple calories should use a sparse weekly bar chart and should not force every day to have a visible bar when data is missing.
- Oura active calories should use a dark, immersive, water-themed background texture rather than a chart.
- Oura active calories should center a large `655` metric with `Active calorie burn` directly beneath it.
- Oura active calories may include one short positive supporting sentence, but should not mention goals, targets, or percentages over goal.

### Weight

- Apple weight should use a compact Apple Health weekly metric card consistent with the other Apple trend widgets.
- Apple weight should display the latest weight clearly on the top left.
- Apple weight should show the average weight over the last week on the top right.
- Apple weight should use a sparse weekly graph where empty days remain blank and only days with readings are plotted.
- WHOOP weight should use a sparse monthly line graph for manually entered measurements.
- WHOOP weight should only plot days where measurements exist and connect those intermittent manual entries with a blue line.
- WHOOP weight should visually emphasize that weight is not a dense daily automatic metric by using a manual-entry label and a measurement count.
- Garmin weight should use a sparse dark-mode line graph showing intermittent measurements.
- Garmin weight should show active/current weight as supporting information below the graph.
- Garmin weight should use the same minimal dark-mode trend language established by Garmin Widgets 1-3.

### VO2 Max / Cardio Capacity

- Apple VO2 Max should use a compact Apple Health weekly metric card consistent with the sparse weight graph.
- Apple VO2 Max should display the latest available VO2 Max value clearly.
- Apple VO2 Max should show the average over the last week.
- Apple VO2 Max should only plot days where readings exist and leave other days empty.
- WHOOP VO2 Max should use a sparse monthly line graph with weekly VO2 Max estimates.
- WHOOP VO2 Max should use the same blue line styling as the WHOOP weight widget.
- WHOOP VO2 Max should only plot available estimates and leave missing periods empty.
- WHOOP VO2 Max should stay visually simple and consistent with the sparse WHOOP manual/estimate graph family.
- Garmin VO2 Max should use a black dark-mode card with a circular score display instead of a line graph.
- Garmin VO2 Max should segment the circle into red 40%, orange 15%, green 15%, blue 15%, and purple 15% bands.
- Garmin VO2 Max should show `54 Superior` inside the circle and place the indicator in the purple superior range.
- Oura VO2 Max should use a dark cardio-capacity trend card with thin white chart lines, subtle gridlines, and restrained labels.
- Oura VO2 Max should show a monthly timeline, small round points, and a selected-month vertical emphasis line with a floating `VO2 max 42` value label.
- Oura VO2 Max should include right-side qualitative range labels: Low, Fair, High, and Peak.

### Sleep Report

- Apple Sleep Report should act as the richer sleep-session summary.
- Apple Sleep Report should show sleep start time, sleep end time, hours awake, total sleep, and sleep stages.
- Apple Sleep Report should use the same sleep-stage timeline visual that used to be represented by the standalone Sleep Stages widget.
- Apple Sleep Report should be scrollable and show time spent in each stage below the graph.
- WHOOP Sleep Report should use a vertically structured premium sleep-report layout.
- WHOOP Sleep Report should show a light-blue circular score display with `75% Sleep Performance` centered inside.
- WHOOP Sleep Report should include a scrollable list of sleep metrics: hours vs needed, consistency, sleep efficiency, and high sleep stress.
- WHOOP Sleep Report metric rows should include status labels such as Poor, Sufficient, or Optimal with visible color treatment.
- WHOOP Sleep Report should include a sleep-stage timeline for awake, light, deep, and REM with distinct segment colors and visible bedtime/wake time.
- Garmin Sleep Report should use the shared Garmin dark-mode card shell.
- Garmin Sleep Report should show sleep stages over time with separate Deep, Light, REM, and Awake rows.
- Garmin Sleep Report should include a circular total-sleep composition ring with stage-colored segments: light blue for Light, dark blue for Deep, purple for REM, and pink for Awake.
- Garmin Sleep Report should show total duration plus sleep start and end times, and may scroll if the content needs more vertical room.
- Oura Sleep Report should use a vertically stacked premium dark layout with only a simple date label at the top.
- Oura Sleep Report should title the card `Sleep stages` and make the sleep-stage timeline the main focal point.
- Oura Sleep Report should show bedtime and wake time near the top of the chart area.
- Oura Sleep Report should use distinct controlled colors for Awake, REM, Light, and Deep rectangular timeline segments.
- Oura Sleep Report should include a clean legend with each stage, duration, and percentage, separated by thin restrained dividers.

### Sleep Time

- Apple Sleep Time should be a simple total-sleep-time widget, not a sleep-stage or sleep-session-detail widget.
- Apple Sleep Time should show last night's total sleep duration.
- Apple Sleep Time should show the average sleep over the past week.
- Apple Sleep Time should use a minimal weekly bar chart focused only on total sleep time.
- WHOOP Sleep Time should show last night's sleep duration as the primary summary metric.
- WHOOP Sleep Time should include a simple weekly bar graph underneath.
- WHOOP Sleep Time should stay minimal and visually distinct from the richer WHOOP Sleep Report.

### Sleep Stages / Cycles

- Sleep Stages / Cycles is retired as a standalone active widget.
- Sleep-stage information should be represented inside Sleep Report.

### Steps

- Steps are retired from the active widget list because workload, strain, and training load are more relevant to college athletics.
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
- WHOOP Sleep Score should be a simple circular score display only.
- WHOOP Sleep Score should show the sleep percentage centered inside the circle.
- WHOOP Sleep Score should not include the full supporting report content; that belongs in Sleep Report.
- WHOOP Sleep Score should stay minimal and visually polished.
- Garmin Sleep Score should be a very simple dark-mode metric card.
- Garmin Sleep Score should show `78 / 100` in white text on a black background.
- Garmin Sleep Score should stay visually minimal and distinct from the richer Garmin Sleep Report.
- Oura Sleep Score should be a simple premium dark score card.
- Oura Sleep Score should show `Sleep` at the top, a large centered `94`, and `Optimal` underneath.
- Oura Sleep Score should frame the score with a thin, softly luminous semicircular arc and avoid extra supporting data.

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
- Apple-facing labels currently override widget names as: `HR Graph`, `Activity HR + Zones`, `Resting HR`, `HRV`, `Active Energy`, `Weight`, `VO2 Max`, `Sleep Report`, `Sleep Time`, `Sleep Score`, `Respiratory Rate`, `Training Load`, `Vitals`, `Cycle Tracking`, `Workout History`, `Temperature Deviation`, and `SpO2`.

## Widget Information Cards

- Scenario widgets can flip over like a flash card to show more information.
- The back of each widget has three consistent sections: what the information shows, why a coach might use it, and what might influence the data.
- Widget information is keyed by canonical widget ID so the same content appears across Apple, Garmin, Oura, and WHOOP styles for the same widget.

## Not Displayed Preview

- The not-displayed column should use compact live widget previews rather than icon-only rows.
- The preview cards are visually muted with reduced opacity, saturation, and brightness so they remain informative without competing with the selected coach-view widgets.
- The not-displayed column scrolls independently when the preview list is taller than the workspace.

## Widget Testbed Scale

- The widget skin testbed should render widgets at the same 360px square size used in the participatory design and coach-view tiles on desktop.
- Matching the testbed and participatory design sizes makes widget styling decisions easier to evaluate one-to-one.
