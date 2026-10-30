import axios, { AxiosError } from "axios";

interface ErrorApi {
  message?: string;
  detail?: unknown; // FastAPI responde con "detail"
}

// convierte cualquier error (axios, red, js) en un texto para mostrar
export function extraerMensaje(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = (err as AxiosError<ErrorApi>).response?.data;
    if (typeof data?.detail === "string") return data.detail;
    return data?.message ?? `Error ${err.response?.status ?? "de conexión"}`;
  }

  if (err instanceof Error) {
    return err.message;
  }

  return "Error inesperado";
}
