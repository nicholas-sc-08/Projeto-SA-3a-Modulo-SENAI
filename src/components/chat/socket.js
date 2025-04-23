import { io } from 'socket.io-client';

// esse aquivo vai faze conexão com o servidor backend
const socket = io('http://localhost:3000', {
  transports: ['websocket'],
  autoConnect: false,
});

export default socket;