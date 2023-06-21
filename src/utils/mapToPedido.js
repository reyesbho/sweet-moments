const validateUndefined = (value) => {
    return (value ? value : '');
}

export const mapToPedido = (order) => {
    return {
        cliente: order.cliente,
        estatus:order.status,
        fecha_entrega:order.fechaEntrega,
        lugar_entrega:order.lugarEntrega,
        registrado_por:order.register,
        total: validateUndefined(order.total),
        fecha_registro: order.registerDate,
        fecha_actualizacion: order.updateDate,
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