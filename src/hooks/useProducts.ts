import { useEffect, useState } from "react";
import { CatalogTypeDto, DetailProductoDto, ProductDto, ProductForm, ProductOrderDto } from "../general/Interfaces";
import { addProducto, deleteProducto, getDetalleProducto, getProductos } from "../services/producto.service";
import { addProductoToPedido } from "../services/pedidos.services";
import { mapToProductRequestByCatalog } from "../utils/mapsToDto";
import { toast } from "react-toastify";

export function useProducts(){
    const [products, setProducts] = useState<ProductDto[] | null>(null);
    const [detailProducts, setDetailProducts] = useState<DetailProductoDto[] | null>(null);
    const [realoadProducts,setRealoadProducts] = useState(false);

    const getProducts = async() => {
        getProductos()
        .then((productsList:ProductDto[]) => {
            setProducts(productsList);
        })
        .catch((error: Error) => toast.error(error.message));
        
    }

    const getDetailProducts = async(idProducto: number) => {
        getDetalleProducto(idProducto)
        .then((responseList: DetailProductoDto[]) =>{
            setDetailProducts(responseList);
        }).catch((error: Error) => toast.error(error.message));
    }

    const addDetailProductToOrder = async(idPedido:number, detailProduct: ProductForm) => {
        await addProductoToPedido({id:idPedido,producto:detailProduct})
        .then((pedidoProducto: ProductOrderDto)=> {
            toast.success("Registrado correctamente.");
        }).catch((error: Error) => toast.error(error.message));
    }

    const addProduct = async(catalog:string,newRecord: CatalogTypeDto) =>{
        await addProducto(mapToProductRequestByCatalog(newRecord)).then(()=> {
            handleReloadProducts();
            toast.success("Registrado correctamente.");
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

    return {products,detailProducts, getDetailProducts,addDetailProductToOrder,removeProduct,addProduct,handleReloadProducts};
}