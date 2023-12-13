import { registerType, userType } from '@/types/userType'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    register: build.mutation<userType, registerType>({
      query: (body) => ({
        url: `auth/register`,
        method: 'POST',
        body,
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: userType }, meta, arg) =>
        response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
      invalidatesTags: ['User'],
      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`

      // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
    }),
    login: build.mutation<userType, registerType>({
      query: (body) => ({
        url: `auth/login`,
        method: 'POST',
        body,
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: userType }, meta, arg) =>
        response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
      invalidatesTags: ['User'],
      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`

      // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation } = userApi
