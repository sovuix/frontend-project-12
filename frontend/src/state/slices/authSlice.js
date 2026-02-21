import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: null,
    username: '',
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id
      state.username = action.payload.username
      state.token = action.payload.token
    },
    clearUser: (state) => {
      state.id = null
      state.username = ''
      state.token = null
    },
  },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer
