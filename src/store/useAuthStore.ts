import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  usuarioNombre: string | null;
  usuarioRol: string | null;
  usuarioAvatar: string | null;
  autenticado: boolean;

  login: (token: string, nombre: string, rol: string) => void;
  logout: () => void;
  actualizarPerfil: (nombre: string, avatar: string | null) => void;
}

// persist guarda la sesion en localStorage
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      usuarioNombre: null,
      usuarioRol: null,
      usuarioAvatar: null,
      autenticado: false,

      login: (token, nombre, rol) =>
        set({
          token,
          usuarioNombre: nombre,
          usuarioRol: rol,
          autenticado: true,
        }),

      actualizarPerfil: (nombre, avatar) =>
        set({ usuarioNombre: nombre, usuarioAvatar: avatar }),

      logout: () =>
        set({
          token: null,
          usuarioNombre: null,
          usuarioRol: null,
          usuarioAvatar: null,
          autenticado: false,
        }),
    }),
    {
      name: "mercado-auth-storage",
    },
  ),
);
