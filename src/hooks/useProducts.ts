import { useEffect, useState } from "react";
import { addProducto, deleteProducto, getProductos, updateProducto } from "../services/producto.service";
import { mapToProductRequestByCatalog } from "../utils/mapsToDto";
import { toast } from "react-toastify";
import { Producto } from "../general/interfaces/pedido.js";

export function useProducts(){
    const [products, setProducts] = useState<Producto[] | null>(null);
    const [realoadProducts,setRealoadProducts] = useState(false);

    const getProducts = async() => {
        getProductos()
        .then((productsList:Producto[]) => {
            setProducts(productsList);
        })
        .catch((error: Error) => toast.error(error.message));
        
    }

    const addProduct = async(newRecord: Producto) =>{
        await addProducto(mapToProductRequestByCatalog(newRecord)).then(()=> {
            handleReloadProducts();
            toast.success("Registrado correctamente.");
        }).catch((error: Error) => toast.error(error.message));
    }

      const updateProduct = async(newRecord: CatalogTypeDto) =>{
        await updateProducto(mapToProductRequestByCatalog(newRecord)).then(()=> {
            handleReloadProducts();
            toast.success("Actualizado correctamente.");
        }).catch((error: Error) => toast.error(error.message));
    }

    const removeProduct = async(idProduct:number) => {
        await deleteProducto(idProduct).then(() => {
            handleReloadProducts();
            toast.success("Eliminado correctamente.");
        })
        .catch((error: Error) => toast.error(error.message));
    }

    const handleReloadProducts = () => {
        setRealoadProducts(!realoadProducts);
    }
    
    useEffect(()=>{
        getProducts();
    },[realoadProducts])

    return {products,updateProduct,removeProduct,addProduct,handleReloadProducts};
}