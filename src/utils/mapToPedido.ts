import { Order, Pedido } from "../general/Interfaces";

export const mapToPedido = (order: Order):Pedido => {
    const clienteArray = order.cliente.split(" ");
    return {
        id: 0,
        estatus: '',
        fechaRegistro:null,
        fechaActualizacion:null,
        numProductos:0,
        fechaEntrega:order.fechaEntrega,
        lugarEntrega:order.lugarEntrega,
        total: 0,
        cliente: {
            id:0,
            nombre: order.cliente,
            apellidoPaterno: (clienteArray.length > 1 ? clienteArray[1] : clienteArray[0]),
            apellidoMaterno: (clienteArray.length > 2 ? clienteArray[2] : null),
            direccion: order.lugarEntrega
        }
    }
}