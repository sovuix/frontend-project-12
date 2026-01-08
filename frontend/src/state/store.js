import {configureStore} from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsSlice'
import messagesReducer from './slices/messagesSlice'

const store = configureStore({
    reducer: {
        chat: channelsReducer,
        messages: messagesReducer,
    }
})

export default store;