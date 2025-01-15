import { api } from '../config/api';

export const tenantService = {
  async getAll() {
    const response = await api.get('/tenants');
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get(`/tenants/${id}`);
    return response.data;
  },

  async create(data: any) {
    const response = await api.post('/tenants', data);
    return response.data;
  },

  async update(id: string, data: any) {
    const response = await api.put(`/tenants/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/tenants/${id}`);
    return response.data;
  }
};