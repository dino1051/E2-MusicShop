import { tema } from "../../tema";

interface Props {
  titulo: string;
  descripcion?: string;
  accion?: { label: string; onClick: () => void };
}

// TODO [D]: estado vacio con icono, titulo, descripcion y boton opcional
export function EstadoVacio({ titulo, descripcion, accion }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-12 text-center">
      <div className="mb-4 text-5xl">{tema.emoji}</div>
      <h3 className="text-lg font-bold text-slate-800">{titulo}</h3>

      {descripcion && (
        <p className="mt-2 text-sm text-slate-500 max-w-sm">{descripcion}</p>
      )}

      {accion && (
        <button
          type="button"
          onClick={accion.onClick}
          className="mt-6 rounded-xl bg-marca-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-marca-700 transition shadow-sm"
        >
          {accion.label}
        </button>
      )}
    </div>
  );
}
