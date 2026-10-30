interface Props {
  fotoActual: string | null;
  iniciales: string;
  onChange: (file: File | undefined) => void;
}

// TODO [B]: input de foto con preview local
// - validar que sea imagen (file.type) y que pese menos de 2MB (file.size)
// - si no pasa, mostrar un mensaje de error
// - preview con URL.createObjectURL(file) y avisar al padre con onChange(file)
// - mostrar preview ?? fotoActual ?? iniciales
// - boton "Quitar foto" cuando hay preview
// - liberar la url con URL.revokeObjectURL en el cleanup de un useEffect
export function InputFotoPerfil({ fotoActual, iniciales }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="grid size-28 place-items-center overflow-hidden rounded-full border-4 border-marca-600 bg-marca-100 text-2xl font-bold text-marca-800">
        {fotoActual ? (
          <img src={fotoActual} alt="Foto de perfil" className="size-full object-cover" />
        ) : (
          iniciales
        )}
      </div>
      <input type="file" accept="image/*" className="text-xs" />
    </div>
  );
}
