import { addDoc, collection, doc, getDocs, updateDoc} from "firebase/firestore/lite";
import { db } from "../config/firebase.config";
import { mapToOrder } from "../utils/mapToOrder";
import { mapToPedido } from "../utils/mapToPedido";
import { formatDate } from "../utils/formatDate";

export const  getPedidos = async() => {
    try {    
        const pedidosColl = collection(db, 'pedidos');
        const pedidosSnapshot = await getDocs(pedidosColl);
        const pedidosList = pedidosSnapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
        return pedidosList?.map(pedido => mapToOrder({pedido}));
    } catch (error) {
        throw new Error("Error al buscar los pedidos")
    }
}


export const addPedido = async({order}) => {
    try {    
        const docRef = await addDoc(collection(db, 'pedidos'),mapToPedido(order));
        return docRef.id;
    } catch (error) {
        console.log(error)
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