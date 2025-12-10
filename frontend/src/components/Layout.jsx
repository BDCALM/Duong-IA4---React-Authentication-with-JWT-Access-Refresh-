import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <main className="App">
            {/* Outlet đại diện cho tất cả các children route.
               Ví dụ: Khi vào /login, Outlet sẽ biến thành component Login.
               Khi vào /, Outlet sẽ biến thành component Dashboard.
            */}
            <Outlet />
        </main>
    );
}

export default Layout;