import { useEffect, useState } from "react";
import { addProducto, deleteProducto, getProductos, updateProducto } from "../services/producto.service";
import { toast } from "react-toastify";
import { Producto } from "../general/interfaces/pedido.js";
import { CatalogTypeDto } from "../general/Dtos.js";

const convertToCatalogType = (producto: Producto):CatalogTypeDto => {
    return {
    id: producto.id,
    descripcion: producto.descripcion,
    estatus: producto.estatus,
    selfDelete: undefined,
    selfUpdateEstatus: undefined,
    tag: producto.tag,
    imagen: producto.imagen
    
}
}

export function useProducts(estatusFilter: string){
    const [products, setProducts] = useState<CatalogTypeDto[] | null>(null);
    const [realoadProducts,setRealoadProducts] = useState(false);
    const [estatus, setEstatus] = useState<string>(estatusFilter);


    const getProducts = async(status?: string) => {
        getProductos(status)
        .then((productsList:Producto[]) => {
            setProducts(productsList.map(convertToCatalogType));
        })
        .catch((error: Error) => toast.error(error.message));
        
    }

    const addProduct = async(newRecord: CatalogTypeDto) =>{
        await addProducto(newRecord).then(()=> {
            handleReloadProducts();
            toast.success("Registrado correctamente.");
        }).catch((error: Error) => toast.error(error.message));
    }

      const updateProduct = async(newRecord: CatalogTypeDto) =>{
        await updateProducto(newRecord).then(()=> {
            handleReloadProducts();
            toast.success("Actualizado correctamente.");
        }).catch((error: Error) => toast.error(error.message));
    }

    const removeProduct = async(idProduct:string) => {
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
        getProducts(estatus);
    },[realoadProducts])

    return {products,updateProduct,removeProduct,addProduct,handleReloadProducts, setEstatus};
}