import { useState } from "react";
import { ListaProductos } from "../components/ListaProductos";
import { Paginacion } from "../components/Paginacion";
import { useApi } from "../hooks/useApi";
import { productosService } from "../services/productos";

const POR_PAGINA = 6;

// TODO [C]: catalogo de la tienda
// - ahora se ven los productos de TODOS los grupos. Mostrar solo los de
//   su tienda usando tema.categorias (el select tambien)
// - guardar pagina y categoria en la URL con useSearchParams
//   ej: /productos?categoria=Ropa-Polos&pagina=2
// - si la URL trae algo raro (?pagina=abc, una categoria que no es suya)
//   usar los valores por defecto
// - al cambiar de categoria volver a la pagina 1
// - implementar getPagina y <Paginacion />
export function ProductosPage() {
  const [pagina, setPagina] = useState(1);
  const [categoria, setCategoria] = useState("Todas");

  const { data, cargando, error, recargar } = useApi(
    () => productosService.getPagina(pagina, POR_PAGINA, categoria),
    [pagina, categoria],
  );

  const { data: todos } = useApi(() => productosService.getTodos(), []);
  const categorias = [
    "Todas",
    ...new Set((todos ?? []).map((p) => p.categoria)),
  ];

  const cambiarCategoria = (nueva: string) => {
    setCategoria(nueva);
  };

  const irAPagina = (nueva: number) => {
    setPagina(nueva);
  };

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-marca-700">
            Catálogo
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
        </div>

        <label className="text-sm font-semibold text-slate-700">
          Categoría
          <select
            value={categoria}
            onChange={(e) => cambiarCategoria(e.target.value)}
            className="mt-1 block h-10 rounded-xl border border-stone-300 bg-white px-3 font-normal"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ListaProductos
        productos={data?.productos ?? []}
        cargando={cargando}
        error={error}
        porPagina={POR_PAGINA}
        onReintentar={recargar}
        onLimpiarFiltros={() => cambiarCategoria("Todas")}
      />

      <Paginacion
        pagina={pagina}
        hayMas={data?.hayMas ?? false}
        deshabilitado={cargando}
        onCambiarPagina={irAPagina}
      />
    </section>
  );
}
