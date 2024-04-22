import { createSlice } from '@reduxjs/toolkit'

interface AppState {
  section: string
  myProfileModalState: boolean
  spellCheck: boolean
  appTheme: string
}

const initialState: AppState = {
  section: 'messages',
  myProfileModalState: false,
  spellCheck: false,
  appTheme: 'OS',
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
  },
})

export const {
  setAppSection,
  toggleShowyProfileModal,
  toggleSpellcheckOn,
  setAppTheme,
  reset: resetAppSlice,
} = appSlice.actions

export default appSlice.reducer
