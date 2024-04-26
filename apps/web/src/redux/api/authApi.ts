import { apiService } from './api'

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
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const { useRegisterMutation } = authService

