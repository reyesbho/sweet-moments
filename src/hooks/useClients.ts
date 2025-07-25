import { useCallback, useMemo, useRef, useState } from "react";
import { ClientDto } from "../general/interfaces/Generals";
import { searchClient } from "../services/cliente.service";

export function useClients({ search }:{ search:String }) {
  const [clients, setClients] = useState<ClientDto[]>([]);
  const [loanding, setLoanding] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getClients = useCallback(async ({ search }:{search:String}) => {
    if (search === previousSearch.current) return;
    try {
      setLoanding(true);
      setError(null);
      previousSearch.current = search;
      const newClients = await searchClient({ search });
      setClients(newClients);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoanding(false);
    }
  }, []);

  //refresca el calculo solo si cambia la referencia
  const sortedClients = useMemo(() => {
    return [...clients]?.sort((a:ClientDto, b:ClientDto) => a.name.localeCompare(b.name));
  }, [clients]);

  return { clientsMap: sortedClients.map(client => ({value:client.id, label:`${client.name} ${client.apellidoPaterno}`, client})), getClients, loanding, errorClient: error };
}


