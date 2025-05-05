import { io } from 'socket.io-client';

const socket = io(`http://10.28.145.244:3000`, {
  transports: ['websocket'],
});

export default socket;