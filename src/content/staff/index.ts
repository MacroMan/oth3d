export const STAFF_ROLE_IDS = {
  doctor: 'doctor',
  nurse: 'nurse',
  receptionist: 'receptionist',
  janitor: 'janitor',
} as const

export type StaffRoleId = (typeof STAFF_ROLE_IDS)[keyof typeof STAFF_ROLE_IDS]

export const DOCTOR_SPECIALISMS = {
  surgeon: 'surgeon',
  psychiatrist: 'psychiatrist',
  researcher: 'researcher',
} as const

export type DoctorSpecialism = (typeof DOCTOR_SPECIALISMS)[keyof typeof DOCTOR_SPECIALISMS]
