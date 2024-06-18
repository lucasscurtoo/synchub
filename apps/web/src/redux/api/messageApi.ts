import { apiService } from './api'
import { addMessage, updateMessage } from '../reducers/messagesSlice'
import { SocketSingleton } from '@/socket.io/SocketSingleton'

export const messageService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getChatMessages: builder.mutation({
      async queryFn(chatId, _queryApi, _extraOptions, fetchWithBQ) {
        const socket = await SocketSingleton.getInstance()
        return new Promise((resolve, reject) => {
          socket.emit('getMessagesToServer', { chatId })
          socket.on('getMessagesToClient', (response: any) => {
            console.log(response)
            if (response.error) {
              return reject({ error: response.error })
            }
            resolve({ data: response })
          })

          socket.on('error', (error: any) => {
            reject({ error })
          })
        })
      },
    }),
    sendChatMessage: builder.mutation({
      async queryFn(
        { senderId, receiverId, chatId, message },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ): Promise<any> {
        const socket = await SocketSingleton.getInstance()
        socket.emit('chatMessageToServer', {
          senderId,
          receiverId,
          chatId,
          message,
        })
      },
    }),
    listenForMessages: builder.query<{ value: number }[], string>({
      queryFn() {
        return { data: [] }
      },
      async onCacheEntryAdded(
        {},
        { cacheEntryRemoved, cacheDataLoaded, dispatch }
      ) {
        await cacheDataLoaded

        const socket = await SocketSingleton.getInstance()
        const listener = (data: any) => {
          dispatch(addMessage(data.data.lastMessage))
        }

        socket.on('chatMessageToClient', listener)

        await cacheEntryRemoved
        socket.off('chatMessageToClient', listener)
      },
    }),
    editMessage: builder.mutation({
      async queryFn(
        { chatId, messageToEdit, newMessage, participants },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ): Promise<any> {
        const socket = await SocketSingleton.getInstance()
        return new Promise((resolve, reject) => {
          socket.emit('chatEditMessageToServer', {
            chatId,
            messageToEdit,
            newMessage,
            participants,
          })
          resolve({})

          socket.on('error', (error: any) => {
            reject({ error })
          })
        })
      },
    }),
    listenForMessageEdit: builder.query({
      queryFn() {
        return { data: [] }
      },
      async onCacheEntryAdded(
        {},
        { cacheEntryRemoved, cacheDataLoaded, dispatch }
      ) {
        await cacheDataLoaded

        const socket = await SocketSingleton.getInstance()
        const listener = (data: any) => {
          dispatch(updateMessage(data.data))
        }

        socket.on('chatEditMessageToClient', listener)

        await cacheEntryRemoved
        socket.off('chatEditMessageToClient', listener)
      },
    }),
  }),
})

export const {
  useGetChatMessagesMutation,
  useSendChatMessageMutation,
  useEditMessageMutation,
  useListenForMessagesQuery,
  useListenForMessageEditQuery,
} = messageService
