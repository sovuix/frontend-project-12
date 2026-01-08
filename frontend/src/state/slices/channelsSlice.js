import { createSlice} from '@reduxjs/toolkit';

const channelsSlice = createSlice({
    name: 'chat',
    initialState: {
        channels:[],
        currentChannelId: '1',
        loading: false,
        error: null,
    },
    reducers: {
        setChannels: (state, action) => {
            state.channels = action.payload;
            state.loading = false;
            state.error = null
        },
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setCurrentChannel:(state, action) => {
            state.currentChannelId = action.payload;
        }
    }
})

export const {setChannels, setLoading, setError, setCurrentChannel} = channelsSlice.actions;
export  default channelsSlice.reducer;