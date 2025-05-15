import { useEffect, useState } from "react";
import { addProducto, deleteProducto, getProductos, updateProducto } from "../services/producto.service";
import { mapToProductRequestByCatalog } from "../utils/mapsToDto";
import { toast } from "react-toastify";
import { CatalogTypeDto, ProductOrderDto } from "../general/Dtos";
import { addProductoToPedido } from "../services/pedidos.services";
import { AddNewProductForm } from "../general/Constants";

export function useProducts(){
    const [products, setProducts] = useState<CatalogTypeDto[] | null>(null);
    const [realoadProducts,setRealoadProducts] = useState(false);

    const getProducts = async() => {
        getProductos()
        .then((productsList:CatalogTypeDto[]) => {
            setProducts(productsList);
        })
        .catch((error: Error) => toast.error(error.message));
        
    }
    const addDetailProductToOrder = async(idPedido:number, detailProduct: AddNewProductForm) => {
        await addProductoToPedido({id:idPedido,producto:detailProduct})
        .then((pedidoProducto: ProductOrderDto)=> {
            toast.success("Registrado correctamente.");
        }).catch((error: Error) => toast.error(error.message));
    }

    const addProduct = async(newRecord: CatalogTypeDto) =>{
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

    return {products,updateProduct,addDetailProductToOrder,removeProduct,addProduct,handleReloadProducts};
}