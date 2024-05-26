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

export const messageService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getChatMessages: builder.mutation({
      async queryFn(chatId, _queryApi, _extraOptions, fetchWithBQ) {
        const currentSocket = await getSocket()
        return new Promise((resolve, reject) => {
          currentSocket.emit('getMessagesToServer', { chatId })
          currentSocket.on('getMessagesToClient', (response: any) => {
            if (response.error) {
              return reject({ error: response.error })
            }
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
    sendChatMessage: builder.mutation({
      async queryFn(
        { senderId, receiverId, chatId, message },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) {
        const currentSocket = await getSocket()
        currentSocket.emit('chatMessageToServer', {
          senderId,
          receiverId,
          chatId,
          message,
        })
        return new Promise((resolve, reject) => {
          currentSocket.on('chatMessageToClient', (response: any) => {
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

export const { useGetChatMessagesMutation, useSendChatMessageMutation } =
  messageService
