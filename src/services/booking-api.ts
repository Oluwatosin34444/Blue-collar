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

export interface BookingOrder {
  booked_by: string;
  artisanId: string;
  service_type: string;
}

export const bookingApi = {
  getBookingOrders: async (page: number) => {
    const response = await api.get(`/booking-orders?page=${page}`);
    console.log(response.data);
    return response.data;
  },

  getBookingOrderById: async (id: string) => {
    const response = await api.get(`/booking-orders/${id}`);
    return response.data;
  },

  createBookingOrder: async (data: BookingOrder) => {
    const response = await api.post("/booking-orders/create", data);
    return response.data;
  },

  closeBookingOrder: async (id: string) => {
    const response = await api.patch(`/booking-orders/close/${id}`);
    return response.data;
  },

  deleteBookingOrder: async (id: string) => {
    const response = await api.delete(`/booking-orders/delete/${id}`);
    return response.data;
  },
};
