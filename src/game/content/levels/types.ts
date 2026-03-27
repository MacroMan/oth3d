export type LevelObjective =
  | {
      id: string
      kind: 'curedPatients'
      title: string
      target: number
      description: string
    }
  | {
      id: string
      kind: 'reputation'
      title: string
      target: number
      description: string
    }
  | {
      id: string
      kind: 'monthlyProfit'
      title: string
      target: number
      description: string
    }
  | {
      id: string
      kind: 'buildRoom'
      title: string
      roomTypeId: string
      description: string
    }

export type LevelPlotConfig = {
  width: number
  depth: number
  entryEdge: 'north' | 'east' | 'south' | 'west'
}

export type LevelStartingResources = {
  cash: number
  reputation: number
  loanAvailable: number
}

export type LevelPatientFlowConfig = {
  arrivalsPerMinute: number
  maxQueueSize: number
  diseasePoolIds: string[]
}

export type LevelUnlockConfig = {
  roomTypeIds: string[]
  itemIds: string[]
  staffRoleIds: string[]
}

export type LevelRoomSeed = {
  id: string
  roomTypeId: string
  position: {
    x: number
    z: number
  }
  size: {
    width: number
    depth: number
  }
}

export type LevelStaffSeed = {
  id: string
  roleId: string
  displayName: string
  assignedRoomId?: string
}

export type LevelConfig = {
  id: string
  slug: string
  name: string
  description: string
  briefing: string
  plot: LevelPlotConfig
  startingResources: LevelStartingResources
  patientFlow: LevelPatientFlowConfig
  startingUnlocks: LevelUnlockConfig
  seededRooms: LevelRoomSeed[]
  seededStaff: LevelStaffSeed[]
  objectives: LevelObjective[]
}
