import { useCallback, useMemo, useRef, useState } from "react";
import { searchClient } from "../services/catalogs.service";

export function useClients({ search }) {
  const [clients, setClients] = useState([]);
  const [loanding, setLoanding] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getClients = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return;
    try {
      setLoanding(true);
      setError(null);
      previousSearch.current = search;
      const newClients = await searchClient({ search });
      setClients(newClients);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoanding(false);
    }
  }, []);

  //refresca el calculo solo si cambia la referencia
  const sortedMovies = useMemo(() => {
    return [...clients]?.sort((a, b) => a.name.localeCompare(b.name));
  }, [clients]);

  return { clients: sortedMovies.map(client => ({value:client.id, label:`${client.name} ${client.apellidoPaterno}`, client})), getClients, loanding, errorClient: error };
}


