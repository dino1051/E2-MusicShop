import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

export const api = axios.create({
  baseURL: "https://api-funval-g6.onrender.com",
});

// antes de cada peticion le pegamos el token en el header
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// TODO [A]: interceptor de respuesta
// - si la API responde 401 el token ya no sirve: hacer logout()
//   y mandar al usuario a /login?sesion=expirada (aqui no hay useNavigate)
// - el login tambien responde 401 cuando la contraseña esta mal,
//   en ese caso no hay que redirigir (revisar error.config?.url)
// - siempre terminar con return Promise.reject(error)
// para probarlo: cambiar el token en localStorage y recargar /dashboard
