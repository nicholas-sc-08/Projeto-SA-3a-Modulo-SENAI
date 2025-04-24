import { io } from 'socket.io-client';

// esse aquivo vai faze conexão com o servidor backend
const socket = io('http:// 10.28.144.40:3000/', {
  transports: ['websocket'],
  autoConnect: false,
});

export default socket;