import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  section: 'messages',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppSection: (state, action) => {
      state.section = action.payload
    },
  },
})

export const { setAppSection } = appSlice.actions

export default appSlice.reducer
