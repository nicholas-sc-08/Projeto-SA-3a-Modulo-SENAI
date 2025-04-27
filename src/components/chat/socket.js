import { io } from 'socket.io-client';

const socket = io(`https://dc7d-2804-7f5-b0c0-fd9-487a-7c5b-df1f-8cff.ngrok-free.app/ `, {
  transports: ['websocket'],
  autoConnect: false,
});

export default socket;