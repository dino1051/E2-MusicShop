import { useEffect, useState } from "react";
import { extraerMensaje } from "../lib/errorHandler";

interface UseApiResult<T> {
  data: T | null;
  cargando: boolean;
  error: string | null;
  recargar: () => void;
}

export function useApi<T>(
  fetchFn: () => Promise<T>,
  dependencias: unknown[] = [],
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contador, setContador] = useState(0);

  useEffect(() => {
    let cancelado = false;
    setCargando(true);
    setError(null);

    fetchFn()
      .then((resultado) => {
        if (!cancelado) setData(resultado);
      })
      .catch((err) => {
        if (!cancelado) setError(extraerMensaje(err));
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });

    return () => {
      cancelado = true;
    };
  }, [contador, ...dependencias]);

  return { data, cargando, error, recargar: () => setContador((c) => c + 1) };
}
