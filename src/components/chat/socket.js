import { io } from 'socket.io-client';
const socket = io(`https://b16d-2804-7f5-b0c2-1188-9822-e3ff-3af5-b36f.ngrok-free.app`, {
  transports: ['websocket'],
  extraHeaders: { 'ngrok-skip-browser-warning': 'true' }
});

export default socket;