export interface userType {
  id: string
  fullName: string
  email: string
  status: string
  role: string
  mutedNotifications: boolean
  organization: string
}

export type registerType = {
  email: string
  password: string
}
