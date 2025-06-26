import { io } from 'socket.io-client';
const socket = io(`https://2423-179-167-31-101.ngrok-free.app`, {
  transports: ['websocket'],
  extraHeaders: { 'ngrok-skip-browser-warning': 'true' }
});

export default socket;