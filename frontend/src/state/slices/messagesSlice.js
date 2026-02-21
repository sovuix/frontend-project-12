import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    entities: {},
    ids: [],
    byChannelId: {},
  },

  reducers: {
    setMessages: (state, action) => {
      const messages = action.payload

      state.entities = {}
      state.ids = []
      state.byChannelId = {}

      messages.forEach((message) => {
        const { id, channelId } = message
        state.entities[id] = message
        state.ids.push(id)
        if (!state.byChannelId[channelId]) {
          state.byChannelId[channelId] = []
        }
        state.byChannelId[channelId].push(id)
      })
    },
    addMessage: (state, action) => {
      const message = action.payload
      const { id, channelId } = message

      state.entities[id] = message
      state.ids.push(id)

      if (!state.byChannelId[channelId]) {
        state.byChannelId[channelId] = []
      }
      state.byChannelId[channelId].push(id)
    },
  },
})

export const { setMessages, addMessage } = messagesSlice.actions
export default messagesSlice.reducer

const selectMessagesState = state => state.messages
const selectChannelIdParam = (_, channelId) => channelId

export const selectMessagesByChannelId = createSelector(
  [selectMessagesState, selectChannelIdParam],
  (messagesState, channelId) => {
    const messageIds = messagesState.byChannelId[channelId] || []
    return messageIds.map(id => messagesState.entities[id])
  },
)

export const selectMessagesCountByChannelId = createSelector(
  [selectMessagesState, selectChannelIdParam],
  (messagesState, channelId) => {
    return (messagesState.byChannelId[channelId] || []).length
  },
)
