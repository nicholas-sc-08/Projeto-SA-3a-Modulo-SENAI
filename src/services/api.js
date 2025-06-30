import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001', headers: { "ngrok-skip-browser-warning": "true", "Content-Type": "application/json" }});

export default api;