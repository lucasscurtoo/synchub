import { registerType, userType } from '@/types/userType'
import { apiService } from './api'

export const chatService = apiService.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<userType, registerType>({
      query: (body) => ({
        url: `auth/register`,
        method: 'POST',
        body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: userType }, meta, arg) =>
        response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
      invalidatesTags: ['Users'],
      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`

      // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
    }),
    login: build.mutation<userType, registerType>({
      query: (body) => ({
        url: `auth/login`,
        method: 'POST',
        body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: userType }, meta, arg) =>
        response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
      invalidatesTags: ['Users'],
      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`

      // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = chatService
