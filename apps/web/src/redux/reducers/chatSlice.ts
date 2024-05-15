import { createSlice } from '@reduxjs/toolkit'
import { chatType } from '@/types/chatType'

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
    partnerData: { fullName: '', profilePicture: '' },
    messages: [],
  },
  newChat: {
    _id: '',
    participants: { _id: '' },
    partnerData: { fullName: '', profilePicture: '' },
    messages: [],
  },
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createChat: (state, action) => {
      const newChat: chatType = {
        _id: '0',
        participants: { _id: action.payload._id },
        partnerData: {
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
  extraReducers: (builder) => {},
})

export const { createChat, setChats, selectChat } = chatSlice.actions

export default chatSlice.reducer

