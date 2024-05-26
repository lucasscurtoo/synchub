import { createSlice, current } from '@reduxjs/toolkit'
import { messageService } from '../api/messageApi'

interface messagesState {
  messages: [{ message: string; sentTime: string; userOwner: string }]
}

const initialState: messagesState = {
  messages: [{ message: '', sentTime: '', userOwner: '' }],
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      messageService.endpoints.getChatMessages.matchFulfilled,
      (state, action) => {
        state.messages = action.payload.data.messages
      }
    ),
      builder.addMatcher(
        messageService.endpoints.getChatMessages.matchRejected,
        (state, action) => {
          state.messages = initialState.messages
        }
      ),
      builder.addMatcher(
        messageService.endpoints.sendChatMessage.matchFulfilled,
        (state, action) => {
          const currentState = current(state)
          if (currentState.messages === initialState.messages) {
            state.messages = action.payload.data.messages
          } else {
            state.messages.push(action.payload.data.lastMessage)
          }
        }
      )
  },
})

export const {} = messagesSlice.actions

export default messagesSlice.reducer
