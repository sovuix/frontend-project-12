import store from '../store'
import { setUser } from '../slices/authSlice'
import { authStorage } from '../../services/authStorage'

const initAuth = () => {
  const token = authStorage.getToken()
  const username = authStorage.getUsername()

  if (token && username) {
    store.dispatch(setUser({ username, token }))
  }
}

export default initAuth
