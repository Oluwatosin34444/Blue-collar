import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  email: string;
  name: string;
  role: "User" | "Artisan";
  imageLink: string;
  rating?: number;
  booked?: boolean;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    console.log(email, password); //TODO: remove this in actual implementation, for simulation purpose only
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const isArtisan = email.includes("artisan");
      const response = isArtisan
        ? {
            message: "Login successful",
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjE3MjY4NzQxfQ.SmZg2Kx5v8dLz3eW9Z5h1H7b6w7F5k5g5k5g5k5g5k",
            username: "artisan123",
            email: "artisan@example.com",
            name: "John Doe",
            role: "Artisan" as const,
            booked: false,
            rating: 4.5,
            imageLink:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=artisan",
            success: true,
          }
        : {
            message: "Login successful",
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjE3MjY4NzQxfQ.SmZg2Kx5v8dLz3eW9Z5h1H7b6w7F5k5g5k5g5k5g5k",
            username: "user123",
            email: "user@example.com",
            name: "John Doe",
            role: "User" as const,
            imageLink: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
            success: true,
          };

      const { token, ...userData } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setToken(token);
      setUser(userData as User);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };


