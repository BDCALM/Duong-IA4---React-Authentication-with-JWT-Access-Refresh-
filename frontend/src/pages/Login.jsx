import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import useAuth from '../hooks/useAuth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      // API trả về: { success: true, data: { accessToken, refreshToken, ...user } }
      // Lưu ý: Cấu trúc response phải khớp với User Controller bạn đã sửa
      const { accessToken, refreshToken, ...user } = response.data;
      
      // 1. Lưu Access Token vào Memory (Context)
      setAuth({ user, accessToken });

      // 2. Lưu Refresh Token vào LocalStorage (Persistent)
      localStorage.setItem('refreshToken', refreshToken);

      navigate(from, { replace: true });
    },
    onError: (error) => {
        const message = error.response?.data?.message || 'Login failed';
        setError('root', { message });
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">Đăng Nhập</h2>
             {errors.root && <div className="text-red-500 mb-2">{errors.root.message}</div>}
            <form onSubmit={handleSubmit(onSubmit)}>
              
                 <Input {...register("email", {required: true})} placeholder="Email" />
                 <Input type="password" {...register("password", {required: true})} placeholder="Password" />
                 
                 <Button type="submit" isLoading={mutation.isPending}>Đăng nhập</Button>
            </form>
             <p className="mt-4 text-center">
                Chưa có tài khoản? <Link to="/register" className="text-blue-600">Đăng ký</Link>
             </p>
        </div>
    </div>
  );
};

export default Login;