import { API_PEDIDO } from "../general/url";
import { Pedido, PedidosResponse } from "../general/interfaces/pedido";
import { OrderInfo, Pagination } from "../general/interfaces/Generals";
import { getFormattedDateForEntrega } from "../utils/formatDate";



export const getPedidos = async(statusFilter:String,dateInit:String | null, dateEnd:String | null, pagination:Pagination) => {
        try{
        const res = await fetch(`${API_PEDIDO}?`+
            `estatus=${statusFilter}&pageSize=${pagination.pageSize}`+
            (dateInit?`&fechaInicio=${dateInit}`:'')+
            (dateEnd?`&fechaFin=${dateEnd}`:''),
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


export const addPedido = async(order: Pedido) => {
    try{
        const res = await fetch(API_PEDIDO,{
            method: "POST",
              body: JSON.stringify(order)
        });
        const data:Pedido = await res.json();
        return data;
    } catch (error) {
        throw new Error("Error al agregar el pedido")
    }
}

export const updatePedido = async(order: Pedido) => {
    try{
        const res = await fetch(`${API_PEDIDO}/${order.id}`,{
            method: "PATCH",
              body: JSON.stringify(order)
        });
        const data:Pedido = await res.json();
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