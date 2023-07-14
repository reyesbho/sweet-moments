import { useEffect, useState } from "react";
import { getCatalogType, getSabores } from "../services/catalogs.service";

export function useCatalogs(){
    const [catalog, setCatalog] = useState([]);
    const [flavors, setFlavors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const getCatalogsType = async (idProduct) => {
        setLoading(true);
        await getCatalogType({idProduct})
        .then(resultCatalog => {
            setCatalog(resultCatalog);})
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }

    const getFlavors = async () => {
        await getSabores()
        .then(resultCatalog => {
            setFlavors(resultCatalog);})
        .catch(error => setError(error));
    }

    useEffect(()=>{
        getFlavors()
    }, [])
    
    return {catalog,flavors, getCatalogsType, loading, error};
}