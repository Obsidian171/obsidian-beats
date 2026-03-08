import { useState, createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  login: () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Mock auth - replace with Firebase Authentication
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (email: string, password: string) => {
    // Mock credentials - replace with Firebase Auth
    if (email === "admin@obsidian.com" && password === "admin123") {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
