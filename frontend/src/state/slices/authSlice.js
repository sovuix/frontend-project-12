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
      const { id = state.id, username, token } = action.payload
      state.id = id
      state.username = username
      state.token = token
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
