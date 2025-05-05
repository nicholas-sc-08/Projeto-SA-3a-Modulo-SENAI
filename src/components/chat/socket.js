import { io } from 'socket.io-client';

const socket = io(`http://10.3.61.122:3000`, {
  transports: ['websocket'],
});

export default socket;