export function mapToOrder({pedido}){
    return {
        id:pedido.id,
        cliente:pedido.cliente,
        lugarEntrega:pedido.lugar_entrega,
        fechaEntrega : pedido.fecha_entrega,
        register: pedido.registrado_por,
        status:pedido.estatus,
        numProducts: pedido.productos.length,
        total: pedido.total,
        registerDate:pedido.fecha_registro,
        updateDate: pedido.fecha_actualizacion,
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
    };
}