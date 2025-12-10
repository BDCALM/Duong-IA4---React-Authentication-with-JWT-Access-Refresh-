import { axiosPrivate } from "../api/axiosPrivate";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        // 1. Request Interceptor: Gắn Access Token vào Header
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        // 2. Response Interceptor: Xử lý khi Token hết hạn (401)
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                // Nếu lỗi 401 và chưa từng retry (prevRequest.sent là cờ tự đánh dấu)
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true; // Đánh dấu đã retry
                    try {
                        const newAccessToken = await refresh(); // Gọi hàm refresh
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axiosPrivate(prevRequest); // Gọi lại request cũ
                    } catch (refreshError) {
                         return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        // Cleanup interceptor khi unmount
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);

    return axiosPrivate; // Trả về instance đã được "độ"
}

export default useAxiosPrivate;