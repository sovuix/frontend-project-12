import { configureStore } from '@reduxjs/toolkit'
import channelsReducer from './slices/channelsSlice'
import authReducer from './slices/authSlice'
import { chatApi } from './chatApi'

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    auth: authReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(chatApi.middleware),
})

export default store
