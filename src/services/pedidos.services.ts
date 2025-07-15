import {  mapToProductOrderDto } from "../utils/mapsToDto";
import { API_PEDIDO } from "../general/url";
import {  OrderInfo, Pagination } from "../general/Interfaces";
import { mapToPedidoModel, mapToProductoRequest } from "../utils/mapsToModel";
import { AddNewProductForm } from "../general/Constants";
import { Pedido, PedidosResponse } from "../general/interfaces/pedido";



export const getPedidos = async(statusFilter:String,dateInit:String | null, dateEnd:String | null, pagination:Pagination) => {
        try{
        const res = await fetch(`${API_PEDIDO}?`+
            `estatus=${statusFilter}&pageSize=${pagination.pageSize}`+
            (dateInit?`&dateInit=${dateInit}`:'')+
            (dateEnd?`&dateEnd=${dateEnd}`:''),
            {
                method: 'GET'
            }
        );
        const data:PedidosResponse = await res.json();
        console.log("GET PEDIDOS: ", data)
        return data;
    } catch (error) {
        throw new Error("Error al buscar los pedidos")
    }
}

export const getPedido = async(orderId: string) => {   
       
    try{
        const res = await fetch(API_PEDIDO+`/${orderId}`,
        {
            method: 'GET',
        }
        );
        const data:Pedido = await res.json();
        return data;
    } catch (error) {
        throw new Error("Error al buscar el pedido")
    }
    
}


export const addPedido = async(order: OrderInfo) => {
    const productEntity = mapToPedidoModel(order);
    try{
        const res = await fetch(API_PEDIDO,{
            method: "POST",
              body: JSON.stringify(productEntity)
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error("Error al agregar el pedido")
    }
}

export const updatePedido = async(order: OrderInfo) => {
    const productEntity = mapToPedidoModel(order);
    try{
        const res = await fetch(API_PEDIDO,{
            method: "PUT",
              body: JSON.stringify(productEntity)
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error("Error al actualizar el pedido")
    }
}


export const updateStatePedido = async({id, status}:{id:string, status: string}) => {
    try{
        const res = await fetch(API_PEDIDO+`/${id}`,{
            method: "PATCH",
            body: JSON.stringify({estatus: status})
        });
        return res;
    } catch (error) {
        throw new Error("Error al actualizar el estado del pedido")
    }   
}

export const addProductoToPedido = async({id, producto}:{id:number, producto:AddNewProductForm}) => {
    const product = mapToProductoRequest(producto);
    try{
        const res = await fetch(API_PEDIDO+`/${id}/producto`,{
            method: "POST",
            body: JSON.stringify(product)
        })
        const data = await res.json();
        return mapToProductOrderDto(data);
    }catch (error){
        throw new Error("Error al registrar el producto")
    }
}
