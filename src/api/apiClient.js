import axios from 'axios';

let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

if (import.meta.env.DEV) {
    Object.assign(headers, {"ngrok-skip-browser-warning": 1});
}

const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: false,
    headers
});

export default apiClient;
