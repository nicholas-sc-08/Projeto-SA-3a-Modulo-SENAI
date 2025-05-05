import { io } from 'socket.io-client';

<<<<<<< HEAD
const socket = io(`http://localhost:3000`, {
=======
const socket = io(`http://10.28.145.244:3000`, {
>>>>>>> 1a6d259ac2fc13c734a35eb84a660e4e6a48cdca
  transports: ['websocket'],
});

export default socket;