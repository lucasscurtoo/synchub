import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { chatService } from '../api/chatApi'
import { userService } from '../api/userApi'
import { authService } from '../api/authApi'

interface AppState {
  section: string
  myProfileModalState: boolean
  spellCheck: boolean
  language: string
  appTheme: string
  appNotification: { error: boolean; message: string }
}

const initialState: AppState = {
  section: 'messages',
  myProfileModalState: false,
  spellCheck: false,
  language: 'es',
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
    setAppLanguage: (state, action) => {
      state.language = action.payload
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
    // Handle all errors from the backend
    builder.addMatcher(
      isAnyOf(
        userService.endpoints.updateUser.matchRejected,
        authService.endpoints.register.matchRejected
      ),
      (state, action) => {
        state.appNotification = {
          error: true,
          message: (action.payload?.data as { message: string })?.message,
        }
      }
    )
    // Handle all success messages from the backend
    builder.addMatcher(
      isAnyOf(userService.endpoints.updateUser.matchFulfilled),
      (state, action) => {
        state.appNotification = {
          error: false,
          message: action.payload?.message,
        }
      }
    )
  },
})

export const {
  setAppSection,
  toggleShowyProfileModal,
  toggleSpellcheckOn,
  setAppLanguage,
  setAppTheme,
  reset: resetAppSlice,
  setAppNotification,
  clearAppNotification,
} = appSlice.actions

export default appSlice.reducer

