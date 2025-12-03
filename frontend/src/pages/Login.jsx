import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'; // Import cái này
import { authApi } from '../api/authApi'; // Import cái này
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
  const navigate = useNavigate();
  
  // Lấy thêm setError để hiển thị lỗi từ server
  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  // Cấu hình React Query Mutation
  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // TODO: Bạn CẦN lưu token vào localStorage ở đây, nếu không đăng nhập xong cũng như không
      // localStorage.setItem('token', data.token); 
      
      alert('Đăng nhập thành công!');
      navigate('/');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Email hoặc mật khẩu không đúng';
      setError('root', { message });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Đăng Nhập</h2>
        
        {/* Hiển thị lỗi Server */}
        {errors.root && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {errors.root.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            error={errors.email}
            {...register('email', { required: 'Vui lòng nhập email' })}
          />

          <Input
            label="Mật khẩu"
            type="password"
            error={errors.password}
            {...register('password', { required: 'Vui lòng nhập mật khẩu' })}
          />

          <Button type="submit" isLoading={mutation.isPending}>
            {mutation.isPending ? 'Đang xác thực...' : 'Đăng Nhập'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">Đăng ký mới</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;