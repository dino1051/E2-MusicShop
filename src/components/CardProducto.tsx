import { etiquetaCategoria, tema } from "../tema";
import type { Producto } from "../types/producto";

interface Props {
  producto: Producto;
}

export function CardProducto({ producto }: Props) {
  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
      {producto.imagenUrl ? (
        <img
          src={producto.imagenUrl}
          alt={producto.nombre}
          className="h-40 w-full object-cover"
        />
      ) : (
        <div className="grid h-40 place-items-center bg-stone-100 text-3xl">
          {tema.emoji}
        </div>
      )}
      <div className="space-y-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-marca-700">
          {etiquetaCategoria(producto.categoria)}
        </p>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-slate-900">{producto.nombre}</h3>
          <span className="font-bold text-slate-900">
            Bs {producto.precio.toFixed(2)}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-slate-500">
          {producto.descripcion || "Sin descripción"}
        </p>
        <p className="text-xs text-slate-400">Stock: {producto.stock}</p>
      </div>
    </article>
  );
}
