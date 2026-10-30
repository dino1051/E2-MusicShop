export type TipoAlerta = "info" | "exito" | "advertencia" | "error";

interface Props {
  tipo: TipoAlerta;
  titulo: string;
  mensaje: string;
  onCerrar?: () => void;
  onReintentar?: () => void;
}

// TODO [D]: alerta reutilizable
// - un color distinto por tipo (info, exito, advertencia, error)
// - role="alert"
// - boton cerrar si llega onCerrar, boton reintentar si llega onReintentar
export function AlertaBanner({ tipo, titulo, mensaje }: Props) {
  return (
    <div>
      [{tipo}] {titulo}: {mensaje}
    </div>
  );
}
