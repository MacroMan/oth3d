export const DISEASE_IDS = {
  jellyitis: 'jellyitis',
  slackTongue: 'slack-tongue',
  gridBug: 'grid-bug',
} as const

export type DiseaseId = (typeof DISEASE_IDS)[keyof typeof DISEASE_IDS]
