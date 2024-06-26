import { createSlice } from '@reduxjs/toolkit'
import { chatType } from '@/types/chatType'
import { chatService } from '../api/chatApi'

interface chatState {
  chats: chatType[]
  selectedChat: chatType
  newChat: chatType
}

const initialState: chatState = {
  chats: [],
  selectedChat: {
    _id: '',
    participants: { _id: '' },
    partnerData: { _id: '', fullName: '', profilePicture: '' },
    messages: [],
  },
  newChat: {
    _id: '',
    participants: { _id: '' },
    partnerData: { _id: '', fullName: '', profilePicture: '' },
    messages: [],
  },
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createChat: (state, action) => {
      const newChat: chatType = {
        _id: 'NEW_CHAT',
        participants: { _id: action.payload._id },
        partnerData: {
          _id: action.payload._id,
          fullName: action.payload.fullName,
          profilePicture: action.payload.profilePicture,
        },
        messages: [],
      }
      state.newChat = newChat
      state.selectedChat = newChat
    },
    setChats: (state, action) => {
      state.chats = action.payload
    },
    selectChat: (state, action) => {
      state.selectedChat = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      chatService.endpoints.getAllChats.matchFulfilled,
      (state, action) => {
        state.chats = action.payload.data
      }
    ),
      builder.addMatcher(
        chatService.endpoints.createChat.matchFulfilled,
        (state, action) => {
          state.chats.push(action.payload.data)
          state.selectedChat = action.payload.data
        }
      )
  },
})

export const { createChat, setChats, selectChat } = chatSlice.actions

export default chatSlice.reducer

