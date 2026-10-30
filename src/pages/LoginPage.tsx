import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { authService } from "../services/auth";
import { useAuthStore } from "../store/useAuthStore";
import { tema } from "../tema";

const ANIO = new Date().getFullYear();

function StoreMark() {
  return (
    <span className="grid size-11 place-items-center rounded-xl bg-amber-500 text-xl font-bold text-black shadow-lg shadow-amber-500/20">
      {tema.inicial}
    </span>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sesionExpirada = searchParams.get("sesion") === "expirada";
  const loginStore = useAuthStore((s) => s.login);
  const [errorServidor, setErrorServidor] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setErrorServidor("");
      const respuesta = await authService.login(data);

      loginStore(
        respuesta.access_token,
        respuesta.user_name,
        respuesta.user_role,
      );

      navigate("/dashboard", { replace: true });
    } catch {
      setErrorServidor(
        "Credenciales incorrectas o error al conectar con el servidor.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#090909] p-4 text-white sm:p-6 lg:p-8">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-[#111111] shadow-2xl lg:grid-cols-2">
        {/* Panel izquierdo */}
        <div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden bg-[#171717] p-8 sm:p-12 lg:min-h-full lg:p-14">
          <img
            src="/imagenes/login-instrumentos.jpg"
            alt="Instrumentos musicales"
            className="absolute inset-0 size-full object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />

          <div className="relative z-10 flex items-center gap-3">
            <StoreMark />
            <span className="text-2xl font-bold tracking-wide">
              {tema.nombre}
            </span>
          </div>

          <div className="relative z-10 mt-12 max-w-lg">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-amber-400">
              {tema.login.kicker}
            </p>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl xl:text-6xl">
              {tema.login.titulo}
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-neutral-300">
              {tema.login.texto}
            </p>
          </div>

          <p className="relative z-10 mt-12 text-sm text-neutral-400">
            © {ANIO} {tema.nombre}. Todos los derechos reservados.
          </p>
        </div>

        {/* Panel derecho: formulario */}
        <div className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <StoreMark />
              <span className="text-2xl font-bold">{tema.nombre}</span>
            </div>

            <div className="mb-9">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-amber-400">
                Bienvenido de vuelta
              </p>

              <h2 className="text-4xl font-bold tracking-tight text-white">
                Inicia sesión
              </h2>

              <p className="mt-3 text-sm leading-6 text-neutral-400">
                Ingresa a tu cuenta para continuar.
              </p>
            </div>

            {sesionExpirada && (
              <div className="mb-5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-300">
                Tu sesión ha expirado. Inicia sesión nuevamente.
              </div>
            )}

            {errorServidor && (
              <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                {errorServidor}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <label className="block text-sm font-semibold text-neutral-200">
                Correo electrónico
                <input
                  {...register("email")}
                  type="email"
                  placeholder="tu@email.com"
                  className="mt-3 h-14 w-full rounded-xl border border-white/10 bg-[#1c1c1c] px-4 text-white outline-none transition placeholder:text-neutral-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
                {errors.email && (
                  <span className="mt-2 block text-xs font-medium text-red-400">
                    {errors.email.message}
                  </span>
                )}
              </label>

              <label className="block text-sm font-semibold text-neutral-200">
                Contraseña
                <div className="relative mt-3">
                  <input
                    {...register("password")}
                    type={mostrarPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    className="h-14 w-full rounded-xl border border-white/10 bg-[#1c1c1c] px-4 pr-24 text-white outline-none transition placeholder:text-neutral-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />

                  <button
                    type="button"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-amber-400 hover:text-amber-300"
                  >
                    {mostrarPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                {errors.password && (
                  <span className="mt-2 block text-xs font-medium text-red-400">
                    {errors.password.message}
                  </span>
                )}
              </label>

              <button
                className="h-14 w-full rounded-xl bg-amber-500 text-sm font-bold text-black shadow-lg shadow-amber-500/10 transition hover:bg-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-neutral-500">
              Acceso seguro a {tema.nombre}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
