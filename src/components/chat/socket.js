import { io } from 'socket.io-client';

const socket = io(`http://192.168.15.14:3000`, {
  transports: ['websocket'],
});

export default socket;