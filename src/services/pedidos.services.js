import { mapToOrder, mapToProduct } from "../utils/map";
import { API_PEDIDOS } from "../general/url";
import { Order } from "../components/order/Order";


export const getPedidos = async(status, pagination) => {
    const res = await fetch(API_PEDIDOS+`?estatus=${status}&page=${pagination.page}&size=${pagination.pageSize}`);
    const data = await res.json();
    const {content, totalElements} = data;
    return {pedidos:content?.map(pedido => mapToOrder({pedido})), totalItems:totalElements};
}

export const getProductsByPedidoId = async(orderId) => {
    const res = await fetch(API_PEDIDOS+`/${orderId}/producto`);
    const data = await res.json();
    return data.map(producto => mapToProduct(producto));
}

export const getPedido = async(orderId) => {
    const res = await fetch(API_PEDIDOS+`/${orderId}`);
    const data = await res.json();
    return mapToOrder({data});
}


export const addPedido = async(order) => {
    const res = await fetch(API_PEDIDOS,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: Order
    });
    res;
}


export const updateStatePedido = async({id, status}) => {
    const res = await fetch(API_PEDIDOS+`/${id}/${status}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
          }
    });
    return res;
}