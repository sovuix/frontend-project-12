import {configureStore} from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsSlice'

const store = configureStore({
    reducer: {
        chat: channelsReducer,
    }
})

export default store;