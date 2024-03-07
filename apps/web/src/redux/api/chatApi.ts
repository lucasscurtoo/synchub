import { responseType } from '@/types/apiType'
import { apiService } from './api'

export const chatService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getAllChats: builder.query<any, any>({
      query: (owner) => ({
        url: `chats?owner=${owner}`,
      }),
      transformResponse: (response: responseType, meta, arg) => response.data,
      transformErrorResponse: (response: responseType) => response.status,
    }),
  }),
})

export const { useGetAllChatsQuery } = chatService
