export type chatType = {
  _id: string
  participants: { _id: string }
  partnerData: {
    fullName: string
    profilePicture: string
  }
  messages: []
}

