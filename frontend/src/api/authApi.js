import axiosClient from './axiosClient';

export const authApi = {
    login: async (data) => {
        const response = await axiosClient.post('/api/user/login', data);
        return response.data;
    },
    register: async (data) => {
        const response = await axiosClient.post('/api/user/register', data);
        return response.data;
    }
};