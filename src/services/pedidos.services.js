import { db } from "../config/firebase.config";
import { mapToOrder } from "../utils/mapToOrder";
import { mapToPedido } from "../utils/mapToPedido";
import { formatDate } from "../utils/formatDate";
import { addDoc, collection, doc, getCountFromServer, getDocs, limit, query, startAfter, updateDoc, where } from "firebase/firestore";

export const  getPedidos = async(status, pagination, lastItem) => {
    try {    
        const pedidosColl = collection(db, 'pedidos');
        const queryPedidos = (lastItem ? query(pedidosColl, where('estatus', '==', status), limit(pagination.pageSize), startAfter(lastItem)):
                            query(pedidosColl, where('estatus', '==', status), limit(pagination.pageSize)))
        const pedidosSnapshot = await getDocs(queryPedidos);
        const lastVisible = pedidosSnapshot.docs[pedidosSnapshot.docs.length-1];
        const pedidosList = pedidosSnapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));

        const queryCount = query(pedidosColl, where('estatus', '==', status));
        const snapshot = await getCountFromServer(queryCount);
        console.log(snapshot.data().count)

        return {pedidos:pedidosList?.map(pedido => mapToOrder({pedido})), lastItem:lastVisible, totalItems:snapshot.data().count};
    } catch (error) {
        throw new Error("Error al buscar los pedidos")
    }
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
    try {    
        const docRef = await updateDoc(doc(db, 'pedidos', id), {estatus: status, fecha_actualizacion: formatDate(new Date())});
        return docRef
    } catch (error) {
        throw new Error("Error al actualizar el pedido")
    }
}