import { api } from "../lib/axios";

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar_url: string | null;
}

export const perfilService = {
  obtener: () => api.get<UserProfile>("/auth/me").then((r) => r.data),

  // TODO [B]: PUT /auth/perfil con FormData
  // - campos: "name" (texto) y "foto" (archivo, solo si hay)
  // - no poner el Content-Type a mano, axios lo arma solo con FormData
  // - en services/upload.ts hay un ejemplo con un solo campo
  actualizar: async (nombre: string, foto?: File): Promise<UserProfile> => {
    console.warn("TODO [B]: perfilService.actualizar", nombre, foto);
    throw new Error("perfilService.actualizar todavía no está implementado");
  },
};
