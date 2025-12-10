import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'; 
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout'; 
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected Routes */}
        {/* Lớp 1: PersistLogin giúp lấy lại token khi F5 */}
        <Route element={<PersistLogin />}>
            {/* Lớp 2: RequireAuth chặn người chưa login */}
            <Route element={<RequireAuth />}>
                <Route path="/" element={<Dashboard />} />
                {/* Thêm các route cần bảo vệ khác vào đây */}
            </Route>
        </Route>

      </Route>
    </Routes>
  );
}

export default App;