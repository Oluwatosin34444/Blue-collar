import axios from "axios";

const BASE_URL = "/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Define endpoints that don't need authentication
const PUBLIC_ENDPOINTS = [
  "/artisan-auth/signup",
  "/artisan-auth/login",
  "/auth/signup",
  "/auth/login",
];

// Add request interceptor to add auth token (excluding public endpoints)
api.interceptors.request.use((config) => {
  // Check if the current request is to a public endpoint
  const isPublicEndpoint = PUBLIC_ENDPOINTS.some((endpoint) =>
    config.url?.includes(endpoint)
  );

  // Only add auth token if it's not a public endpoint
  if (!isPublicEndpoint) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export interface ArtisanSignUpData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  artisanImage?: File | null;
  password: string;
}

export interface UserSignUpData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  userImage?: File | null;
}

export interface ArtisanSignUpResponse {
  message: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  service: string;
  location: string;
  artisanImage: string;
  booked: boolean;
  id: string;
  success: boolean;
}

export interface UserSignUpResponse {
  message: string;
  username: string;
  email: string;
  role: string;
  phone: string;
  location: string;
  id: string;
  name: string;
  userImage: string;
  success: boolean;
}

export const authApi = {
  artisanSignUp: async (
    data: ArtisanSignUpData
  ): Promise<ArtisanSignUpResponse> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await api.post<ArtisanSignUpResponse>(
      "/artisan-auth/signup",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("artisan signup response", response.data);
    return response.data;
  },

  artisanLogin: async (email: string, password: string) => {
    const response = await api.post("/artisan-auth/login", {
      email,
      password,
    });
    return response.data;
  },

  userSignUp: async (data: UserSignUpData): Promise<UserSignUpResponse> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const response = await api.post<UserSignUpResponse>(
      "/auth/signup",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("user signup response", response.data);
    return response.data;
  },

  userLogin: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  artisanLogout: async () => {
    const response = await api.get("/artisan-auth/logout");
    return response.data;
  },

  userLogout: async () => {
    const response = await api.get("/auth/logout");
    return response.data;
  },

  getUserProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  updateUserProfile: async (data: UserSignUpData) => {
    const response = await api.put("/users/update-profile", data);
    return response.data;
  },

  updateUserPassword: async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    const response = await api.put("/users/update-password", data);
    return response.data;
  },

  getAllArtisans: async (page: number) => {
    const response = await api.get(`/artisan?page=${page}`);
    return response.data;
  },

  getArtisanProfile: async (id: string) => {
    const response = await api.get(`/artisan/${id}`);
    return response.data;
  },

  getArtisanBookedStatus: async (status: boolean) => {
    const response = await api.get(`/artisan/booked/${status}`);
    return response.data;
  },

  updateArtisanProfile: async (id: string, data: ArtisanSignUpData) => {
    const response = await api.patch(`/artisan/update/${id}`, data);
    return response.data;
  },

  deleteArtisan: async (id: string) => {
    const response = await api.delete(`/artisan/delete/${id}`);
    return response.data;
  },

  updateArtisanPassword: async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    const response = await api.put("/artisans/update-password", data);
    return response.data;
  },
};

export default api;
