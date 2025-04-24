import { io } from 'socket.io-client';

// esse aquivo vai faze conexão com o servidor backend
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  transports: ['websocket'],
  autoConnect: false,
});

export default socket;