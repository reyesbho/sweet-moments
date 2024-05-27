import { Order, Pedido, Product, ProductoPedido } from "../general/Interfaces";

export function mapToOrder(pedido:Pedido):Order{
    return {
        id:pedido.id,
        cliente:`${pedido.cliente.nombre} ${pedido.cliente.apellidoPaterno}`,
        lugarEntrega: pedido.lugarEntrega,
        fechaEntrega : pedido.fechaEntrega,
        register: pedido.registradoPor,
        status:pedido.estatus,
        numProducts: pedido.numProductos,
        total: pedido.total,
        registerDate:pedido.fechaRegistro,
        updateDate: pedido.fechaActualizacion,
        horaEntrega: pedido.horaEntrega
    };
}

export function mapToProduct(productoPedido:ProductoPedido):Product{
    return {
        id:productoPedido.id,
        text:productoPedido.texto,
        size:productoPedido.porciones,
        comments: productoPedido.comentarios,
        key: productoPedido.producto.clave,
        price: productoPedido.precio,
        product: {
            id: productoPedido.producto.id,
            nameProduct: productoPedido.producto.descripcion,
            thumbnail: productoPedido.producto.imagen,    
            type: productoPedido.tipoProducto.descripcion,
            flavor:productoPedido.sabor.clave,
        }
    }
}
