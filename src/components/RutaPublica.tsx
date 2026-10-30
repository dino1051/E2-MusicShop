import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useAuthHidratado } from "../hooks/useAuthHidratado";

export function RutaPublica() {
  const verificandoSesion = !useAuthHidratado();
  const autenticado = useAuthStore((s) => s.autenticado);
  const token = useAuthStore((s) => s.token);

  if (verificandoSesion) {
    return <p>Verificando sesión...</p>;
  }

  if (autenticado && token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
