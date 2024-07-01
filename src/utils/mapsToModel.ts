import { OrderDto, PedidoModel, ProductForm, ProductOrderDto } from "../general/Interfaces";


export const mapToPedidoModel = (order: OrderDto):PedidoModel => {
    const clienteArray = order.cliente.split(" ");
    return {
        id: 0,
        estatus: '',
        fechaRegistro:null,
        fechaActualizacion:null,
        numProductos:0,
        fechaEntrega:order.fechaEntrega,
        horaEntrega: order.horaEntrega,
        lugarEntrega:order.lugarEntrega,
        registradoPor: null,
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

export const mapToProductoRequest = (producto:ProductForm) => {

    return {
        idDetalleProducto:producto.idDetailProduct,
        comentarios:producto.comments,
        cantidad: producto.quantity,
        }
}

