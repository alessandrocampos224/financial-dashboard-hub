// Defina aqui as interfaces para os dados da sua API
export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
}

// Atualiza a interface de resposta de autenticação para o padrão do Sanctum
export interface AuthResponse {
    token: string;  // Sanctum retorna apenas o token
    user: User;
}

export interface LoginCredentials {
    email: string;
    password: string;
    device_name?: string;  // Sanctum pode usar device_name para identificar tokens
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
} 