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

export const servicesApi = {
  getAllServices: async () => {
    const response = await api.get("/artisan/service/all");
    return response.data;
  },

  getServiceByServiceName: async (service: string) => {
    const response = await api.get(`/artisan/service/${service}`);
    return response.data;
  },

  addService: async (service: string) => {
    const response = await api.post("/artisan/service/add", service);
    return response.data;
  },
};
