import axios from '../api/axiosClient';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        
        // Nếu không có refresh token thì thôi, không gọi
        if (!refreshToken) return null;

        try {
            const response = await axios.post('/api/user/refresh-token', {
                refreshToken: refreshToken
            });

            // Giả sử server trả về: { accessToken: "..." }
            const newAccessToken = response.data.accessToken;

            // Cập nhật lại Memory
            setAuth(prev => {
                return { 
                    ...prev, 
                    accessToken: newAccessToken 
                };
            });
            
            return newAccessToken;
        } catch (error) {
            // Nếu refresh token hết hạn hoặc lỗi -> Xóa luôn để logout
            localStorage.removeItem('refreshToken');
            setAuth({}); 
            throw error;
        }
    };
    return refresh;
};

export default useRefreshToken;