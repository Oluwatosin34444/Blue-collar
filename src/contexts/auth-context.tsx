import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  authApi,
  type ArtisanSignUpData,
  type ArtisanSignUpResponse,
  type UserSignUpData,
  type UserSignUpResponse,
} from "../services/auth-api";
import { toast } from "sonner";
import { AxiosError } from "axios";

type BaseUser = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  location: string;
  active: boolean;
  id: string;
};

export type RegularUser = BaseUser & {
  role: "User";
  userImage: string;
  password?: string;
};

export type Artisan = BaseUser & {
  role: "Artisan";
  service: string;
  artisanImage: string;
  booked: boolean;
};

type User = RegularUser | Artisan;

export interface AuthContextType {
  role: "User" | "Artisan";
  user: User | null;
  token: string | null;
  isLoading: boolean;
  logout: () => void;
  artisanSignUp: (data: ArtisanSignUpData) => Promise<ArtisanSignUpResponse>;
  userSignUp: (data: UserSignUpData) => Promise<UserSignUpResponse>;
  userLogin: (email: string, password: string) => Promise<void>;
  artisanLogin: (email: string, password: string) => Promise<void>;
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

  const artisanLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.artisanLogin(email, password);
      console.log("artisan login response", response);
      const { token, ...userData } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setToken(token);
      setUser({ ...userData, role: "Artisan" });

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const artisanSignUp = async (data: ArtisanSignUpData) => {
    setIsLoading(true);
    try {
      const response = await authApi.artisanSignUp(data);
      toast.success(response.message);
      navigate("/login");
      return response;
    } catch (error) {
      console.error("Artisan signup failed:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const userSignUp = async (data: UserSignUpData) => {
    setIsLoading(true);
    try {
      const response = await authApi.userSignUp(data);
      toast.success(response.message);
      navigate("/login");
      return response;
    } catch (error) {
      console.error("User signup failed:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const userLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.userLogin(email, password);
      console.log("user login response", response);
      const { token, ...userData } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setToken(token);
      setUser({ ...userData, role: "User" });

      navigate("/dashboard");
    } catch (error) {
      console.error("User login failed:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (user?.role === "Artisan") {
        await authApi.artisanLogout();
      } else {
        await authApi.userLogout();
      }
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        role: user?.role as "User" | "Artisan",
        user,
        token,
        isLoading,
        logout,
        artisanSignUp,
        artisanLogin,
        userLogin,
        userSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
