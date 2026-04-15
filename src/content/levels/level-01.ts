import { DISEASE_IDS } from '@content/diseases'
import { ITEM_IDS } from '@content/items'
import { ROOM_TYPE_IDS } from '@content/rooms'
import { STAFF_ROLE_IDS } from '@/content/staff'
import { LEVEL_IDS } from './ids'
import type { LevelConfig } from './types'

export const level01: LevelConfig<typeof LEVEL_IDS.lowerBullocksClinic> = {
  id: LEVEL_IDS.lowerBullocksClinic,
  slug: 'lower-bullocks-clinic',
  name: 'Lower Bullocks Clinic',
  description: 'A cramped starter hospital with just enough capacity to prove the operation works.',
  briefing:
    'The town council has handed you an underfunded clinic shell. Keep queues moving, stabilize the books, and convince the locals this place is safer than it looks.',
  plot: {
    width: 64,
    depth: 48,
  },
  startingResources: {
    cash: 30000,
    reputation: 350,
    loanAvailable: 20000,
  },
  patientFlow: {
    arrivalsPerMinute: 2,
    diseasePoolIds: [DISEASE_IDS.jellyitis, DISEASE_IDS.slackTongue, DISEASE_IDS.gridBug],
  },
  startingRooms: [ROOM_TYPE_IDS.reception, ROOM_TYPE_IDS.gpOffice, ROOM_TYPE_IDS.pharmacy],
  unlockableRooms: [ROOM_TYPE_IDS.staffRoom],
  startingItems: [
    ITEM_IDS.receptionDesk,
    ITEM_IDS.bench,
    ITEM_IDS.plant,
    ITEM_IDS.filingCabinet,
    ITEM_IDS.medicineCabinet,
  ],
  unlockableItems: [],
  startingStaff: [
    {
      id: 'staff-doctor-01',
      roleId: STAFF_ROLE_IDS.doctor,
      displayName: 'Dr. Hollis Finch',
    },
    {
      id: 'staff-nurse-01',
      roleId: STAFF_ROLE_IDS.nurse,
      displayName: 'Nurse Mara Vale',
    },
    {
      id: 'staff-reception-01',
      roleId: STAFF_ROLE_IDS.receptionist,
      displayName: 'Ivy Pritchard',
    },
    {
      id: 'staff-janitor-01',
      roleId: STAFF_ROLE_IDS.janitor,
      displayName: 'Len Coppers',
    },
  ],
  objectives: [
    {
      id: 'build-staff-room',
      kind: 'buildRoom',
      title: 'Create a Staff Room',
      roomTypeId: ROOM_TYPE_IDS.staffRoom,
      description: 'Open a break room before morale collapses.',
    },
    {
      id: 'cure-25-patients',
      kind: 'curedPatients',
      title: 'Cure 25 Patients',
      target: 25,
      description: 'Prove the clinic can handle a steady flow of everyday cases.',
    },
    {
      id: 'reach-reputation-500',
      kind: 'reputation',
      title: 'Reach 500 Reputation',
      target: 500,
      description: 'Win over skeptical locals with fast service and good outcomes.',
    },
    {
      id: 'monthly-profit-5000',
      kind: 'monthlyProfit',
      title: 'Earn $5,000 Monthly Profit',
      target: 5000,
      description: 'Get the hospital out of survival mode and into sustainable growth.',
    },
  ],
}
