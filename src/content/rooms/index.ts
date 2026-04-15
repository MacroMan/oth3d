export const ROOM_TYPE_IDS = {
  reception: 'reception',
  gpOffice: 'gp-office',
  pharmacy: 'pharmacy',
  staffRoom: 'staff-room',
} as const

export type RoomTypeId = (typeof ROOM_TYPE_IDS)[keyof typeof ROOM_TYPE_IDS]
