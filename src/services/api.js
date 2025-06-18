import axios from 'axios';

const api = axios.create({ baseURL: 'https://f8fb-179-89-209-133.ngrok-free.app', headers: { "ngrok-skip-browser-warning": "true", "Content-Type": "application/json" }});

export default api;