import axios from "axios";

const BASE_URL = "/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface KycData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const kycApi = {
  addArtisanKyc: async (id: string, data: KycData) => {
    const response = await api.post(`/artisan/kyc-verify/${id}`, data);
    return response.data;
  },

  addUserKyc: async (id: string, data: KycData) => {
    const response = await api.post(`/users/kyc-verify/${id}`, data);
    return response.data;
  },
};
