import axios from 'axios';

const api = axios.create({ baseURL: 'https://3746-189-8-202-5.ngrok-free.app', headers: { "ngrok-skip-browser-warning": "true", "Content-Type": "application/json" }});

export default api;