import { useEffect, useState } from "react";
import { getProductos } from "../services/producto.services";
import { ProductDto } from "../general/Interfaces";

export function useProducts(){
    const [products, setProducts] = useState<ProductDto[] | null>(null);
    const [error, setError] = useState(null)

    const getProducts = async() => {
        getProductos()
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