import { io } from 'socket.io-client';
const socket = io(`https://2909-179-167-31-111.ngrok-free.app`, {
  transports: ['websocket'],
  extraHeaders: { 'ngrok-skip-browser-warning': 'true' }
});

export default socket;