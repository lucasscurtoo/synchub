import { createSlice } from '@reduxjs/toolkit'
import { chatService } from '../api/chatApi'
import { chatType } from '@/types/chatType'

interface chatState {
  chats: []
  selectedChat: {
    chatId: string
    participants: { chatPartner: string }
    messages: []
  }
  newChat: {
    chatId: string
    participants: { chatPartner: string }
    messages: []
  }
}

const initialState: chatState = {
  chats: [],
  selectedChat: {
    chatId: '',
    participants: { chatPartner: '' },
    messages: [],
  },
  newChat: {
    chatId: '',
    participants: { chatPartner: '' },
    messages: [],
  },
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createChat: (state, action) => {
      const newChat: chatType = {
        chatId: 'New chat',
        participants: { chatPartner: action.payload._id },
        messages: [],
      }
      state.newChat = newChat
      state.selectedChat = newChat
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      chatService.endpoints.getAllChats.matchFulfilled,
      (state, action) => {
        state.chats = action.payload
      }
    )
  },
})

export const { createChat } = chatSlice.actions

export default chatSlice.reducer
