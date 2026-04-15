export const ITEM_IDS = {
  receptionDesk: 'reception-desk',
  bench: 'bench',
  plant: 'plant',
  filingCabinet: 'filing-cabinet',
  medicineCabinet: 'medicine-cabinet',
} as const

export type ItemId = (typeof ITEM_IDS)[keyof typeof ITEM_IDS]
