import { mapToOrder, mapToProduct } from "../utils/mapToOrder";
import { API_PEDIDOS } from "../general/url";
import { mapToPedido } from "../utils/mapToPedido";
import { mapToProducto } from "../utils/mapToProduct";
import { Order, Pagination, Pedido, Product, ProductoPedido } from "../general/Interfaces";



export const getPedidos = async(statusFilter:String, pagination:Pagination) => {
        try{
        const res = await fetch(API_PEDIDOS+`?estatus=${statusFilter}&page=${pagination.page}&size=${pagination.pageSize}`,
            {
                method: 'GET'
            }
        );
        const data = await res.json();
        const {content, totalElements} = data;
        return {pedidos:content?.map((pedido:Pedido) => mapToOrder(pedido)), totalItems:totalElements};
    } catch (error) {
        throw new Error("Error al buscar los pedidos")
    }
}

export const getProductsByPedidoId = async(orderId: number) => { 
    try{
        const res = await fetch(API_PEDIDOS+`/${orderId}/producto`,
        {
            method: 'GET',
        }
        );
        const data = await res.json();
        return data.map((producto:ProductoPedido) => mapToProduct(producto));
    } catch (error) {
        throw new Error("Error al buscar los productos")
    }
    
}

export const getPedido = async(orderId: number) => {   
       
    try{
        const res = await fetch(API_PEDIDOS+`/${orderId}`,
        {
            method: 'GET',
        }
        );
        const data = await res.json();
        return mapToOrder(data);
    } catch (error) {
        throw new Error("Error al buscar el pedido")
    }
    
}


export const addPedido = async(order: Order) => {
    const productEntity = mapToPedido(order);
    try{
        const res = await fetch(API_PEDIDOS,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(productEntity)
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error("Error al agregar el pedido")
    }
}


export const updateStatePedido = async({id, status}:{id:number, status:String}) => {
    try{
        const res = await fetch(API_PEDIDOS+`/${id}/${status}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
              }
        });
        return res;
    } catch (error) {
        throw new Error("Error al actualizar el estado del pedido")
    }   
}

export const addProductoToPedido = async({id, producto}:{id:number, producto:Product}) => {
    const product = mapToProducto(producto);
    try{
        const res = await fetch(API_PEDIDOS+`/${id}/producto`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product)
        })
        return res;
    }catch (error){
        throw new Error("Error al registrar el producto")
    }
}