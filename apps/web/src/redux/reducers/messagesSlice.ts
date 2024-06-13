import { createSlice, current } from '@reduxjs/toolkit'
import { messageService } from '../api/messageApi'

interface messagesState {
  id: ''
  messages: [{ message: string; sentTime: string; userOwner: string }]
}

const initialState: messagesState = {
  id: '',
  messages: [{ message: '', sentTime: '', userOwner: '' }],
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      console.log(action)
      state.messages.push(action.payload)

      const messages = state.messages
      console.log(messages)
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      messageService.endpoints.getChatMessages.matchFulfilled,
      (state, action) => {
        state.id = action.payload.data._id
        state.messages = action.payload.data.messages
      }
    ),
      builder.addMatcher(
        messageService.endpoints.getChatMessages.matchRejected,
        (state, action) => {
          state.messages = initialState.messages
        }
      )
  },
})

export const { addMessage } = messagesSlice.actions

export default messagesSlice.reducer
