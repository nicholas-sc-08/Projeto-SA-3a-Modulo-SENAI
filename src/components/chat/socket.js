import { io } from 'socket.io-client';
const socket = io(`https://b108-187-55-40-7.ngrok-free.app`, {
  transports: ['websocket'],
  extraHeaders: { 'ngrok-skip-browser-warning': 'true' }
});

export default socket;