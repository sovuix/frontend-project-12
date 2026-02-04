import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
    name: 'chat',
    initialState: {
        channels: [],
        currentChannelId: '1',
        loading: false,
        error: null,
    },
    reducers: {
        setChannels: (state, action) => {
            state.channels = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setCurrentChannel: (state, action) => {
            state.currentChannelId = action.payload;
        },
        addChannel: (state, action) => {
            state.channels.push(action.payload);
        },
        removeChannel: (state, action) => {
            const channelId = action.payload;
            state.channels = state.channels.filter(
                (channel) => channel.id !== channelId
            );
            if (state.currentChannelId === channelId) {
                state.currentChannelId = state.channels[0]?.id || null;
            }
        },
        renameChannel: (state, action) => {
            const { id, name } = action.payload;
            const channel = state.channels.find((ch) => ch.id === id);
            if (channel) {
                channel.name = name;
            }
        },
    },
});

export const {
    setChannels,
    setLoading,
    setError,
    setCurrentChannel,
    addChannel,
    removeChannel,
    renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
