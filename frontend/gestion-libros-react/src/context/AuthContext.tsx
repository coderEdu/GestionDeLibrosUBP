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

  const login = (user: string, password: string) => {
    // Simulate login logic
    if (user === "educoder78@gmail.com" && password === "12345") {
      setUserLoggedIn(true);
    }
  };

  const logout = () => {
    setUserLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ userLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;