import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// Instance dùng cho public routes (Login, Register)
export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

// Instance dùng cho protected routes (sẽ được gắn interceptor sau)
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false // Nếu backend bạn set cookie thì để true, còn dùng localStorage thì false
});