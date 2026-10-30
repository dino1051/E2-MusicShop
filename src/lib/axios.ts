import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

export const api = axios.create({
  baseURL: "https://api-funval-g6.onrender.com",
});

// Antes de cada petición agregamos el token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Revisamos las respuestas de la API
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url ?? "";
    const token = useAuthStore.getState().token;

    if (
      error.response?.status === 401 &&
      token &&
      !url.includes("/auth/login")
    ) {
      useAuthStore.getState().logout();
      window.location.href = "/login?sesion=expirada";
    }

    return Promise.reject(error);
  },
);
