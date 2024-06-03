import { CatalogTypeDto, ClienteModel, OrderDto, PedidoModel, ProductDto, ProductModel, ProductoPedidoModel, ProductOrderDto, ProductoTipoModel, ProductSelectDto, SaborModel } from "../general/Interfaces";

export function mapToOrderDto(pedido:PedidoModel):OrderDto{
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

export function mapToProductOrderDto(productoPedido:ProductoPedidoModel):ProductOrderDto{
    return {
        id:productoPedido.id,
        text:productoPedido.texto,
        size:productoPedido.porciones,
        comments: productoPedido.comentarios,
        key: productoPedido.producto.clave,
        price: productoPedido.precio,
        flavorId:productoPedido.sabor.id,
        tipoId:productoPedido.tipoProducto.id,
        product: {
            id: productoPedido.producto.id,
            nameProduct: productoPedido.producto.descripcion,
            thumbnail: productoPedido.producto.imagen,    
            type: productoPedido.tipoProducto.descripcion,
            flavor:productoPedido.sabor.clave,
            key: productoPedido.producto.clave
        }
    }
}

export function mapToCatalogTypeDto(cat: ProductoTipoModel | SaborModel):CatalogTypeDto{
    return {
        value: cat.id.toString(),
        label: cat.descripcion,
        id: cat.id
    }
}


export function mapToClienteDto(cliente: ClienteModel){
    return {
        id: cliente.id,
        name: cliente.nombre,
        apellidoPaterno: cliente.apellidoPaterno,
        apellidoMaterno: cliente.apellidoMaterno,
        direccion: cliente.direccion
    }
}

export function mapToProductDto(product:ProductModel):ProductDto{
    return {
        id: product.id, 
        key:product.clave,
        nameProduct: product.descripcion,
        thumbnail: product.imagen,
        status: product.estatus
    }
}

