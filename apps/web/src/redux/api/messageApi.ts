import { apiService } from './api'
import {
  addMessage,
  deleteMessage,
  updateMessage,
} from '../reducers/messagesSlice'
import { SocketSingleton } from '@/socket.io/SocketSingleton'
import { store } from '../store'

const handleError = (socket: any, reject: (reason?: any) => void) => {
  const errorHandler = (error: any) => {
    reject({ error })
    socket.off('error', errorHandler)
  }
  socket.on('error', errorHandler)
}

export const messageService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getChatMessages: builder.mutation({
      async queryFn(chatId, _queryApi, _extraOptions, fetchWithBQ) {
        const socket = await SocketSingleton.getInstance()
        return new Promise((resolve, reject) => {
          socket.emit('getMessagesToServer', { chatId })

          const messageHandler = (response: any) => {
            socket.off('getMessagesToClient', messageHandler)
            if (response.error) {
              return reject({ error: response.error })
            }
            resolve({ data: response })
          }

          socket.on('getMessagesToClient', messageHandler)
          handleError(socket, reject)
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
        { chatId, messageId, newMessage, participants },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ): Promise<any> {
        const socket = await SocketSingleton.getInstance()
        return new Promise((resolve, reject) => {
          socket.emit('chatEditMessageToServer', {
            chatId,
            messageId,
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

    deleteMessage: builder.mutation({
      async queryFn(
        { messageId },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ): Promise<any> {
        const socket = await SocketSingleton.getInstance()
        const { selectedChat } = store.getState().chat
        return new Promise((resolve, reject) => {
          socket.emit('chatDeleteMessageToServer', {
            chatId: selectedChat._id,
            messageId,
            participants: selectedChat.participants,
          })
          resolve({})

          socket.on('error', (error: any) => {
            reject({ error })
          })
        })
      },
    }),

    listenForMessagesDeletes: builder.query({
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
          console.log(data)
          dispatch(deleteMessage(data.data))
        }

        socket.on('chatDeleteMessageToClient', listener)

        await cacheEntryRemoved
        socket.off('chatDeleteMessageToClient', listener)
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
  useDeleteMessageMutation,
  useListenForMessagesDeletesQuery,
} = messageService
