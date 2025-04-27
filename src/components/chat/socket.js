import { io } from 'socket.io-client';

const socket = io(`https://e4b5-179-89-210-29.ngrok-free.app `, {
  transports: ['websocket'],
  autoConnect: false,
});

export default socket;