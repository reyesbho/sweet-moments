import { mapToOrderDto, mapToProductOrderDto } from "../utils/mapsToDto";
import { API_PEDIDO } from "../general/url";
import {  AddNewProductForm, OrderInfo, Pagination, ProductForm } from "../general/Interfaces";
import { mapToPedidoModel, mapToProductoRequest } from "../utils/mapsToModel";
import { PedidoModel, ProductoPedidoModel } from "../general/Models";
import { ProductOrderDto } from "../general/Dtos";



export const getPedidos = async(statusFilter:String,dateInit:String | null, dateEnd:String | null, pagination:Pagination) => {
        try{
        const res = await fetch(`${API_PEDIDO}?`+
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
        const res = await fetch(API_PEDIDO+`/${orderId}/producto`,
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
        const res = await fetch(API_PEDIDO+`/${orderId}`,
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


export const updateStatePedido = async({id, status}:{id:number, status:String}) => {
    try{
        const res = await fetch(API_PEDIDO+`/${id}/${status}`,{
            method: "PUT",
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

export const deleteProductoPedido = async({idPedido, idProductoPedido}:{idPedido:number, idProductoPedido:number}) => {
    try{
        const res = await fetch(API_PEDIDO+`/${idPedido}/producto/${idProductoPedido}`,{
            method: "DELETE",
        })
        return res;
    }catch (error){
        throw new Error("Error al eliminar el producto")
    }
}


export const deletePedido = async({idPedido}:{idPedido:number}) => {
    try{
        const res = await fetch(API_PEDIDO+`/${idPedido}`,{
            method: "DELETE",
        })
        return res;
    }catch (error){
        throw new Error("Error al eliminar el pedido")
    }
}
