import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { extraerMensaje } from "../lib/errorHandler";
import {
  productoSchema,
  type ProductoFormData,
} from "../schemas/productoSchema";
import { productosService } from "../services/productos";
import { uploadService } from "../services/upload";
import { useAuthStore } from "../store/useAuthStore";
import { tema } from "../tema";

// no tiene opcion de eliminar: la API es compartida entre todos los grupos

const claseInput =
  "mt-1 h-11 w-full rounded-xl border border-stone-300 bg-white px-4 font-normal outline-none focus:border-marca-600 focus:ring-4 focus:ring-marca-600/10";

function FormularioProducto() {
  const [archivo, setArchivo] = useState<File | undefined>();
  const [inputKey, setInputKey] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductoFormData>({
    resolver: zodResolver(productoSchema),
    defaultValues: { categoria: tema.categorias[0]?.valor, stock: 10 },
  });

  const onSubmit = async (datos: ProductoFormData) => {
    try {
      setMensaje("");
      setError("");

      // primero subimos la imagen (si hay) y con esa url creamos el producto
      const imagenUrl = archivo
        ? await uploadService.subirImagen(archivo)
        : null;

      const producto = await productosService.crear({
        nombre: datos.nombre,
        precio: datos.precio,
        stock: datos.stock,
        categoria: datos.categoria,
        descripcion: datos.descripcion ?? "",
        imagenUrl,
      });

      setMensaje(`"${producto.nombre}" creado correctamente`);
      reset({ categoria: datos.categoria, stock: 10 });
      setArchivo(undefined);
      setInputKey((k) => k + 1);
    } catch (err) {
      setError(extraerMensaje(err));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl space-y-4 rounded-3xl border border-stone-200 bg-white p-6"
    >
      <label className="block text-sm font-semibold text-slate-700">
        Nombre
        <input {...register("nombre")} className={claseInput} />
        {errors.nombre && (
          <span className="text-xs text-rose-500">{errors.nombre.message}</span>
        )}
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm font-semibold text-slate-700">
          Precio (Bs)
          <input
            type="number"
            step="0.01"
            {...register("precio", { valueAsNumber: true })}
            className={claseInput}
          />
          {errors.precio && (
            <span className="text-xs text-rose-500">
              {errors.precio.message}
            </span>
          )}
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Stock
          <input
            type="number"
            {...register("stock", { valueAsNumber: true })}
            className={claseInput}
          />
          {errors.stock && (
            <span className="text-xs text-rose-500">{errors.stock.message}</span>
          )}
        </label>
      </div>

      <label className="block text-sm font-semibold text-slate-700">
        Categoría
        <select {...register("categoria")} className={claseInput}>
          {tema.categorias.map((c) => (
            <option key={c.valor} value={c.valor}>
              {c.etiqueta} ({c.valor})
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-semibold text-slate-700">
        Descripción
        <input {...register("descripcion")} className={claseInput} />
      </label>

      <label className="block text-sm font-semibold text-slate-700">
        Imagen (opcional)
        <input
          key={inputKey}
          type="file"
          accept="image/*"
          onChange={(e) => setArchivo(e.target.files?.[0])}
          className="mt-1 block text-xs font-normal"
        />
      </label>

      {mensaje && <p className="text-sm text-marca-700">{mensaje}</p>}
      {error && <p className="text-sm text-rose-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-xl bg-marca-600 text-sm font-bold text-white hover:bg-marca-700 disabled:opacity-50"
      >
        {isSubmitting ? "Guardando..." : "Crear producto"}
      </button>
    </form>
  );
}

export function CargarProductosPage() {
  const usuarioRol = useAuthStore((s) => s.usuarioRol);

  if (usuarioRol?.toLowerCase() !== "admin") {
    return (
      <p className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
        Esta página es solo para usuarios <strong>admin</strong>.
      </p>
    );
  }

  return (
    <section>
      <p className="mb-2 text-sm font-semibold text-marca-700">Admin</p>
      <h1 className="text-3xl font-bold tracking-tight">Cargar productos</h1>

      {tema.categorias.length === 0 ? (
        <p className="mt-8 max-w-xl rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
          Primero definan las categorías de su tienda en{" "}
          <code>src/tema.ts</code>.
        </p>
      ) : (
        <div className="mt-8">
          <FormularioProducto />
        </div>
      )}
    </section>
  );
}
