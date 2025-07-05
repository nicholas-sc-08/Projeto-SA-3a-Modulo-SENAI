import axios from 'axios';

const api = axios.create({ baseURL: 'https://2909-179-167-31-111.ngrok-free.app', headers: { "ngrok-skip-browser-warning": "true", "Content-Type": "application/json" }});

export default api;