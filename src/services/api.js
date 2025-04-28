import axios from 'axios';

const api = axios.create({
  baseURL: 'https://e1ae-179-89-210-29.ngrok-free.app',
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
});

export default api;