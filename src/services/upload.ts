import { api } from "../lib/axios";

// la API responde { url, public_id }
interface UploadRespuesta {
  url: string;
  public_id: string;
}

export const uploadService = {
  subirImagen: async (archivo: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", archivo);

    const respuesta = await api.post<UploadRespuesta>("/upload/", formData);
    return respuesta.data.url;
  },
};
