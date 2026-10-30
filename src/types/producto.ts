export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  descripcion: string;
  imagenUrl: string | null;
}

export type CrearProductoDTO = Omit<Producto, "id">;

export interface PaginaProductos {
  productos: Producto[];
  hayMas: boolean;
}
