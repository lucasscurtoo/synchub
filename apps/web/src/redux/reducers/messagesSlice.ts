import { createSlice } from '@reduxjs/toolkit'
import { messageService } from '../api/messageApi'

interface messagesState {
  id: ''
  messages: { message: string; sentTime: string; userOwner: string }[]
  messageToEdit: ''
}

const initialState: messagesState = {
  id: '',
  messages: [],
  messageToEdit: '',
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    setMessageToEdit: (state, action) => {
      state.messageToEdit = action.payload
    },
    updateMessage: (state, action) => {
      state.messages = state.messages.map((elem) => {
        if (elem.message === action.payload.oldMessage) {
          return {
            ...elem,
            message: action.payload.message,
          }
        } else {
          return elem
        }
      })
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
    builder.addMatcher(
      messageService.endpoints.editMessage.matchFulfilled,
      (state, action) => {
        state.messageToEdit = ''
      }
    )
  },
})

export const { addMessage, setMessageToEdit, updateMessage } =
  messagesSlice.actions

export default messagesSlice.reducer
