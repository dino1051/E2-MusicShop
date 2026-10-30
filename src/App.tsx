import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { RutaProtegida } from "./components/RutaProtegida";
import { RutaPublica } from "./components/RutaPublica";
import { CargarProductosPage } from "./pages/CargarProductosPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LaboratorioPage } from "./pages/LaboratorioPage";
import { LoginPage } from "./pages/LoginPage";
import { NoEncontradaPage } from "./pages/NoEncontradaPage";
import { PerfilPage } from "./pages/PerfilPage";
import { ProductosPage } from "./pages/ProductosPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<RutaPublica />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<RutaProtegida />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/laboratorio" element={<LaboratorioPage />} />
          <Route path="/admin/productos" element={<CargarProductosPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NoEncontradaPage />} />
    </Routes>
  );
}

export default App;
