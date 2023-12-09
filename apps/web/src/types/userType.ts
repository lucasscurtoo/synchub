export interface userType {
  fullName: string
  email: string
  status: string
  role: string
  mutedNotifications: boolean
  organiation: string // change for organizaiton type
}

export type registerType = {
  email: string
  password: string
}
