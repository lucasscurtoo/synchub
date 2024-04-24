import { createSlice } from '@reduxjs/toolkit'
import { chatService } from '../api/chatApi'
import { userService } from '../api/userApi'
import { authService } from '../api/authApi'

interface AppState {
  section: string
  myProfileModalState: boolean
  spellCheck: boolean
  appTheme: string
  appNotification: { error: boolean; message: string }
}

const initialState: AppState = {
  section: 'messages',
  myProfileModalState: false,
  spellCheck: false,
  appTheme: 'OS',
  appNotification: { error: false, message: '' },
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    reset: () => initialState,
    setAppSection: (state, action) => {
      state.section = action.payload
    },
    toggleShowyProfileModal: (state) => {
      state.myProfileModalState = !state.myProfileModalState
    },
    toggleSpellcheckOn: (state) => {
      state.spellCheck = !state.spellCheck
    },
    setAppTheme: (state, action) => {
      state.appTheme = action.payload
    },
    setAppNotification: (state, action) => {
      state.appNotification = action.payload
    },
    clearAppNotification: (state) => {
      state.appNotification = { error: false, message: '' }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      chatService.endpoints.getAllChats.matchFulfilled,
      (state, action) => {
        console.log('aaa')
        state.appNotification = { error: true, message: 'AJJA' }
      }
    )
    builder.addMatcher(
      authService.endpoints.register.matchRejected,
      (state, action) => {
        state.appNotification = {
          error: true,
          message: (action.payload?.data as { message: string })?.message,
        }
      }
    )
  },
})

export const {
  setAppSection,
  toggleShowyProfileModal,
  toggleSpellcheckOn,
  setAppTheme,
  reset: resetAppSlice,
  setAppNotification,
  clearAppNotification,
} = appSlice.actions

export default appSlice.reducer

