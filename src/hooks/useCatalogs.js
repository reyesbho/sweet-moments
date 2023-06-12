import { useEffect, useState } from "react";
import { getCatalog } from "../services/catalogs.service";

export function useCatalogs({tipo}){
    const [catalog, setCatalog] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const getCatalogs = async () => {
        setLoading(true);
        await getCatalog({catalogo:tipo})
        .then(resultCatalog => {
            setCatalog(resultCatalog);})
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }

    useEffect(() => {
        getCatalogs();
        //clean efect
        return () => {}
    }, [])

    
    return {catalog, loading, error};
}