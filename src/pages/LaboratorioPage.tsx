import { useState, type ReactNode } from "react";
import { AlertaBanner } from "../components/ui/AlertaBanner";
import { EstadoVacio } from "../components/ui/EstadoVacio";
import { Skeleton } from "../components/ui/Skeleton";
import { SkeletonCardProducto } from "../components/ui/SkeletonCardProducto";

// pagina para ver los componentes de ui mientras se van haciendo

function ComponenteBomba(): ReactNode {
  throw new Error("¡Boom! Este componente explotó a propósito 💥");
}

export function LaboratorioPage() {
  const [romper, setRomper] = useState(false);

  return (
    <section className="space-y-10">
      <div>
        <p className="mb-2 text-sm font-semibold text-marca-700">
          Persona D
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Laboratorio UI</h1>
      </div>

      <div>
        <h2 className="mb-3 font-bold">Skeleton</h2>
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-bold">SkeletonCardProducto</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SkeletonCardProducto />
          <SkeletonCardProducto />
          <SkeletonCardProducto />
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-bold">AlertaBanner</h2>
        <div className="space-y-3">
          <AlertaBanner tipo="info" titulo="Info" mensaje="Esto es informativo." />
          <AlertaBanner tipo="exito" titulo="Listo" mensaje="Se guardó con éxito." />
          <AlertaBanner
            tipo="advertencia"
            titulo="Ojo"
            mensaje="El servidor está lento."
            onCerrar={() => alert("cerrar")}
          />
          <AlertaBanner
            tipo="error"
            titulo="Error"
            mensaje="No pudimos cargar los datos."
            onReintentar={() => alert("reintentar")}
          />
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-bold">EstadoVacio</h2>
        <div className="rounded-2xl border border-stone-200 bg-white">
          <EstadoVacio
            titulo="No encontramos productos"
            descripcion="Prueba con otra categoría"
            accion={{ label: "Limpiar filtros", onClick: () => alert("limpiar") }}
          />
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-bold">Error Boundary</h2>
        <p className="mb-3 text-sm text-slate-500">
          Sin ErrorBoundary este botón deja la pantalla en blanco.
        </p>
        <button
          type="button"
          onClick={() => setRomper(true)}
          className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-bold text-white hover:bg-rose-700"
        >
          Romper componente
        </button>
        {romper && <ComponenteBomba />}
      </div>
    </section>
  );
}
