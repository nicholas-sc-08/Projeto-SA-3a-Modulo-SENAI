import axios from 'axios';

const api = axios.create({ baseURL: 'https://2423-179-167-31-101.ngrok-free.app', headers: { "ngrok-skip-browser-warning": "true", "Content-Type": "application/json" }});

export default api;