// src/context/AuthContext.tsx
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { type AuthContextType, type User } from "@/types";
import { api } from "@/api/simulation/v2";
// import { mapApiUserToAppUser } from "@/function/Authentication/user-mapper";
import { setCookie, getCookie, eraseCookie } from "@/function/cookies";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const tokenFromCookie = getCookie("authToken");
      const userFromCookie = getCookie("user");

      if (tokenFromCookie && userFromCookie) {
        setToken(tokenFromCookie);
        setUser(JSON.parse(userFromCookie));
      }
    } catch (error) {
      console.error("Failed to load auth state from cookie:", error);
      setUser(null);
      setToken(null);
      eraseCookie("authToken");
      eraseCookie("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    setToken(token);
    setCookie("authToken", token, 7);
    setCookie("user", JSON.stringify(userData), 7);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    eraseCookie("authToken");
    eraseCookie("user");
    api.auth.logout();
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
