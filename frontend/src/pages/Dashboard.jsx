import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const axiosPrivate = useAxiosPrivate(); // Dùng cái này thay vì axios thường
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    // Fetch dữ liệu user profile
    const { data, isLoading, error } = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/api/user/14'); // ID cứng hoặc lấy từ context
            return res.data;
        }
    });

    const logout = () => {
        setAuth({});
        localStorage.removeItem('refreshToken');
        navigate('/login');
    }

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">Dashboard (Protected)</h1>
            <p>Chào mừng quay lại!</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <button onClick={logout} className="bg-red-500 text-white p-2 rounded mt-4">Logout</button>
        </div>
    );
};

export default Dashboard;