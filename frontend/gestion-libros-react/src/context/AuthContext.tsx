import { createContext, useState } from 'react';

interface AuthContext {
    userLoggedIn: boolean;
    login: (user: string, password: string) => void;
    logout: () => void;
} 

// Context for authentication state
const defaultValues: AuthContext = { 
    userLoggedIn: false,
    login: () => {},
    logout: () => {},
};

export const AuthContext = createContext<AuthContext>(defaultValues);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

    if (localStorage.getItem('isLoggedIn') === 'true') {
        if (!userLoggedIn) {
            setUserLoggedIn(true);
        }
    }

    const login = (user: string, password: string) => {
        // Simulate login logic
        if (user === "gtpanteraxtr@gmail.com" && password === "12345") {
            setUserLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', user);
        }
    };

    const logout = () => {
        setUserLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');    
    };

    return (
        <AuthContext.Provider value={{ userLoggedIn, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;