import { apiService } from './api'

export const chatService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getAllChats: builder.query({
      query: (owner) => ({
        url: `chats?owner=${owner}`,
      }),
    }),
  }),
})

export const { useGetAllChatsQuery } = chatService
