import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { authStorage } from '../services/authStorage'

export const chatApi = createApi({
  reducerPath: 'chatApi',

  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => {
      const token = authStorage.getToken()
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),

  tagTypes: ['Channel', 'Message'],

  endpoints: builder => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: '/login',
        method: 'POST',
        body: { username, password },
      }),
    }),

    signup: builder.mutation({
      query: ({ username, password }) => ({
        url: '/signup',
        method: 'POST',
        body: { username, password },
      }),
    }),

    getChannels: builder.query({
      query: () => '/channels',
      providesTags: ['Channel'],
    }),

    createChannel: builder.mutation({
      query: name => ({
        url: '/channels',
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: ['Channel'],
    }),

    deleteChannel: builder.mutation({
      query: id => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channel'],
    }),

    renameChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: ['Channel'],
    }),

    getMessages: builder.query({
      query: () => '/messages',
      providesTags: ['Message'],
    }),

    sendMessage: builder.mutation({
      query: message => ({
        url: '/messages',
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Message'],
    }),
  }),
})

export const {
  useLoginMutation,
  useSignupMutation,

  useGetChannelsQuery,
  useCreateChannelMutation,
  useDeleteChannelMutation,
  useRenameChannelMutation,

  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApi
