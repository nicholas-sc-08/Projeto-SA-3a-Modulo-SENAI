import { io } from 'socket.io-client';
const socket = io(`https://455d-179-89-214-186.ngrok-free.app`, {
  transports: ['websocket'],
  extraHeaders: { 'ngrok-skip-browser-warning': 'true' }
});

export default socket;