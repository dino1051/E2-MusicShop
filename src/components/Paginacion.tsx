interface Props {
  pagina: number;
  hayMas: boolean;
  deshabilitado: boolean;
  onCambiarPagina: (nueva: number) => void;
}

// TODO [C]: botones Anterior y Siguiente
// - Anterior deshabilitado en la pagina 1 o mientras carga
// - Siguiente deshabilitado si no hayMas o mientras carga
export function Paginacion({ pagina }: Props) {
  return <p className="mt-8 text-center text-sm">Página {pagina}</p>;
}
