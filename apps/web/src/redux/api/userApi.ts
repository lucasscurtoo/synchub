import { apiService } from './api'

export const userService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => ({
        url: `users/${id}`,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userService

