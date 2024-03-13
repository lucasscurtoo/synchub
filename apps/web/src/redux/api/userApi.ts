import { responseType } from '@/types/apiType'
import { apiService } from './api'

export const userService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<any, any>({
      query: (id) => ({
        url: `users/${id}`,
      }),
      transformResponse: (response: responseType, meta, arg) => response.data,
      transformErrorResponse: (response: responseType) => response.status,
    }),
  }),
})

export const { useGetUserByIdQuery } = userService
