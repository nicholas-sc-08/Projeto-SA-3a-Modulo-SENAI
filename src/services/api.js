import axios from 'axios';

const api = axios.create({ baseURL: '://4cd9-189-8-202-5.ngrok-free.apphttps', headers: { "ngrok-skip-browser-warning": "true", "Content-Type": "application/json" }});

export default api;