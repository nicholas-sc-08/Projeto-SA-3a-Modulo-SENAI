import axios from 'axios';

const api = axios.create({ baseURL: 'https://455d-179-89-214-186.ngrok-free.app', headers: { "ngrok-skip-browser-warning": "true", "Content-Type": "application/json" }});

export default api;