export const mapToProducto = (producto) => {

    return {
            texto:producto.text,
            porciones:producto.size,
            comentarios: producto.comments,
            idProducto: producto.product.id,
            idSabor: producto.flavorId,
            idTipoProducto: producto.tipoId
        }
}