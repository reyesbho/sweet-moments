import { useEffect, useState } from "react";
import { getDetalleProductos } from "../services/detalleProducto.services";
import { DetailProductoDto, ProductDto, ProductForm, ProductOrderDto } from "../general/Interfaces";
import { getDetalleProducto, getProductos } from "../services/producto.service";
import { addProductoToPedido } from "../services/pedidos.services";

export function useProducts(){
    const [products, setProducts] = useState<ProductDto[] | null>(null);
    const [detailProducts, setDetailProducts] = useState<DetailProductoDto[] | null>(null);
    const [error, setError] = useState(null)

    const getProducts = async() => {
        getProductos()
        .then((productsList:ProductDto[]) => {
            setProducts(productsList);
        })
        .catch((error:any) => setError(error));
        
    }

    const getDetailProducts = async(idProducto: number) => {
        getDetalleProducto(idProducto)
        .then((detailProducts: DetailProductoDto[]) =>{
            setDetailProducts(detailProducts);
        })
    }

    const addDetailProductToOrder = async(idPedido:number, detailProduct: ProductForm) => {
        await addProductoToPedido({id:idPedido,producto:detailProduct})
        .then((pedidoProducto: ProductOrderDto)=> {})
    }

    
    useEffect(()=>{
        getProducts();
    },[])

    return {products,detailProducts, getDetailProducts,addDetailProductToOrder, error};
}