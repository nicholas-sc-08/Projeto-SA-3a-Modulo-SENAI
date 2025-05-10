import axios from 'axios';

const api = axios.create({ baseURL: 'https://36d0-179-93-239-81.ngrok-free.app', headers: { "ngrok-skip-browser-warning": "true", "Content-Type": "application/json" }});

export default api;