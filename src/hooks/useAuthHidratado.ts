import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

// persist tarda un momento en leer localStorage,
// mientras tanto autenticado vale false aunque si haya sesion
export function useAuthHidratado() {
  const [hidratado, setHidratado] = useState(
    useAuthStore.persist.hasHydrated(),
  );

  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setHidratado(true);
    });

    return unsubscribe;
  }, []);

  return hidratado;
}
