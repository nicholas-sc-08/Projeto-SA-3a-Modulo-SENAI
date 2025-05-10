import { io } from 'socket.io-client';
const socket = io(`https://36d0-179-93-239-81.ngrok-free.app`, {
  transports: ['websocket'],
  extraHeaders: { 'ngrok-skip-browser-warning': 'true' }
});

export default socket;