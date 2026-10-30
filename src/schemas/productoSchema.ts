import z from "zod";
import { tema } from "../tema";

const categoriasValidas = tema.categorias.map((c) => c.valor);

export const productoSchema = z.object({
  nombre: z.string().trim().min(2, "Mínimo 2 caracteres"),
  precio: z.number("Ingresa un número").positive("Debe ser mayor a 0"),
  stock: z
    .number("Ingresa un número")
    .int("Debe ser entero")
    .min(0, "No puede ser negativo"),
  categoria: z
    .string()
    .refine((valor) => categoriasValidas.includes(valor), "Categoría inválida"),
  descripcion: z.string().optional(),
});

export type ProductoFormData = z.infer<typeof productoSchema>;
