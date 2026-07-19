import axios from "axios";
import { ApiResponse } from "@/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    const data = response.data as ApiResponse<unknown>;
    if (data.success === false) {
      return Promise.reject(new Error(data.message || "Request failed"));
    }
    return response;
  },
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Terjadi kesalahan";
    return Promise.reject(new Error(message));
  }
);

export default api;
