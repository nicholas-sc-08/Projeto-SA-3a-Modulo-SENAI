import axios from 'axios';

const api = axios.create({ baseURL: 'https://b16d-2804-7f5-b0c2-1188-9822-e3ff-3af5-b36f.ngrok-free.app', headers: { "ngrok-skip-browser-warning": "true", "Content-Type": "application/json" }});

export default api;