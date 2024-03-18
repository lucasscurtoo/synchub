export interface userType {
  _id: string
  fullName: string
  email: string
  status: string
  state: string
  profesionalRole: string
  organization: string
  profilePicture: string
}

export type registerType = {
  email: string
  password: string
}
