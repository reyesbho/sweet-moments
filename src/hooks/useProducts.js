import { useEffect, useState } from "react";
import { getProductos } from "../services/productos.service";

export function useProducts(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true);
        getProductos()
        .then(productsList => setProducts(productsList))
        .catch(error => setError(error))
        .finally(() => setLoading(false))
    },[])

    return {products, loading, error};
}