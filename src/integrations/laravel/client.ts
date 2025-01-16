import axios from 'axios';
import { env } from '@/config/env';

const API_URL = env.API_URL;

const laravelClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Função para obter o token CSRF
export const getCsrfToken = async () => {
    await axios.get(`${API_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
    });
};

// Interceptor para adicionar o token de autenticação
laravelClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para tratamento de erros
laravelClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            window.location.href = '/login';
        }
        if (error.response?.status === 419) {
            await getCsrfToken();
            return laravelClient(error.config);
        }
        return Promise.reject(error);
    }
);

export { laravelClient }; 