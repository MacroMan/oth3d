export type LevelsConfig = {
  maxQueueSize: number
  doctorThreshold: number // percent
  consultantThreshold: number // percent
}

export const levelsConfig: LevelsConfig = {
  maxQueueSize: 12,
  doctorThreshold: 0.25, // percent
  consultantThreshold: 0.75, // percent
}
