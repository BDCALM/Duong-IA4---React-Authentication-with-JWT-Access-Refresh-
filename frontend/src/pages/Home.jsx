import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-600">
        Welcome to User Registration & Login System
      </h1>
      <p className="text-xl text-gray-300 mb-8 max-w-lg">
        Nền tảng đăng ký và đăng nhập trực tuyến hiện đại. Hệ thống đang được phát triển bởi Nguyễn Văn Bình Dương - 23120242
      </p>
      <div className="flex gap-4">
        <Link to="/login" className="px-6 py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition">
          Đăng Nhập
        </Link>
        <Link to="/register" className="px-6 py-3 border border-gray-500 rounded-lg font-bold hover:bg-gray-800 transition">
          Đăng Ký
        </Link>
      </div>
    </div>
  );
};

export default Home;