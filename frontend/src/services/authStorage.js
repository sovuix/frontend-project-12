const TOKEN_KEY = 'jwtToken'
const USERNAME_KEY = 'username'

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: token => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
  getUsername: () => localStorage.getItem(USERNAME_KEY),
  setUsername: username => localStorage.setItem(USERNAME_KEY, username),
  clear: () => localStorage.clear(),
}
