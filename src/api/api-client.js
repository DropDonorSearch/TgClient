import axios from 'axios';

let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers
});

export default apiClient;
