interface Props {
  pagina: number;
  hayMas: boolean;
  deshabilitado: boolean;
  onCambiarPagina: (nueva: number) => void;
}

// TODO [C]: botones Anterior y Siguiente
// - Anterior deshabilitado en la pagina 1 o mientras carga
// - Siguiente deshabilitado si no hayMas o mientras carga

//el parametro hayMas es lo que va a ayudar a que los botones ya no sigan dando a ver más paginas
export function Paginacion({ pagina, hayMas, deshabilitado, onCambiarPagina, }: Props) {
  return(
    <div className="items-center gap-4">
      <button
        onClick={() => onCambiarPagina(pagina - 1)}
        disabled={pagina <= 1 || deshabilitado}
        className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50">
          ANTERIOR
        </button>

      <span className="text-sm font-medium">
          PAGINA {pagina}
      </span>

      <button
        onClick={() => onCambiarPagina(pagina + 1)}
        disabled={!hayMas || deshabilitado}
        className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50">
          SIGUIENTE
        </button>
    </div>
  )
}
