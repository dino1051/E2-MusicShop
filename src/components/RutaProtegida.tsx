import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useAuthHidratado } from "../hooks/useAuthHidratado";

interface RutaProtegidaProps {
  rolesPermitidos?: string[];
}

export function RutaProtegida({ rolesPermitidos }: RutaProtegidaProps) {
  const verificandoSesion = !useAuthHidratado();
  const autenticado = useAuthStore((s) => s.autenticado);
  const usuarioRol = useAuthStore((s) => s.usuarioRol);
  const token = useAuthStore((s) => s.token);

  if (verificandoSesion) {
    return <p>Verificando sesión...</p>;
  }

  if (!autenticado || !token) {
    return <Navigate to="/login" replace />;
  }

  if (
    rolesPermitidos &&
    !rolesPermitidos.includes((usuarioRol ?? "").toLowerCase())
  ) {
    return <Navigate to="/sin-acceso" replace />;
  }

  return <Outlet />;
}
