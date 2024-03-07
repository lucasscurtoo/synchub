import { createSlice } from '@reduxjs/toolkit'
import { chatService } from '../api/chatApi'

const initialState = {
  chats: [],
  selectedChat: {},
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      chatService.endpoints.getAllChats.matchFulfilled,
      (state, action) => {
        state.chats = action.payload
      }
    )
  },
})

export const {} = chatSlice.actions

export default chatSlice.reducer
