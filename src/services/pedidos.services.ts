import { mapToOrderDto, mapToProductOrderDto } from "../utils/mapsToDto";
import { API_PEDIDOS } from "../general/url";
import {  OrderDto, Pagination, PedidoModel, ProductDto, ProductoPedidoModel, ProductOrderDto } from "../general/Interfaces";
import { mapToPedidoModel, mapToProductoRequest } from "../utils/mapsToModel";



export const getPedidos = async(statusFilter:String,dateInit:String | null, dateEnd:String | null, pagination:Pagination) => {
        try{
        const res = await fetch(`${API_PEDIDOS}?`+
            `estatus=${statusFilter}&page=${pagination.page}&size=${pagination.pageSize}`+
            (dateInit?`&dateInit=${dateInit}`:'')+
            (dateEnd?`&dateEnd=${dateEnd}`:''),
            {
                method: 'GET'
            }
        );
        const data = await res.json();
        const {content, totalElements} = data;
        return {pedidos:content?.map((pedido:PedidoModel) => mapToOrderDto(pedido)), totalItems:totalElements};
    } catch (error) {
        throw new Error("Error al buscar los pedidos")
    }
}

export const getProductsByPedidoId = async(orderId: number):Promise<ProductOrderDto[]> => { 
    try{
        const res = await fetch(API_PEDIDOS+`/${orderId}/producto`,
        {
            method: 'GET',
        }
        );
        const data = await res.json();
        return data.map((producto:ProductoPedidoModel) => mapToProductOrderDto(producto));
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
        return mapToOrderDto(data);
    } catch (error) {
        throw new Error("Error al buscar el pedido")
    }
    
}


export const addPedido = async(order: OrderDto) => {
    const productEntity = mapToPedidoModel(order);
    try{
        const res = await fetch(API_PEDIDOS,{
            method: "POST",
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
        });
        return res;
    } catch (error) {
        throw new Error("Error al actualizar el estado del pedido")
    }   
}

export const addProductoToPedido = async({id, producto}:{id:number, producto:ProductOrderDto}) => {
    const product = mapToProductoRequest(producto);
    try{
        const res = await fetch(API_PEDIDOS+`/${id}/producto`,{
            method: "POST",
            body: JSON.stringify(product)
        })
        return res;
    }catch (error){
        throw new Error("Error al registrar el producto")
    }
}