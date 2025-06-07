import { io } from 'socket.io-client';
const socket = io(`https://0a17-179-89-209-239.ngrok-free.app`, {
  transports: ['websocket'],
  extraHeaders: { 'ngrok-skip-browser-warning': 'true' }
});

export default socket;