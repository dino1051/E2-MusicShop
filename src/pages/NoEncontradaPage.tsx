import { Link } from "react-router-dom";

export function NoEncontradaPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-stone-50 p-6 text-center">
      <div>
        <p className="text-6xl font-bold text-marca-600">404</p>
        <h1 className="mt-4 text-2xl font-bold">Página no encontrada</h1>
        <Link
          to="/dashboard"
          className="mt-6 inline-block font-semibold text-marca-700 hover:underline"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
