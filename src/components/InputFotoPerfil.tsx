import { useEffect, useState } from "react";

interface Props {
  fotoActual: string | null;
  iniciales: string;
  onChange: (file: File | undefined) => void;
}

export function InputFotoPerfil({ fotoActual, iniciales, onChange }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!preview) return;

    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const manejarCambio = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("El archivo seleccionado debe ser una imagen.");
      event.target.value = "";
      return;
    }
    const MAX_SIZE = 2 * 1024 * 1024;

    if (file.size >= MAX_SIZE) {
      setError("La imagen debe pesar menos de 2 MB.");
      event.target.value = "";
      return;
    }
    setError("");
    const nuevaPreview = URL.createObjectURL(file);

    setPreview(nuevaPreview);
    onChange(file);
  };

  const quitarFoto = () => {
    setPreview(null);
    setError("");
    onChange(undefined);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="grid size-28 place-items-center overflow-hidden rounded-full border-4 border-marca-600 bg-marca-100 text-2xl font-bold text-marca-800">
        {preview || fotoActual ? (
          <img
            src={preview ?? fotoActual ?? undefined}
            alt="Foto de perfil"
            className="size-full object-cover"
          />
        ) : (
          iniciales
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={manejarCambio}
        className="text-xs"
      />
      {error && (
        <p className="text-center text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {preview && (
        <button
          type="button"
          onClick={quitarFoto}
          className="text-sm font-medium text-red-600 hover:text-red-800"
        >
          Quitar foto
        </button>
      )}
    </div>
  );
}
