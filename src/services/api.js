import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dc7d-2804-7f5-b0c0-fd9-487a-7c5b-df1f-8cff.ngrok-free.app',
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
});

export default api;