import { io } from 'socket.io-client';
const socket = io(`https://f616-189-8-202-5.ngrok-free.app`, {
  transports: ['websocket'],
  extraHeaders: { 'ngrok-skip-browser-warning': 'true' }
});

export default socket;