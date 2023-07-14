export const mapToPedido = (order) => {
    console.log(order)
    return {
        fechaEntrega:order.fechaEntrega,
        lugarEntrega:order.lugarEntrega,
        total: 190,
        cliente: {
            id:order.clienteObj.client.id,
            nombre: order.clienteObj.client.name,
            apellidoPaterno: order.clienteObj.client.apellidoPaterno,
            apellidoMaterno: order.clienteObj.client.apellidoMaterno,
            direccion: order.lugarEntrega
        },
        productos: order.products.map((productoPedido) =>
        ({
            texto:productoPedido.text,
            porciones:productoPedido.size,
            comentarios: productoPedido.comments,
            idProducto: productoPedido.product.id,
            idSabor: productoPedido.flavorId,
            idTipoProducto: productoPedido.tipoId
        })
        )
    }
}