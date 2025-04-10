import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5500/api/v1',
    withCredentials: true
});