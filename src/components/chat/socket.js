import { io } from 'socket.io-client';
const socket = io(`https://4cd9-189-8-202-5.ngrok-free.app`, {
  transports: ['websocket'],
  extraHeaders: { 'ngrok-skip-browser-warning': 'true' }
});

export default socket;