import { db } from "../config/firebase.config";
import { mapToOrder } from "../utils/mapToOrder";
import { mapToPedido } from "../utils/mapToPedido";
import { addDoc, collection, doc, getCountFromServer, getDoc, getDocs, limit, query, startAfter, updateDoc, where } from "firebase/firestore";
import { API_PEDIDOS } from "../general/url";


export const getPedidos = async(status, pagination) => {
    const res = await fetch(API_PEDIDOS+`?estatus=${status}&page=${pagination.page}&size=${pagination.pageSize}`);
    const data = await res.json();
    const {content, totalElements} = data;
    return {pedidos:content?.map(pedido => mapToOrder({pedido})), totalItems:totalElements};
}


export const getPedido = async(orderId) => {
    const res = await fetch(API_PEDIDOS+`/${orderId}`);
    const data = await res.json();
    return mapToOrder({data});
}


export const addPedido = async({order}) => {
    try {    
        const docRef = await addDoc(collection(db, 'pedidos'),mapToPedido(order));
        return docRef.id;
    } catch (error) {
        throw new Error("Error al registrar el pedido")
    }
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