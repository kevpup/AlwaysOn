import { type WidgetId } from "@/lib/mock-data"

export interface WidgetInformation {
  shows: string
  coachUse: string
  influences: string
}

export const widgetInformationById: Record<WidgetId, WidgetInformation> = {
  steps: {
    shows: "Estimated daily step count and recent movement volume.",
    coachUse: "A coach might use this to understand general activity, movement consistency, or recovery-day behavior outside formal training.",
    influences: "Device wear time, walking outside practice, travel, injury status, and whether the device is worn during the full day.",
  },
  "full-day-hr": {
    shows: "Heart rate patterns across the day, including low, typical, and elevated periods.",
    coachUse: "A coach might use this to notice physiological strain, unusual stress, or how the athlete responds across a full day.",
    influences: "Training, caffeine, illness, heat, stress, sleep, device fit, and normal changes in daily activity.",
  },
  "activity-hr-graph": {
    shows: "Heart rate during a specific workout or activity session.",
    coachUse: "A coach might use this to evaluate workout intensity, pacing, and how the athlete responded to a session.",
    influences: "Workout type, fitness level, hydration, temperature, fatigue, stress, and sensor placement.",
  },
  "activity-hr-zones": {
    shows: "Time spent in heart rate intensity zones during activity.",
    coachUse: "A coach might use this to compare planned intensity with actual intensity and adjust future training.",
    influences: "Zone settings, max heart rate estimates, workout effort, environmental conditions, fatigue, and device accuracy.",
  },
  "resting-hr": {
    shows: "Resting heart rate trends, often measured during sleep or quiet periods.",
    coachUse: "A coach might use this as one signal of recovery, fatigue, illness, or adaptation to training.",
    influences: "Sleep, illness, stress, hydration, alcohol, medications, fitness changes, and measurement timing.",
  },
  "hrv-status": {
    shows: "Heart rate variability, usually summarized from overnight measurements.",
    coachUse: "A coach might use this to discuss recovery status, readiness, or whether training load should be adjusted.",
    influences: "Sleep quality, stress, illness, training load, alcohol, hydration, menstrual cycle phase, and measurement consistency.",
  },
  "calories-active-energy": {
    shows: "Estimated active energy or calories burned through movement and exercise.",
    coachUse: "A coach might use this to understand workload, fueling needs, or total activity outside scheduled training.",
    influences: "Body size estimates, activity type, device algorithms, heart rate data, wear time, and workout logging accuracy.",
  },
  weight: {
    shows: "Body weight entries or connected weight trends.",
    coachUse: "A coach might use this in conversations about body composition, fueling, recovery, or readiness.",
    influences: "Hydration, time of day, clothing, scale accuracy, menstrual cycle phase, illness, and intentional or unintentional weight change.",
  },
  "vo2-max": {
    shows: "Estimated cardiorespiratory fitness or aerobic capacity.",
    coachUse: "A coach might use this to discuss endurance capacity, conditioning progress, or training adaptation.",
    influences: "Workout data quality, running or cycling pace, heart rate response, device model, terrain, weather, and fitness changes.",
  },
  "total-sleep-time": {
    shows: "Sleep start, sleep end, awake time, and total sleep duration for a night.",
    coachUse: "A coach might use this to discuss recovery habits, travel effects, or whether sleep timing supports training demands.",
    influences: "Schedule, travel, naps, stress, caffeine, device wear, sleep detection accuracy, and interruptions during the night.",
  },
  "sleep-hours": {
    shows: "Total sleep duration for the night and recent sleep duration trends.",
    coachUse: "A coach might use this as a quick recovery signal or to discuss sleep consistency during heavy training.",
    influences: "Bedtime, wake time, naps, travel, academic load, stress, illness, and whether the device correctly detects sleep.",
  },
  "sleep-stages-cycles": {
    shows: "Estimated time spent in sleep stages such as wake, REM, core, and deep sleep.",
    coachUse: "A coach might use this to talk about sleep quality, recovery routines, or whether the athlete is getting restorative sleep.",
    influences: "Device algorithms, movement, heart rate patterns, sleep interruptions, stress, illness, alcohol, and normal night-to-night variation.",
  },
  "sleep-score": {
    shows: "A summary score that combines sleep duration, timing, interruptions, and related sleep signals.",
    coachUse: "A coach might use this as a simplified recovery indicator or a prompt for discussion about sleep routines.",
    influences: "Sleep duration, wake events, sleep timing, prior sleep debt, device algorithm, illness, stress, travel, and schedule changes.",
  },
  "respiratory-rate": {
    shows: "Estimated breathing rate, often measured overnight.",
    coachUse: "A coach might use this as a possible sign of recovery status, illness, or unusual physiological strain.",
    influences: "Illness, altitude, sleep quality, stress, temperature, respiratory conditions, and device measurement quality.",
  },
  "training-load": {
    shows: "A summary of recent strain, activity load, or training stress.",
    coachUse: "A coach might use this to balance hard days, recovery days, and longer-term workload progression.",
    influences: "Workout intensity, duration, heart rate response, previous training, sleep, stress, illness, and device-specific load formulas.",
  },
  "recovery-readiness": {
    shows: "A readiness-style summary using signals such as heart rate, respiration, temperature, and sleep.",
    coachUse: "A coach might use this to discuss whether the athlete appears ready for training or may need adjustment.",
    influences: "Sleep, stress, illness, training load, baseline calculations, menstrual cycle phase, hydration, and device algorithms.",
  },
  "cycle-tracking": {
    shows: "Current cycle day, predicted period timing, and estimated cycle phase.",
    coachUse: "A coach might use this to discuss individualized training, symptoms, or recovery needs if the athlete chooses to share it.",
    influences: "Manual entries, cycle regularity, hormonal contraception, stress, illness, travel, sleep, and prediction accuracy.",
  },
  "activity-workout-minutes": {
    shows: "Minutes spent in recorded activity or workouts.",
    coachUse: "A coach might use this to understand training exposure, activity consistency, or unscheduled workload.",
    influences: "Workout logging behavior, device auto-detection, practice structure, injury status, and activities done without the device.",
  },
  "full-workout-report": {
    shows: "Workout history with session type, date, duration, distance, calories, and related summary data.",
    coachUse: "A coach might use this to review training history, compare planned and completed work, or discuss specific sessions.",
    influences: "Which workouts are logged, device detection, GPS quality, heart rate accuracy, manual edits, and whether cross-training is captured.",
  },
  "temperature-deviation": {
    shows: "Skin, wrist, or body temperature deviation from the athlete's baseline.",
    coachUse: "A coach might use this as one possible signal of illness, recovery disruption, or physiological change.",
    influences: "Illness, room temperature, sleep environment, menstrual cycle phase, device fit, travel, alcohol, and baseline calculations.",
  },
  "blood-oxygen": {
    shows: "Estimated blood oxygen saturation readings or overnight SpO2 ranges.",
    coachUse: "A coach might use this to discuss altitude response, illness, breathing concerns, or unusual overnight patterns.",
    influences: "Altitude, respiratory illness, sleep position, sensor fit, movement, circulation, nail polish, and device measurement quality.",
  },
}
