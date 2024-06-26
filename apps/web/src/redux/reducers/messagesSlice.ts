import { createSlice } from '@reduxjs/toolkit'
import { messageService } from '../api/messageApi'

interface messagesState {
  id: string
  messages: {
    _id: string
    message: string
    sentTime: string
    userOwner: string
  }[]
  messageToEdit: {
    message: string
    messageId: string
  }
}

const initialState: messagesState = {
  id: '',
  messages: [],
  messageToEdit: {
    message: '',
    messageId: '',
  },
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
        if (elem.message === action.payload.oldMessage.message) {
          return {
            ...elem,
            message: action.payload.editedMessage.message,
          }
        } else {
          return elem
        }
      })
    },
    deleteMessage: (state, action) => {
      state.messages = state.messages.filter(
        (elem) => elem.message !== action.payload.message
      )
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
        state.messageToEdit = initialState.messageToEdit
      }
    )
  },
})

export const { addMessage, setMessageToEdit, updateMessage, deleteMessage } =
  messagesSlice.actions

export default messagesSlice.reducer
