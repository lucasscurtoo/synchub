import { userType } from '@/types/userType'
import { createSlice, current, isAnyOf } from '@reduxjs/toolkit'
import { userService } from '../api/userApi'

interface userState extends userType {
  isLoading: boolean
  isUserFirstLoggin: boolean
}

const initialState: userState = {
  _id: '',
  fullName: '',
  email: '',
  profesionalRole: '',
  status: '',
  state: '',
  profilePicture: '',
  isLoading: false,
  isUserFirstLoggin: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        userService.endpoints.getUserById.matchPending,
        userService.endpoints.updateUser.matchPending
      ),
      (state) => {
        state.isLoading = true
      }
    ),
      builder.addMatcher(
        userService.endpoints.getUserById.matchFulfilled,
        (state, action) => {
          state.isLoading = false
          Object.assign(state, action.payload)
          const currentState = current(state)

          const emptyFields = Object.values(currentState).filter(
            (elem) => elem === ''
          )

          if (emptyFields.length > 0) {
            state.isUserFirstLoggin = true
          }
        }
      ),
      builder.addMatcher(
        userService.endpoints.updateUser.matchFulfilled,
        (state, action) => {
          const currentState = current(state)

          const emptyFields = Object.values(currentState).filter(
            (elem) => elem === ''
          )

          if (emptyFields.length > 0) {
            state.isUserFirstLoggin = false
          }
          state.isLoading = false
          return Object.assign(state, action.payload)
        }
      )
  },
})

export const {} = userSlice.actions

export default userSlice.reducer

