// import { io } from 'socket.io-client';

// const socket = io('http://localhost:5001');

// export default socket;

import { io } from 'socket.io-client'

const socket = io('/', {
  path: '/socket.io',
  transports: ['websocket'],
})

export default socket
