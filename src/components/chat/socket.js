import { io } from 'socket.io-client';
const socket = io(`https://f8fb-179-89-209-133.ngrok-free.app`, {
  transports: ['websocket'],
  extraHeaders: { 'ngrok-skip-browser-warning': 'true' }
});

export default socket;