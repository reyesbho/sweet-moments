import { useCallback, useEffect, useState } from "react";
import { addProducto, deleteProducto, getProductos, updateProducto, updateStateProduct } from "../services/producto.service";
import { toast } from "react-toastify";
import { Producto } from "../general/interfaces/pedido.js";
import { CatalogTypeDto } from "../general/Dtos.js";


export function useProducts(estatusFilter?: string){
    const [products, setProducts] = useState<CatalogTypeDto[]>([]);
    const [realoadProducts,setRealoadProducts] = useState(false);
    const [estatus, setEstatus] = useState<string | undefined>(estatusFilter);
    const [loading, setLoading] = useState(false);


    
    const getProducts = async(status?: string) => {
        setLoading(true);
        getProductos(status)
        .then((productsList:Producto[]) => {
            setProducts(productsList.map(convertToCatalogType));
        })
        .catch((error: Error) => toast.error(error.message))
        .finally(() => setLoading(false));
        
    }

    const addProduct = useCallback(async(newRecord: CatalogTypeDto) =>{
        setLoading(true);
        try{
            await addProducto(newRecord);
            toast.success("Registrado correctamente.");
            setLoading(false);
            return { success: true };    
        }catch(error:any){
            toast.error(error.message)
            setLoading(false);
            return { success: false, error: error.message };
        }
    }, []);

      const updateProduct = async(newRecord: CatalogTypeDto) =>{
        setLoading(true);
        await updateProducto(newRecord).then(()=> {
            handleReloadProducts();
            toast.success("Actualizado correctamente.");
        }).catch((error: Error) => toast.error(error.message))
        .finally(() => setLoading(false));
    }

    const removeProduct = async(idProduct:string) => {
        setLoading(true);
        await deleteProducto(idProduct).then(() => {
            handleReloadProducts();
            toast.success("Eliminado correctamente.");
        })
        .catch((error: Error) => toast.error(error.message))
        .finally(() => setLoading(false));
    }

    const handleReloadProducts = () => {
        setRealoadProducts(!realoadProducts);
    }

    const convertToCatalogType = (producto: Producto):CatalogTypeDto => {
        return {
        id: producto.id,
        descripcion: producto.descripcion,
        estatus: producto.estatus,
        selfDelete: undefined,
        selfUpdateEstatus: () => updateStateProduct(producto.id).then(handleResponseUpdate).catch((error: Error) => toast.error(error.message)),
        tag: producto.tag,
        imagen: producto.imagen
        
    }
    }
    
    const handleResponseUpdate = (response: Response) => {
        if (response.status === 200) {
            toast.success("Actualizado correctamente.");
        }
        else if (response.status === 304) {
            toast.error("No se puede actualizar el registro.");
        }
    }

    
    useEffect(()=>{
        getProducts(estatus);
    },[realoadProducts])

    return {products,updateProduct,removeProduct,addProduct,handleReloadProducts, setEstatus, loading};
}