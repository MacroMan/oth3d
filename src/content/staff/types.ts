import type { DoctorSpecialism, StaffRoleId } from '.'

export type Staff<TStaffId extends string = string> = {
  id: TStaffId
  roleId: StaffRoleId
  displayName: string
  skill: number
}

export type Doctor<TStaffId extends string = string> = Staff<TStaffId> & {
  specialisms: Record<DoctorSpecialism, number>
}
