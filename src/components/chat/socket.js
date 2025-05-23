import { io } from 'socket.io-client';
const socket = io(`localhost:3000`, {
  transports: ['websocket'],
  extraHeaders: { 'ngrok-skip-browser-warning': 'true' }
});

export default socket;