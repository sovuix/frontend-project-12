import { createSlice } from '@reduxjs/toolkit'
import { chatApi } from '../chatApi'

const DEFAULT_CHANNEL_ID = '1'

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    currentChannelId: DEFAULT_CHANNEL_ID,
  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        chatApi.endpoints.createChannel.matchFulfilled,
        (state, { payload }) => {
          state.currentChannelId = payload.id
        },
      )
      .addMatcher(
        chatApi.endpoints.deleteChannel.matchFulfilled,
        (state, { meta }) => {
          const deletedChannelId = meta.arg.originalArgs

          if (state.currentChannelId === deletedChannelId) {
            state.currentChannelId = DEFAULT_CHANNEL_ID
          }
        },
      )
  },
})

export const { setCurrentChannel } = channelsSlice.actions
export default channelsSlice.reducer
