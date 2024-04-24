import { registerType, userType } from '@/types/userType'
import { apiService } from './api'
import { responseType } from '@/types/apiType'

export const authService = apiService.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({
        url: `auth/register`,
        method: 'POST',
        body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      // Pick out data and prevent nested properties in a hook or selector
      // transformResponse: (response: responseType, meta, arg) => response,
      // Pick out errors and prevent nested properties in a hook or selector
      // transformErrorResponse: (response: { status: string | number }) =>
      //   response.status,
      invalidatesTags: ['Auth'],
      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`

      // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
    }),
  }),
})

export const { useRegisterMutation } = authService

