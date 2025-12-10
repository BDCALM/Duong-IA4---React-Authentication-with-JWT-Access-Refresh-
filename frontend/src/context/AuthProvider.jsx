import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    // auth sẽ chứa: { user: {...}, accessToken: "..." }
    // Khi reload trang, state này sẽ về rỗng -> Cần cơ chế PersistLogin
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;