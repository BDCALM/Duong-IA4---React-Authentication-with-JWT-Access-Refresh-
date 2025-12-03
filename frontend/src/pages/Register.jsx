import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/authApi';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Register = () => {
  const navigate = useNavigate();
  
  // 1. Setup Form Validation
  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  // 2. Setup API Mutation (React Query)
  const mutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      alert('Đăng ký thành công! Chuyển hướng đăng nhập...');
      navigate('/login');
    },
    onError: (error) => {
      // Xử lý lỗi từ Backend trả về
      const message = error.response?.data?.message || 'Đăng ký thất bại';
      // Nếu backend trả về lỗi cụ thể cho field nào, có thể set vào đây
      setError('root', { message }); 
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Đăng Ký Tài Khoản</h2>
        
        {errors.root && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {errors.root.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            placeholder="example@email.com"
            error={errors.email}
            {...register('email', { 
              required: 'Email là bắt buộc',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email không hợp lệ"
              }
            })}
          />

          <Input
            label="Mật khẩu"
            type="password"
            placeholder="********"
            error={errors.password}
            {...register('password', { 
              required: 'Mật khẩu là bắt buộc',
              minLength: { value: 6, message: 'Mật khẩu tối thiểu 6 ký tự' }
            })}
          />

          <Button type="submit" isLoading={mutation.isPending}>
            {mutation.isPending ? 'Đang xử lý...' : 'Đăng Ký'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Đăng nhập ngay</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;