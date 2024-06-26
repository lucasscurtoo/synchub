import { SocketSingleton } from '@/socket.io/SocketSingleton'
import { apiService } from './api'

export const chatService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      async queryFn(
        { senderId, receiverId, chatId, message },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) {
        const socket = await SocketSingleton.getInstance()
        return new Promise((resolve, reject) => {
          socket.emit('createChatToServer', {
            senderId,
            receiverId,
            chatId,
            message,
          })
          socket.on('createChatToClient', (response: any) => {
            resolve({ data: response })
          })
          socket.on('error', (error: any) => {
            reject({ error })
          })
        })
      },
    }),
    getAllChats: builder.mutation({
      async queryFn(userId, _queryApi, _extraOptions, fetchWithBQ) {
        const socket = await SocketSingleton.getInstance()
        return new Promise((resolve, reject) => {
          socket.emit('getAllChats', userId)
          socket.on('chats', (response: any) => {
            resolve({ data: response })
          })
          socket.on('error', (error: any) => {
            reject({ error })
          })
        })
      },
    }),
  }),
})

export const { useCreateChatMutation, useGetAllChatsMutation } = chatService
