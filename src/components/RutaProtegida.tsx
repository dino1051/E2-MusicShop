import { Outlet } from "react-router-dom";

// TODO [A]: ahora deja pasar a cualquiera
// - esperar a que el store se rehidrate (useAuthHidratado)
// - sin sesion: <Navigate to="/login" replace />
// - con sesion: <Outlet />
export function RutaProtegida() {
  return <Outlet />;
}
