import socket from './socket'
import store from '../state/store'
import { chatApi } from '../state/chatApi'

const initSocketListeners = () => {
  socket.on('newMessage', (message) => {
    store.dispatch(
      chatApi.util.updateQueryData('getMessages', undefined, (draft) => {
        const exists = draft.some(m => m.id === message.id)
        if (!exists) draft.push(message)
      }),
    )
  })

  socket.on('newChannel', (channel) => {
    store.dispatch(
      chatApi.util.updateQueryData('getChannels', undefined, (draft) => {
        const exists = draft.some(c => c.id === channel.id)
        if (!exists) draft.push(channel)
      }),
    )
  })

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(
      chatApi.util.updateQueryData('getChannels', undefined, (draft) => {
        const idx = draft.findIndex(c => c.id === id)
        if (idx !== -1) draft.splice(idx, 1)
      }),
    )
  })

  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(
      chatApi.util.updateQueryData('getChannels', undefined, (draft) => {
        const ch = draft.find(c => c.id === id)
        if (ch) ch.name = name
      }),
    )
  })
}

export default initSocketListeners
