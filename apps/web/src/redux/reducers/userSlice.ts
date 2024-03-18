import { userType } from '@/types/userType'
import { createSlice } from '@reduxjs/toolkit'
import { userService } from '../api/userApi'
// import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: userType = {
  _id: '',
  fullName: '',
  email: '',
  profesionalRole: '',
  status: '',
  state: '',
  organization: '',
  profilePicture: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userService.endpoints.getUserById.matchFulfilled,
      (state, action) => {
        return Object.assign(state, action.payload)
      }
    ),
      builder.addMatcher(
        userService.endpoints.updateUser.matchFulfilled,
        (state, action) => {
          return Object.assign(state, action.payload)
        }
      )
  },
})

export const {} = userSlice.actions

export default userSlice.reducer
