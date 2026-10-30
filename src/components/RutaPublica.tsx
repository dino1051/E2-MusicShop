import { Outlet } from "react-router-dom";

// TODO [A]: si ya hay sesion y entra a /login, mandarlo a /dashboard
export function RutaPublica() {
  return <Outlet />;
}
