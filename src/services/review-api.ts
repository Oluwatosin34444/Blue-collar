import axios from "axios";

const BASE_URL = "/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Review {
  username: string;
  rating: number;
  comment: string;
}

export const reviewApi = {
  submitReview: async (artisanId: string, review: Review) => {
    const response = await api.post(
      `/artisan/ratings/add/${artisanId}`,
      review
    );
    return response.data;
  },
};
