import { apiService } from './api'

export const userService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => ({
        url: `users/${id}`,
      }),
    }),
    getChatPartner: builder.query({
      query: (id) => ({
        url: `users/${id}`,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: 'users/',
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
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userService

