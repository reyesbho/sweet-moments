import { useCallback, useMemo, useRef, useState } from "react";
import { searchClient } from "../services/catalogs.service";
import { Client, ClienteResponse } from "../general/Interfaces";

export function useClients({ search }:{ search:String }) {
  const [clients, setClients] = useState<Client[]>([]);
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
    return [...clients]?.sort((a:Client, b:Client) => a.name.localeCompare(b.name));
  }, [clients]);

  return { clientsMap: sortedClients.map(client => ({value:client.id, label:`${client.name} ${client.apellidoPaterno}`, client})), getClients, loanding, errorClient: error };
}


