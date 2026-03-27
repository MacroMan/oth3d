import type { LevelConfig } from './types'

export const level01: LevelConfig = {
  id: 'level-01',
  slug: 'lower-bullocks-clinic',
  name: 'Lower Bullocks Clinic',
  description: 'A cramped starter hospital with just enough capacity to prove the operation works.',
  briefing:
    'The town council has handed you an underfunded clinic shell. Keep queues moving, stabilize the books, and convince the locals this place is safer than it looks.',
  plot: {
    width: 64,
    depth: 48,
    entryEdge: 'south',
  },
  startingResources: {
    cash: 30000,
    reputation: 350,
    loanAvailable: 20000,
  },
  patientFlow: {
    arrivalsPerMinute: 2,
    maxQueueSize: 12,
    diseasePoolIds: ['jellyitis', 'slack-tongue', 'grid-bug'],
  },
  startingUnlocks: {
    roomTypeIds: ['reception', 'gp-office', 'pharmacy', 'staff-room'],
    itemIds: ['reception-desk', 'bench', 'plant', 'filing-cabinet', 'medicine-cabinet'],
    staffRoleIds: ['doctor', 'nurse', 'receptionist', 'janitor'],
  },
  seededRooms: [
    {
      id: 'reception-01',
      roomTypeId: 'reception',
      position: { x: -18, z: 14 },
      size: { width: 10, depth: 8 },
    },
    {
      id: 'gp-office-01',
      roomTypeId: 'gp-office',
      position: { x: -4, z: 12 },
      size: { width: 8, depth: 8 },
    },
    {
      id: 'pharmacy-01',
      roomTypeId: 'pharmacy',
      position: { x: 8, z: 12 },
      size: { width: 8, depth: 8 },
    },
  ],
  seededStaff: [
    {
      id: 'staff-doctor-01',
      roleId: 'doctor',
      displayName: 'Dr. Hollis Finch',
      assignedRoomId: 'gp-office-01',
    },
    {
      id: 'staff-nurse-01',
      roleId: 'nurse',
      displayName: 'Nurse Mara Vale',
      assignedRoomId: 'pharmacy-01',
    },
    {
      id: 'staff-reception-01',
      roleId: 'receptionist',
      displayName: 'Ivy Pritchard',
      assignedRoomId: 'reception-01',
    },
    {
      id: 'staff-janitor-01',
      roleId: 'janitor',
      displayName: 'Len Coppers',
    },
  ],
  objectives: [
    {
      id: 'build-staff-room',
      kind: 'buildRoom',
      title: 'Create a Staff Room',
      roomTypeId: 'staff-room',
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
