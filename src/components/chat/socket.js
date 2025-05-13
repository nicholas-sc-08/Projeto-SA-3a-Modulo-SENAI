import { io } from 'socket.io-client';
<<<<<<< HEAD

const socket = io(`http://localhost:3001`, {
=======
const socket = io(`https://3746-189-8-202-5.ngrok-free.app`, {
>>>>>>> d6ac00f48a4bca6161b85e3129199fd99c5819ca
  transports: ['websocket'],
  extraHeaders: { 'ngrok-skip-browser-warning': 'true' }
});

export default socket;