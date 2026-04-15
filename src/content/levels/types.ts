import type { DiseaseId } from '@content/diseases'
import type { ItemId } from '@content/items'
import type { RoomTypeId } from '@content/rooms'
import type { StaffRoleId } from '@/content/staff'
import type { LevelId } from './ids'

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
      roomTypeId: RoomTypeId
      description: string
    }

export type LevelPlotConfig = {
  width: number
  depth: number
}

export type LevelStartingResources = {
  cash: number
  reputation: number
  loanAvailable: number
}

export type LevelPatientFlowConfig = {
  arrivalsPerMinute: number
  diseasePoolIds: DiseaseId[]
}

export type LevelStartingStaff<
  TStaffId extends string = string,
  TRoomId extends string = string,
> = {
  id: TStaffId
  roleId: StaffRoleId
  displayName: string
  assignedRoomId?: TRoomId
}

export type LevelConfig<TLevelId extends LevelId = LevelId> = {
  id: TLevelId
  slug: string
  name: string
  description: string
  briefing: string
  plot: LevelPlotConfig
  startingResources: LevelStartingResources
  patientFlow: LevelPatientFlowConfig
  startingRooms: RoomTypeId[]
  unlockableRooms: RoomTypeId[]
  startingItems: ItemId[]
  unlockableItems: ItemId[]
  startingStaff: LevelStartingStaff[]
  objectives: LevelObjective[]
}
