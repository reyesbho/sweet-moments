import { CatalogTypeDto, CatalogTypeModel, ClienteModel, DetailProductoDto, DetailProductoModel, OrderDto, PedidoModel, ProductDto, ProductModel, ProductoPedidoModel, ProductOrderDto } from "../general/Interfaces";

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
        idPedido:productoPedido.idPedido,
        detalleProducto:mapToDetailProductDto(productoPedido.detalleProducto),
        comentarios:productoPedido.comentarios,
        fechaRegistro:productoPedido.fechaRegistro,
        fechaActualizacion:productoPedido.fechaActualizacion,
        cantidad: productoPedido.cantidad
    }
}

export function mapToCatalogTypeDto(cat: CatalogTypeModel):CatalogTypeDto{
    return {
        id: cat.id,
        clave: cat.clave,
        descripcion: cat.descripcion,
        estatus: cat.estatus,
        selfDelete: () => {},
        selfUpdateEstatus: () => {}
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

export function mapToDetailProductDto(product:DetailProductoModel):DetailProductoDto{
    return {
        id: product.id,
        producto:mapToProductDto(product.producto),
        size: mapToCatalogTypeDto(product.size),
        sabor: mapToCatalogTypeDto(product.sabor),
        tipoProducto: mapToCatalogTypeDto(product.tipoProducto),
        tipoCobro:mapToCatalogTypeDto(product.tipoCobro),
        descripcion: product.descripcion,
        estatus: product.estatus,
        precio: product.precio,
    }
}

