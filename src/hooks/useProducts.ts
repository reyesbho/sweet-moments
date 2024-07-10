import { useEffect, useState } from "react";
import { getDetalleProductos } from "../services/detalleProducto.services";
import { CatalogTypeDto, DetailProductoDto, ProductDto, ProductForm, ProductOrderDto, ProductRequest } from "../general/Interfaces";
import { addProducto, deleteProducto, getDetalleProducto, getProductos } from "../services/producto.service";
import { addProductoToPedido } from "../services/pedidos.services";
import { mapToProductRequestByCatalog } from "../utils/mapsToDto";

export function useProducts(){
    const [products, setProducts] = useState<ProductDto[] | null>(null);
    const [detailProducts, setDetailProducts] = useState<DetailProductoDto[] | null>(null);
    const [error, setError] = useState(null)
    const [realoadProducts,setRealoadProducts] = useState(false);

    const getProducts = async() => {
        getProductos()
        .then((productsList:ProductDto[]) => {
            setProducts(productsList);
        })
        .catch((error:any) => setError(error));
        
    }

    const getDetailProducts = async(idProducto: number) => {
        getDetalleProducto(idProducto)
        .then((responseList: DetailProductoDto[]) =>{
            setDetailProducts(responseList);
        })
    }

    const addDetailProductToOrder = async(idPedido:number, detailProduct: ProductForm) => {
        await addProductoToPedido({id:idPedido,producto:detailProduct})
        .then((pedidoProducto: ProductOrderDto)=> {
        })
    }

    const addProduct = async(catalog:string,newRecord: CatalogTypeDto) =>{
        await addProducto(mapToProductRequestByCatalog(newRecord)).then(()=> {
            handleReloadProducts();
        })
    }

    const removeProduct = async(idProduct:number) => {
        await deleteProducto(idProduct).then(() => {
            handleReloadProducts();
        });
    }

    const handleReloadProducts = () => {
        setRealoadProducts(!realoadProducts);
    }
    
    useEffect(()=>{
        getProducts();
    },[realoadProducts])

    return {products,detailProducts, getDetailProducts,addDetailProductToOrder,removeProduct,addProduct,handleReloadProducts, error};
}