import { io } from 'socket.io-client';
const socket = io(import.meta.env.VITE_API_URL, {
  transports: ['websocket'],
  extraHeaders: { 'ngrok-skip-browser-warning': 'true' }
});

export default socket;