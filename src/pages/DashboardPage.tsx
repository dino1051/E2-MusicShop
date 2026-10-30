import { useEffect } from "react";
import { Link } from "react-router-dom";
import { perfilService } from "../services/perfil";
import { useAuthStore } from "../store/useAuthStore";

// al entrar pedimos /auth/me, si el token no sirve la API responde 401

const tarjetas = [
  {
    to: "/productos",
    titulo: "Catálogo paginado",
    texto: "Productos con paginación y filtro en la URL.",
    persona: "C",
  },
  {
    to: "/perfil",
    titulo: "Mi perfil",
    texto: "Cambia tu nombre y tu foto con FormData.",
    persona: "B",
  },
  {
    to: "/laboratorio",
    titulo: "Laboratorio UI",
    texto: "Skeletons, alertas, estado vacío y Error Boundary.",
    persona: "D",
  },
];

export function DashboardPage() {
  const usuarioNombre = useAuthStore((s) => s.usuarioNombre);
  const actualizarPerfil = useAuthStore((s) => s.actualizarPerfil);

  useEffect(() => {
    perfilService
      .obtener()
      .then((perfil) => actualizarPerfil(perfil.name, perfil.avatar_url))
      .catch(() => {});
  }, [actualizarPerfil]);

  return (
    <section>
      <p className="mb-2 text-sm font-semibold text-marca-700">Tu cuenta</p>
      <h1 className="text-3xl font-bold tracking-tight">
        Hola, {usuarioNombre ?? "Desconocido"}
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Si estás viendo esta página es porque tienes un token válido... ¿o no?
        (eso lo resuelve la persona A)
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {tarjetas.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="rounded-2xl border border-stone-200 bg-white p-6 transition hover:border-marca-600"
          >
            <span className="text-xs font-bold text-marca-700">
              Persona {t.persona}
            </span>
            <h2 className="mt-3 text-lg font-bold">{t.titulo}</h2>
            <p className="mt-1 text-sm text-slate-500">{t.texto}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
