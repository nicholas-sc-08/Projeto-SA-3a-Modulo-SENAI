import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL, headers: { "ngrok-skip-browser-warning": "true", "Content-Type": "application/json" }});

export default api;