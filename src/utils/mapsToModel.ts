import { OrderInfo, PedidoRequest, ProductForm, ProductFormRequest } from "../general/Interfaces";

export const mapToPedidoModel = (pedidoRequest: OrderInfo):PedidoRequest => {
    const clienteArray = pedidoRequest.cliente?.split(" ") ?? [];
    return {
        idPedido: pedidoRequest.idOrder,
        fechaEntrega: pedidoRequest.fechaEntrega,
        lugarEntrega: pedidoRequest.lugarEntrega,
        cliente:  {
            id:0,
            nombre: clienteArray[0],
            apellidoPaterno: (clienteArray.length > 1 ? clienteArray[1] : clienteArray[0]),
            apellidoMaterno: (clienteArray.length > 2 ? clienteArray[2] : null),
            direccion: pedidoRequest.lugarEntrega
        },
    }
}
export const mapToProductoRequest = (producto:ProductForm):ProductFormRequest => {

    return {
        idDetalleProducto:producto.idDetailProduct,
        idSabor:producto.idFlavor,
        idTipoProducto: producto.idTypeProduct,
        comentarios:producto.comments,
        cantidad: producto.quantity,
        total: producto.total,
        descuento: producto.descuento    
    }
}

