import { useEffect, useState } from "react";
import { getSabores } from "../services/sabor.service";
import { CatalogTypeDto } from "../general/Interfaces";


export function useCatalogs(){
    const [catalog, setCatalog] = useState<CatalogTypeDto[]>([]);
    const [flavors, setFlavors] = useState<CatalogTypeDto[]>([]);
    const [error, setError] = useState(null);


    const getCatalogsType = (idProduct: Number) => {
        /*getCatalogType({idProduct})
        .then(resultCatalog => {
            setCatalog(resultCatalog);})
        .catch(error => setError(error))
        .finally(() =>{});*/
    }

    const getFlavors = () => {
        getSabores()
        .then(resultCatalog => {
            setFlavors(resultCatalog);})
        .catch(error => setError(error));
    }

    
    useEffect(()=>{
        getFlavors();
    },[])
    
    return {catalog,flavors, getCatalogsType, error, getFlavors};
}