import { api } from "../lib/axios";
import type {
  CrearProductoDTO,
  PaginaProductos,
  Producto,
} from "../types/producto";

interface ProductoApi {
  id: number;
  name: string;
  category: string | null;
  price: string | number;
  stock: number;
  description: string | null;
  image_url: string | null;
}

const convertirProducto = (producto: ProductoApi): Producto => ({
  id: producto.id,
  nombre: producto.name,
  categoria: producto.category ?? "Sin categoría",
  precio: Number(producto.price),
  stock: producto.stock,
  descripcion: producto.description ?? "",
  imagenUrl: producto.image_url,
});

export const productosService = {
  getTodos: async (): Promise<Producto[]> => {
    const respuesta = await api.get<ProductoApi[]>("/products/", {
      params: { limit: 500 },
    });
    return respuesta.data.map(convertirProducto);
  },

  // TODO [C]: pedir una sola pagina
  // - GET /products/?skip=...&limit=...&category=...
  // - pagina 1 -> skip 0, pagina 2 -> skip porPagina, ...
  // - la API no devuelve el total: pedir porPagina + 1 y si llegan
  //   mas de porPagina es que hay pagina siguiente


  //pagina es el parametro que va ayudar a que se divida en varias paginas
  getPagina: async (
    pagina: number,
    porPagina: number,
    categoria: string,
  ): Promise<PaginaProductos> => {
    const skip = (pagina - 1) * porPagina;
    const params: Record<string, any> = {
      skip: skip,
      limit: porPagina + 1,
    };

    if (categoria && categoria !== "Todas") {
      params.category = categoria;
    }

    const respuesta = await api.get<ProductoApi[]>("/products/", { params });
    const productosMultitud = respuesta.data;

    //AYUDA A FILTRAR PARA MANDARLOS A OTRA PAGINA
    const hayMas = productosMultitud.length > porPagina;

    const productosPagina = hayMas 
      ? productosMultitud.slice(0, porPagina) 
      : productosMultitud;

    return {
      productos: productosPagina.map(convertirProducto),
      hayMas: hayMas,
    };
  },

  crear: async (datos: CrearProductoDTO): Promise<Producto> => {
    const respuesta = await api.post<ProductoApi>("/products/", {
      name: datos.nombre,
      category: datos.categoria,
      price: datos.precio,
      stock: datos.stock,
      description: datos.descripcion || null,
      image_url: datos.imagenUrl || null,
    });
    return convertirProducto(respuesta.data);
  },
};
