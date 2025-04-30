import { OrderInfo, PedidoRequest, ProductForm, ProductFormRequest } from "../general/Interfaces";
import { ClienteModel } from "../general/Models";

export const mapToPedidoModel = (pedidoRequest: OrderInfo):PedidoRequest => {
    const clienteArray = pedidoRequest.cliente?.split(" ") ?? [];
    let clientDto:ClienteModel;
    if(pedidoRequest.idCliente){
        clientDto = {
            id: pedidoRequest.idCliente,
            nombre: pedidoRequest.cliente,
            apellidoPaterno: pedidoRequest.firstName,
            apellidoMaterno: pedidoRequest.lastName,
            direccion: pedidoRequest.lugarEntrega
        }
    }else{
        clientDto =  {
            id:0,
            nombre: clienteArray[0],
            apellidoPaterno: (clienteArray.length > 1 ? clienteArray[1] : clienteArray[0]),
            apellidoMaterno: (clienteArray.length > 2 ? clienteArray[2] : null),
            direccion: pedidoRequest.lugarEntrega
        }
    }
    return {
        idPedido: pedidoRequest.idOrder,
        fechaEntrega: pedidoRequest.fechaEntrega?.valueOf() ?? 0,
        lugarEntrega: pedidoRequest.lugarEntrega,
        cliente: clientDto
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

