import type { Producto } from "../types/producto";
import { CardProducto } from "./CardProducto";

// C le pasa los datos y D se encarga de como se ve cada estado,
// si cambian las props avisen al equipo

interface Props {
  productos: Producto[];
  cargando: boolean;
  error: string | null;
  porPagina: number;
  onReintentar: () => void;
  onLimpiarFiltros: () => void;
}

// TODO [D]: los 4 estados de la lista
// - cargando: grilla con porPagina <SkeletonCardProducto />
// - error: <AlertaBanner tipo="error" /> con boton para reintentar
// - vacio: <EstadoVacio /> con accion para limpiar filtros
// - datos: la grilla de productos (ya funciona)
export function ListaProductos({ productos, cargando, error }: Props) {
  if (cargando) return <p>Cargando...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {productos.map((producto) => (
        <CardProducto key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
