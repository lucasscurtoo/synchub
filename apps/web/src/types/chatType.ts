export type chatType = {
  _id: string
  participants: { _id: string }
  partnerData: {
    _id: string
    fullName: string
    profilePicture: string
  }
  messages: []
}

