import { useEffect, useState } from "react";
import { getProductos } from "../services/productos.service";

export function useProducts(){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductos().then(productsList => setProducts(productsList));
    },[])

    return {products};
}