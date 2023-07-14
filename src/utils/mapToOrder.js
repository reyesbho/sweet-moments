export function mapToOrder({pedido}){
    return {
        id:pedido.id,
        cliente:`${pedido.cliente.nombre} ${pedido.cliente.apellidoPaterno}`,
        lugarEntrega: pedido.lugarEntrega,
        fechaEntrega : pedido.fechaEntrega,
        register: "Reyes Bustamante",
        status:pedido.estatus,
        numProducts: 10,
        total: pedido.total,
        registerDate:pedido.fechaRegistro,
        updateDate: pedido.fechaActualizacion
    };
}

export function mapToProduct(productoPedido){
    return {
        id:productoPedido.id,
        text:productoPedido.texto,
        size:productoPedido.porciones,
        comments: productoPedido.comentarios,
        product: {
            id: productoPedido.producto.id,
            nameProduct: productoPedido.producto.descripcion,
            thumbnail: productoPedido.producto.imagen,    
            type: productoPedido.tipoProducto.descripcion,
            flavor:productoPedido.sabor.sabor,
        }
    }
}
