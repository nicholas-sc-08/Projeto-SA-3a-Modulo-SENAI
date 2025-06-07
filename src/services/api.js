import axios from 'axios';

const api = axios.create({ baseURL: 'https://0a17-179-89-209-239.ngrok-free.app', headers: { "ngrok-skip-browser-warning": "true", "Content-Type": "application/json" }});

export default api;