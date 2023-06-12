import { collection,  getDocs } from "firebase/firestore/lite";
import { db } from "../config/firebase.config";
import { formatDate } from "../utils/formatDate";

export const  getPedidos = async() => {
    try {    
        const pedidosColl = collection(db, 'pedidos');
        const pedidosSnapshot = await getDocs(pedidosColl);
        const pedidosList = pedidosSnapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
        return pedidosList?.map(pedido => ({
            id:pedido.id,
            cliente:pedido.cliente,
            lugarEntrega:pedido.lugar_entrega,
            fechaEntrega : formatDate(pedido.fecha_entrega),
            register: pedido.registrado_por,
            status:pedido.estatus,
            numProducts: pedido.productos.length,
            total: pedido.total,
            products: pedido.productos.map((productoPedido, index) =>
                ({
                    id:index,
                    text:productoPedido.texto,
                    size:productoPedido.porciones,
                    comments: productoPedido.comentarios,
                    product: {
                        nameProduct: productoPedido.productoref.nombre,
                        thumbnail: productoPedido.productoref.image,    
                        type: productoPedido.productoref.tipo,
                        flavor:productoPedido.productoref.sabor,
                    }
                })
            )
        }));
    } catch (error) {
        throw new Error("Error al buscar los pedidos")
    }
}