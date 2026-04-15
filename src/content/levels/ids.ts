export const LEVEL_IDS = {
  lowerBullocksClinic: 'level-01',
} as const

export type LevelId = (typeof LEVEL_IDS)[keyof typeof LEVEL_IDS]
