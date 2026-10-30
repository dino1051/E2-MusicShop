import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputFotoPerfil } from "../components/InputFotoPerfil";
import { useAuthStore } from "../store/useAuthStore";

interface PerfilForm {
  nombre: string;
}

// TODO [B]: guardar el perfil
// - llamar a perfilService.actualizar(nombre, foto)
// - con la respuesta actualizar el store (el avatar del header cambia solo)
// - mensaje de exito o de error
// - boton deshabilitado con "Guardando..." mientras se envia
export function PerfilPage() {
  const usuarioNombre = useAuthStore((s) => s.usuarioNombre);
  const usuarioAvatar = useAuthStore((s) => s.usuarioAvatar);

  const [fotoArchivo, setFotoArchivo] = useState<File | undefined>();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PerfilForm>({
    defaultValues: { nombre: usuarioNombre ?? "" },
  });

  const onSubmit = async (data: PerfilForm) => {
    console.warn("TODO [B]: guardar perfil", data, fotoArchivo);
  };

  return (
    <section className="mx-auto max-w-md rounded-3xl border border-stone-200 bg-white p-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Mi perfil</h1>

      <div className="mb-6 flex justify-center">
        <InputFotoPerfil
          fotoActual={usuarioAvatar}
          iniciales={(usuarioNombre ?? "").substring(0, 2).toUpperCase()}
          onChange={setFotoArchivo}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="block text-sm font-semibold text-slate-700">
          Nombre completo
          <input
            {...register("nombre")}
            className="mt-1 h-11 w-full rounded-xl border border-stone-300 px-4 font-normal outline-none focus:border-marca-600 focus:ring-4 focus:ring-marca-600/10"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-xl bg-marca-600 text-sm font-bold text-white hover:bg-marca-700 disabled:opacity-50"
        >
          Guardar cambios
        </button>
      </form>
    </section>
  );
}
