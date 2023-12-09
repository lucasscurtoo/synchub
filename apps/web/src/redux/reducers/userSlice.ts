import { userType } from '@/types/userType'
import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: userType = {
  fullName: '',
  email: '',
  role: '',
  status: '',
  mutedNotifications: false,
  organiation: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})

export const {} = userSlice.actions

export default userSlice.reducer
