import { api } from '../config/api';

export const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async logout() {
    try {
      await api.post('/logout');
    } finally {
      localStorage.removeItem('token');
    }
  },

  async getUser() {
    const response = await api.get('/user');
    return response.data;
  }
};