import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  register: async (data) => {
    const response = await apiClient.post('/user/register', data);
    return response.data;
  },
  // 
  login: async (data) => {
    const response = await apiClient.post('/user/login', data);
    return response.data;
  }
};