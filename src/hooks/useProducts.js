import { useEffect, useState } from "react";
import { getProductos } from "../services/producto.services";

export function useProducts(){
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)


    const getProducts = () => {
        setLoading(true);
        getProductos()
        .then(productsList =>setProducts(productsList))
        .catch(error => setError(error))
        .finally(() => setLoading(false))
        
    }
    useEffect(() => {
        getProducts();

        //clean effect
        return () => {}
    },[])

    return {products, setProducts, loading, error};
}