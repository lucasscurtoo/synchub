import { createConnectionWithToken } from '@/socket.io/sockets'
import { apiService } from './api'
import { Socket } from 'socket.io-client'

let socket: Socket | null = null

const getSocket = async () => {
  if (!socket) {
    socket = await createConnectionWithToken('chats')
  }
  return socket
}

export const chatService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      async queryFn(
        { senderId, receiverId, chatId, message },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) {
        const currentSocket = await getSocket()
        return new Promise((resolve, reject) => {
          currentSocket.emit('createChatToServer', {
            senderId,
            receiverId,
            chatId,
            message,
          })
          currentSocket.on('createChatToClient', (response: any) => {
            resolve({ data: response })
          })
          currentSocket.on('error', (error: any) => {
            reject({ error })
          })
        })
      },
      extraOptions: {
        overrideExisting: true,
      },
    }),
    getAllChats: builder.mutation({
      async queryFn(userId, _queryApi, _extraOptions, fetchWithBQ) {
        const currentSocket = await getSocket()
        return new Promise((resolve, reject) => {
          currentSocket.emit('getAllChats', userId)
          currentSocket.on('chats', (response: any) => {
            resolve({ data: response })
          })
          currentSocket.on('error', (error: any) => {
            reject({ error })
          })
        })
      },
      extraOptions: {
        overrideExisting: true,
      },
    }),
  }),
})

export const { useCreateChatMutation, useGetAllChatsMutation } = chatService
