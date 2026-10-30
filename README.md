# Starter del desafío grupal S3

## Arrancar

```bash
npm install
npm run dev
```

Abre http://localhost:5173 e inicia sesión con tu usuario de clase.
¿No tienes usuario? Créalo en https://api-funval-g6.onrender.com/docs → `POST /auth/register`.

## Qué ya viene hecho

- Vite + React 19 + TypeScript + Tailwind 4
- React Router con todas las rutas conectadas (`App.tsx` — no hace falta tocarlo)
- Axios con el interceptor de **request** (pega el token)
- Store de Zustand con `persist` (la sesión sobrevive al F5)
- Login completo con react-hook-form + zod
- Layout con header y navegación, tarjeta de producto, hook `useApi`
- Página `/laboratorio` para probar los componentes de UI
- Página `/admin/productos` (solo admin) para crear los productos de la tienda, con imagen
- `src/tema.ts` + colores `marca-*` en `src/index.css` para la identidad de su tienda

## Dónde está cada tarea

Busca `TODO [` en el proyecto (Ctrl + Shift + F).

```
src/
├── tema.ts                          TODOS: nombre, textos y categorías de su tienda
├── index.css                        TODOS: paleta marca-* y fuente
├── lib/axios.ts                     TODO [A] interceptor de respuesta (401)
├── components/
│   ├── RutaProtegida.tsx            TODO [A]
│   ├── RutaPublica.tsx              TODO [A]
│   ├── InputFotoPerfil.tsx          TODO [B]
│   ├── Paginacion.tsx               TODO [C]
│   ├── ListaProductos.tsx           TODO [D]  ← aquí se juntan C y D
│   ├── ErrorBoundary.tsx            TODO [D]
│   └── ui/                          TODO [D]  Skeleton, AlertaBanner, EstadoVacio
├── services/
│   ├── perfil.ts                    TODO [B] FormData
│   └── productos.ts                 TODO [C] getPagina
└── pages/
    ├── LoginPage.tsx                TODO [A] aviso de sesión expirada
    ├── PerfilPage.tsx               TODO [B]
    └── ProductosPage.tsx            TODO [C] solo productos de la tienda + useSearchParams
```

## API

Base: `https://api-funval-g6.onrender.com` · Swagger: `/docs`

| Método | Ruta                                   | Uso                                                                  |
| ------ | -------------------------------------- | -------------------------------------------------------------------- |
| POST   | `/auth/login`                          | `{ email, password }` → `{ access_token, user_name, user_role }`     |
| GET    | `/auth/me`                             | Perfil del usuario (requiere token)                                  |
| PUT    | `/auth/perfil`                         | `multipart/form-data` con `name` y `foto` (requiere token)           |
| GET    | `/products/?skip=0&limit=6&category=X` | Lista de productos (pública). `category` es exacto                   |
| POST   | `/products/`                           | Crear producto (solo admin)                                          |
| POST   | `/upload/`                             | `multipart/form-data` con `file` → `{ url, public_id }` (solo admin) |
| GET    | `/users/`                              | Lista de usuarios (para el extra de métricas)                        |

## Crear repositorio y desplegarlo en vercel/netlify/githubpages

# cada miembro debera trabajar en su respectiva rama dependiendo de lo que esta realizando.
