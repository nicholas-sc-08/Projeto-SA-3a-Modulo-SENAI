import axios from 'axios';

const api = axios.create({ baseURL: 'https://b108-187-55-40-7.ngrok-free.app', headers: { "ngrok-skip-browser-warning": "true", "Content-Type": "application/json" }});

export default api;