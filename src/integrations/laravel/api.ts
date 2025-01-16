import { laravelClient, getCsrfToken } from './client';
import type { ApiResponse, AuthResponse, LoginCredentials, User } from './types';

export const api = {
    auth: {
        login: async (credentials: LoginCredentials) => {
            // Obtém o token CSRF antes do login
            await getCsrfToken();
            
            const response = await laravelClient.post<AuthResponse>('/login', {
                ...credentials,
                device_name: window.navigator.userAgent // Opcional: identifica o dispositivo
            });
            
            // Salva o token no localStorage
            if (response.data.token) {
                localStorage.setItem('access_token', response.data.token);
            }
            
            return response.data;
        },
        
        logout: async () => {
            try {
                await laravelClient.post('/logout');
            } finally {
                localStorage.removeItem('access_token');
            }
        },
        
        register: async (userData: {
            name: string;
            email: string;
            password: string;
            password_confirmation: string;
        }) => {
            await getCsrfToken();
            const response = await laravelClient.post<AuthResponse>('/register', userData);
            
            if (response.data.token) {
                localStorage.setItem('access_token', response.data.token);
            }
            
            return response.data;
        }
    },
    
    users: {
        getProfile: async () => {
            const response = await laravelClient.get<ApiResponse<User>>('/user');
            return response.data;
        },
        
        updateProfile: async (userData: Partial<User>) => {
            await getCsrfToken();
            const response = await laravelClient.put<ApiResponse<User>>('/user', userData);
            return response.data;
        }
    }
}; 