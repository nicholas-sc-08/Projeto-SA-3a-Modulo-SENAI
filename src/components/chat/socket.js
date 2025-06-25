import { io } from 'socket.io-client';
const socket = io(`https://0d86-189-8-202-5.ngrok-free.app`, {
  transports: ['websocket'],
  extraHeaders: { 'ngrok-skip-browser-warning': 'true' }
});

export default socket;