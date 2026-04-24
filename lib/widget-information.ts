import { type WidgetId } from "@/lib/mock-data"

export interface WidgetInformation {
  shows: string
  coachUse: string
  influences: string
}

export const widgetInformationById: Record<WidgetId, WidgetInformation> = {
  steps: {
    shows: "Estimated daily step count and recent movement volume.",
    coachUse: "Staff might use this to understand general activity, movement consistency, or recovery-day behavior outside formal training.",
    influences: "Device wear time, walking outside practice, travel, injury status, and whether the device is worn during the full day.",
  },
  "full-day-hr": {
    shows: "Heart rate patterns across the day, including low, typical, and elevated periods.",
    coachUse: "Staff might use this to notice physiological strain, unusual stress, or how the athlete responds across a full day.",
    influences: "Training, caffeine, illness, heat, stress, sleep, device fit, and normal changes in daily activity.",
  },
  "activity-hr-graph": {
    shows: "Heart rate during a specific workout or activity session.",
    coachUse: "Staff might use this to evaluate workout intensity, pacing, and how the athlete responded to a session.",
    influences: "Workout type, fitness level, hydration, temperature, fatigue, stress, and sensor placement.",
  },
  "activity-hr-zones": {
    shows: "Time spent in heart rate intensity zones during activity.",
    coachUse: "Staff might use this to compare planned intensity with actual intensity and adjust future training.",
    influences: "Zone settings, max heart rate estimates, workout effort, environmental conditions, fatigue, and device accuracy.",
  },
  "resting-hr": {
    shows: "Resting heart rate trends, often measured during sleep or quiet periods.",
    coachUse: "Staff might use this as one signal of recovery, fatigue, illness, or adaptation to training.",
    influences: "Sleep, illness, fatigue, hydration, alcohol, medications, level of fitness.",
  },
  "hrv-status": {
    shows: "Heart rate variability, usually summarized from overnight measurements.",
    coachUse: "Staff might use this to interpret recovery status, readiness, or whether training load should be adjusted.",
    influences: "Sleep quality, stress, illness, training load, alcohol, hydration, and measurement consistency.",
  },
  "calories-active-energy": {
    shows: "Estimated active energy or calories burned through movement and exercise.",
    coachUse: "Staff might use this to understand workload, fueling needs, or total activity outside scheduled training.",
    influences: "Body size estimates, activity type, device algorithms, heart rate data, wear time, and workout logging accuracy.",
  },
  "vo2-max": {
    shows: "Estimated endurance fitness or aerobic capacity.",
    coachUse: "Staff might use this to discuss endurance capacity, conditioning progress, or training adaptation.",
    influences: "Running or cycling pace, heart rate response, terrain, weather, fitness changes, and training consistency.",
  },
  "total-sleep-time": {
    shows: "Sleep start, sleep end, awake time, sleep stages, and total sleep duration for a night.",
    coachUse: "Staff might use this for in-depth insights to discuss recovery habits, travel effects, or to personalize training.",
    influences: "Sleep duration, wake events, sleep timing, prior sleep debt, device algorithms, illness, and stress.",
  },
  "sleep-stages-cycles": {
    shows: "Estimated time spent in sleep stages such as wake, REM, core, and deep sleep.",
    coachUse: "Staff might use this to talk about sleep quality, recovery routines, or whether the athlete is getting restorative sleep.",
    influences: "Device algorithms, movement, heart rate patterns, sleep interruptions, stress, illness, alcohol, and normal night-to-night variation.",
  },
  "sleep-score": {
    shows: "A summary score that combines sleep duration, timing, interruptions, and related sleep signals.",
    coachUse: "Staff might use this as a simplified recovery indicator to modify training or prompt discussions.",
    influences: "Sleep duration, wake events, sleep timing, prior sleep debt, device algorithms, illness, and stress.",
  },
  "respiratory-rate": {
    shows: "Estimated breathing rate, often measured overnight.",
    coachUse: "Staff might use this as a possible sign of recovery status, illness, or unusual physiological strain.",
    influences: "Illness, altitude, sleep quality, fatigue, temperature, respiratory conditions, and device measurement quality.",
  },
  "training-load": {
    shows: "A summary of recent strain, activity load, or training stress.",
    coachUse: "Staff might use this to view training intensity, set intensity targets, and review long-term trends.",
    influences: "Workout intensity, duration, heart rate response, previous training, workout frequency, and device-specific load formulas.",
  },
  "recovery-readiness": {
    shows: "A readiness-style summary using signals such as heart rate, respiration, temperature, and sleep.",
    coachUse: "Staff might use this to discuss whether the athlete appears ready for training or may need adjustment.",
    influences: "Sleep, stress, illness, training load, HRV, hydration, and device-specific algorithms.",
  },
  "cycle-tracking": {
    shows: "Current cycle day, predicted period timing, and estimated cycle phase.",
    coachUse: "Staff might use this to discuss individualized training, symptoms, or recovery needs during different hormonal phases.",
    influences: "Cycle regularity, hormonal contraception, stress, illness, pregnancy, sleep, and prediction accuracy.",
  },
  "activity-workout-minutes": {
    shows: "Minutes spent in recorded activity or workouts.",
    coachUse: "Staff might use this to understand training exposure, activity consistency, or unscheduled workload.",
    influences: "Workout logging behavior, device auto-detection, practice structure, injury status, and activities done without the device.",
  },
  "full-workout-report": {
    shows: "Workout history with session type, date, duration, distance, calories, and related summary data.",
    coachUse: "Staff might use this to review training history, compare planned and completed work, or discuss specific sessions.",
    influences: "Which workouts are logged, device detection, GPS quality, heart rate accuracy, manual edits, and whether cross-training is captured.",
  },
  "temperature-deviation": {
    shows: "Skin, wrist, or body temperature deviation from the athlete's baseline.",
    coachUse: "Staff might use this as one possible signal of illness, recovery disruption, or physiological change.",
    influences: "Illness, room temperature, sleep environment, menstrual cycle phase, device fit, travel, and alcohol.",
  },
  "blood-oxygen": {
    shows: "Estimated blood oxygen saturation readings or overnight SpO2 ranges.",
    coachUse: "Staff might use this to discuss altitude response, illness, breathing concerns, or unusual overnight patterns.",
    influences: "Altitude, respiratory illness, sleep position, sensor fit, movement, circulation, nail polish, and device measurement quality.",
  },
}
