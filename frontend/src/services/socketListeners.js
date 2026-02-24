import socket from './socket'
import store from '../state/store'

import { addMessage } from '../state/slices/messagesSlice'
import {
  addChannel,
  removeChannel,
  renameChannel,
} from '../state/slices/channelsSlice'

const initSocketListeners = () => {
  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message))
  })

  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel))
  })

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel(id))
  })

  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(renameChannel({ id, name }))
  })
}

export default initSocketListeners
