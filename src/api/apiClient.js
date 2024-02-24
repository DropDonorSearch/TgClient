import axios from 'axios';
import Cookies from 'js-cookie';

let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

if (import.meta.env.DEV) {
    Object.assign(headers, {"ngrok-skip-browser-warning": 1});
}

const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers
});

apiClient.interceptors.request.use(function (config) {
    const token = Cookies.get('token');

    if (token) {
        config.headers['Authorization'] = `Basic ${token}`;
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

export default apiClient;
