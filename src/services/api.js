import axios from 'axios';

const api = axios.create({ baseURL: 'localhost:3000', headers: { "ngrok-skip-browser-warning": "true", "Content-Type": "application/json" }});

export default api;