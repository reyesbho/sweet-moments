import { useEffect, useState } from "react";
import { getDetalleProductos } from "../services/detalleProducto.services";
import { ProductDto } from "../general/Interfaces";

export function useProducts(){
    const [products, setProducts] = useState<ProductDto[] | null>(null);
    const [error, setError] = useState(null)

    const getProducts = async() => {
        getDetalleProductos()
        .then((productsList:ProductDto[]) => {
            setProducts(productsList);
        })
        .catch((error:any) => setError(error));
        
    }

    
    useEffect(()=>{
        getProducts();
    },[])

    return {products, setProducts, error, getProducts};
}