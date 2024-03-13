export interface userType {
  _id: string
  fullName: string
  email: string
  status: string
  role: string
  mutedNotifications: boolean
  organization: string
  profilePicture: string
}

export type registerType = {
  email: string
  password: string
}
