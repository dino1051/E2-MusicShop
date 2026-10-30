interface Props {
  titulo: string;
  descripcion?: string;
  accion?: { label: string; onClick: () => void };
}

// TODO [D]: estado vacio con icono, titulo, descripcion y boton opcional
export function EstadoVacio({ titulo }: Props) {
  return <p>{titulo}</p>;
}
