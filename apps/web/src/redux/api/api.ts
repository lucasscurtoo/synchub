import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { RootState } from '../store'
import { Action, PayloadAction } from '@reduxjs/toolkit'
import { getSession } from 'next-auth/react'

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}

export const apiService = createApi({
  reducerPath: 'apiService',
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession()
      if (session) {
        headers.set('Authorization', `Bearer ${session?.token.accessToken}`)
      }
      return headers
    },
  }),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return (action.payload as RootState)[reducerPath]
    }
  },
  tagTypes: ['Messages', 'Users', 'Auth'],
  endpoints: (builder) => ({}),
})

