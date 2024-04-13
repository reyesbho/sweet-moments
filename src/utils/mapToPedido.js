export const mapToPedido = (order) => {
    const clienteArray = order.cliente.split(" ");
    return {
        fechaEntrega:order.fechaEntrega,
        lugarEntrega:order.lugarEntrega,
        total: 0,
        cliente: {
            nombre: order.cliente,
            apellidoPaterno: (clienteArray.lenght > 1 ? clienteArray[1] : clienteArray[0]),
            apellidoMaterno: (clienteArray.lenght > 2 ? clienteArray[2] : null),
            direccion: order.lugarEntrega
        },
        /*productos: order.products.map((productoPedido) =>
        ({
            texto:productoPedido.text,
            porciones:productoPedido.size,
            comentarios: productoPedido.comments,
            idProducto: productoPedido.product.id,
            idSabor: productoPedido.flavorId,
            idTipoProducto: productoPedido.tipoId
        })
        )*/
    }
}