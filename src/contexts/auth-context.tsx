import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services/auth-api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type { PasswordFormData, ProfileFormData } from "@/lib/schemas/auth";
import type {
  ArtisanProfileResponse,
  ArtisanSignUpData,
  ArtisanSignUpResponse,
  UserProfileResponse,
  UserSignUpData,
  UserSignUpResponse,
  PasswordUpdateResponse,
  Review,
} from "@/lib/types";

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
};

export type Artisan = BaseUser & {
  role: "Artisan";
  service: string;
  artisanImage: string;
  booked: boolean;
  reviews: Review[];
  rating: number;
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
  userLogin: (email: string, password: string) => Promise<UserProfileResponse>;
  artisanLogin: (
    email: string,
    password: string
  ) => Promise<ArtisanProfileResponse>;
  updateUserProfile: (data: ProfileFormData) => Promise<void>;
  updateArtisanProfile: (data: ProfileFormData) => Promise<void>;
  updateUserPassword: (
    data: PasswordFormData
  ) => Promise<PasswordUpdateResponse>;
  updateArtisanPassword: (
    data: PasswordFormData
  ) => Promise<PasswordUpdateResponse>;
  refreshUserData: () => Promise<void>;
  getUserProfile: () => Promise<UserProfileResponse | null>;
  getArtisanProfile: (id: string) => Promise<ArtisanProfileResponse | null>;
  validateUserData: () => boolean;
  clearAuthData: () => void;
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
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);

        // Validate stored data on app load
        if (!validateStoredUserData(parsedUser)) {
          clearAuthData();
        }
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        clearAuthData();
      }
    }
    setIsLoading(false);
  }, []);

  const validateStoredUserData = (userData: unknown): userData is User => {
    if (!userData || typeof userData !== "object" || userData === null) {
      return false;
    }

    const userObj = userData as Record<string, unknown>;

    const requiredFields = ["id", "email", "firstName", "lastName", "role"];
    const hasRequiredFields = requiredFields.every(
      (field) => typeof userObj[field] === "string" && userObj[field]
    );

    const isValidRole = userObj.role === "User" || userObj.role === "Artisan";

    // Additional role-specific validation
    if (userObj.role === "User") {
      return (
        hasRequiredFields &&
        isValidRole &&
        typeof userObj.userImage === "string" &&
        typeof userObj.username === "string"
      );
    } else if (userObj.role === "Artisan") {
      return (
        hasRequiredFields &&
        isValidRole &&
        typeof userObj.service === "string" &&
        typeof userObj.artisanImage === "string" &&
        typeof userObj.username === "string" &&
        typeof userObj.booked === "boolean"
      );
    }

    return false;
  };

  const updateLocalUserData = (userData: User) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Failed to store user data:", error);
      toast.error("Failed to save user data locally");
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const validateUserData = (): boolean => {
    if (!user || !token) {
      return false;
    }

    return validateStoredUserData(user);
  };

  const artisanLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.artisanLogin(email, password);
      console.log("artisan login response", response);
      const { token, ...userData } = response;

      localStorage.setItem("token", token);
      const userWithRole = {
        ...userData,
        role: "Artisan",
      } as unknown as Artisan;
      updateLocalUserData(userWithRole);
      setToken(token);

      navigate("/dashboard");
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Login failed");
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
      navigate(`/login?role=Artisan`);
      return response;
    } catch (error) {
      console.error("Artisan signup failed:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Signup failed");
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
      navigate(`/login?role=User`);
      return response;
    } catch (error) {
      console.error("User signup failed:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Signup failed");
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
      const userWithRole = { ...userData, role: "User" } as RegularUser;
      updateLocalUserData(userWithRole);
      setToken(token);

      navigate("/");
      return response;
    } catch (error) {
      console.error("User login failed:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Login failed");
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
      clearAuthData();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Logout failed");
      } else {
        toast.error("An error occurred");
      }
      clearAuthData();
      navigate("/");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUserData = async () => {
    if (!user || !token) {
      console.warn("Cannot refresh user data: user or token is missing");
      return;
    }

    try {
      if (user.role === "User") {
        const response = await authApi.getUserProfile();
        const user = response.user;
        const updatedUser = {
          ...user,
          role: "User",
          id: user._id,
        } as RegularUser;
        updateLocalUserData(updatedUser);
        toast.success("Profile data refreshed successfully");
      } else {
        const response = await authApi.getArtisanProfile(user.id);
        console.log("artisan profile response", response);
        const artisan = response.artisan;
        const updatedUser = {
          ...artisan,
          role: "Artisan",
          id: artisan._id,
        } as Artisan;
        updateLocalUserData(updatedUser);
        toast.success("Profile data refreshed successfully");
      }
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message || "Failed to refresh profile data";
        toast.error(errorMessage);

        if (error.response?.status === 401) {
          clearAuthData();
          navigate("/login");
        }
      } else {
        toast.error("An error occurred while refreshing data");
      }
    }
  };

  const updateUserProfile = async (data: ProfileFormData) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName?.trim() || "");
      formData.append("lastName", data.lastName?.trim() || "");
      formData.append("username", data.username?.trim() || "");
      formData.append("email", data.email?.trim() || "");
      formData.append("phone", data.phone?.trim() || "");
      formData.append("location", data.location?.trim() || "");
      formData.append("active", data.active.toString());

      if (data.userImage instanceof File) {
        formData.append("userImage", data.userImage);
      }

      const response = await authApi.updateUserProfile(formData);
      toast.success(response.message || "Profile updated successfully");

      await refreshUserData();
    } catch (error) {
      console.error("Update profile failed:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Profile update failed");
      } else {
        toast.error("An error occurred");
      }
      throw error;
    }
  };

  const updateArtisanProfile = async (data: ProfileFormData) => {
    if (!user?.id) {
      toast.error("User ID not found");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName?.trim() || "");
      formData.append("lastName", data.lastName?.trim() || "");
      formData.append("username", data.username?.trim() || "");
      formData.append("email", data.email?.trim() || "");
      formData.append("phone", data.phone?.trim() || "");
      formData.append("location", data.location?.trim() || "");
      formData.append("service", data.service?.trim() || "");
      formData.append("active", data.active.toString());

      if (data.artisanImage instanceof File) {
        formData.append("artisanImage", data.artisanImage);
      }

      const response = await authApi.updateArtisanProfile(user.id, formData);
      toast.success(response.message || "Profile updated successfully");
      await refreshUserData();
    } catch (error) {
      console.error("Update profile failed:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Profile update failed");
      } else {
        toast.error("An error occurred");
      }
      throw error;
    }
  };

  const updateUserPassword = async (data: PasswordFormData) => {
    const updatePasswordData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    try {
      const response = await authApi.updateUserPassword(updatePasswordData);
      console.log("update user password response", response);
      toast.success(response.message || "Password updated successfully");
      return response;
    } catch (error) {
      console.error("Update password failed:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Password update failed");
      } else {
        toast.error("An error occurred");
      }
      throw error;
    }
  };

  const updateArtisanPassword = async (data: PasswordFormData) => {
    const updatePasswordData = {
      username: data.username,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    try {
      const response = await authApi.updateArtisanPassword(updatePasswordData);
      console.log("update artisan password response", response);
      toast.success(response.message || "Password updated successfully");
      return response;
    } catch (error) {
      console.error("Update password failed:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Password update failed");
      } else {
        toast.error("An error occurred");
      }
      throw error;
    }
  };

  const getUserProfile = async (): Promise<UserProfileResponse | null> => {
    setIsLoading(true);
    try {
      const response = await authApi.getUserProfile();
      return response;
    } catch (error) {
      console.error("Get user profile failed:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message || "Failed to get user profile";
        toast.error(errorMessage);

        // If token is invalid, clear auth data
        if (error.response?.status === 401) {
          clearAuthData();
          navigate("/login");
        }
      } else {
        toast.error("An error occurred while fetching profile");
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getArtisanProfile = async (
    id: string
  ): Promise<ArtisanProfileResponse | null> => {
    if (!id?.trim()) {
      toast.error("Artisan ID is required");
      return null;
    }

    setIsLoading(true);
    try {
      const response = await authApi.getArtisanProfile(id);
      return response;
    } catch (error) {
      console.error("Get artisan profile failed:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message || "Failed to get artisan profile";
        toast.error(errorMessage);

        // If token is invalid, clear auth data
        if (error.response?.status === 401) {
          clearAuthData();
          navigate("/login");
        }
      } else {
        toast.error("An error occurred while fetching profile");
      }
      return null;
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
        updateUserProfile,
        updateArtisanProfile,
        updateUserPassword,
        updateArtisanPassword,
        refreshUserData,
        getUserProfile,
        getArtisanProfile,
        validateUserData,
        clearAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
