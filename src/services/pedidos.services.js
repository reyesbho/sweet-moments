import { mapToOrder, mapToProduct } from "../utils/mapToOrder";
import { API_PEDIDOS } from "../general/url";
import { mapToPedido } from "../utils/mapToPedido";
import { mapToProducto } from "../utils/mapToProduct";


export const getPedidos = async(status, pagination) => {
    try{
        const res = await fetch(API_PEDIDOS+`?estatus=${status}&page=${pagination.page}&size=${pagination.pageSize}`);
        const data = await res.json();
        const {content, totalElements} = data;
        return {pedidos:content?.map(pedido => mapToOrder({pedido})), totalItems:totalElements};
    } catch (error) {
        throw new Error("Error al buscar los pedidos")
    }
}

export const getProductsByPedidoId = async(orderId) => {
    try{
        const res = await fetch(API_PEDIDOS+`/${orderId}/producto`);
        const data = await res.json();
        return data.map(producto => mapToProduct(producto));
    } catch (error) {
        throw new Error("Error al buscar los productos")
    }
    
}

export const getPedido = async(orderId) => {    
    try{
        const res = await fetch(API_PEDIDOS+`/${orderId}`);
        const data = await res.json();
        return mapToOrder({pedido:data});
    } catch (error) {
        throw new Error("Error al buscar el pedido")
    }
    
}


export const addPedido = async(order) => {
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


export const updateStatePedido = async({id, status}) => {
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

export const addProductoToPedido = async({id, producto}) => {
    const product = mapToProducto(producto);
    try{
        const res = await fetch(API_PEDIDOS+`/${id}/producto`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
        return res;
    }catch (error){
        throw new Error("Error al registrar el producto")
    }
}