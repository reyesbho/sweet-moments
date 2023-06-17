import { addDoc, collection,  doc,  getDocs, setDoc } from "firebase/firestore/lite";
import { db } from "../config/firebase.config";
import { formatDate } from "../utils/formatDate";

export const  getPedidos = async() => {
    try {    
        console.log("GET PEDIDOS");
        const pedidosColl = collection(db, 'pedidos');
        const pedidosSnapshot = await getDocs(pedidosColl);
        const pedidosList = pedidosSnapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
        return pedidosList?.map(pedido => ({
            id:pedido.id,
            cliente:pedido.cliente,
            lugarEntrega:pedido.lugar_entrega,
            fechaEntrega : pedido.fecha_entrega,
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


export const addPedido = async({order}) => {
    try {    
        const validateUndefined = (value) => {
            return (value ? value : '');
        }
        const mapOrderToRegister = (order) => {
            return {
                cliente: order.cliente,
                estatus:order.status,
                fecha_entrega:order.fechaEntrega,
                lugar_entrega:order.lugarEntrega,
                registrado_por:order.register,
                total: validateUndefined(order.total),
                productos: order.products.map((productoPedido) =>
                ({
                    texto:validateUndefined(productoPedido.text),
                    porciones:validateUndefined(productoPedido.size),
                    comentarios: validateUndefined(productoPedido.comments),
                    productoref: {
                        nombre: validateUndefined(productoPedido.product.nameProduct),
                        image: validateUndefined(productoPedido.product.thumbnail),    
                        tipo: validateUndefined(productoPedido.product.type),
                        sabor: validateUndefined(productoPedido.product.flavor),
                    }
                })
                )
            }
        }
        const docRef = await addDoc(collection(db, 'pedidos'),mapOrderToRegister(order));
        return docRef.id;
    } catch (error) {
        throw new Error("Error al registrar el pedido")
    }
}