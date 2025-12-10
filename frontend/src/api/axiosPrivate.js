import axios from 'axios';

// Lấy URL từ biến môi trường (giống bên axiosClient)
const BASE_URL = import.meta.env.VITE_API_URL;

// Tạo instance riêng cho các request cần xác thực
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    // withCredentials: true, // BẬT dòng này nếu sau này bạn chuyển sang lưu Refresh Token trong HttpOnly Cookie
    withCredentials: false    // Hiện tại bạn dùng LocalStorage nên để false
});