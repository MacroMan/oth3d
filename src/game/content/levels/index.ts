import { level01 } from './level-01'

export { level01 }
export * from './types'

export const levels = [level01]

export const levelsById = Object.fromEntries(levels.map((level) => [level.id, level]))
