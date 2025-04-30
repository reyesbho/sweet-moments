import { CatalogTypeDto, ClientDto, DetailProductoDto, OrderDto, ProductDto, ProductOrderDto } from "../general/Dtos";
import { ProductRequest } from "../general/Interfaces";
import { CatalogTypeModel, ClienteModel, DetailProductoModel, PedidoModel, ProductModel, ProductoPedidoModel } from "../general/Models";


export function mapToOrderDto(pedido:PedidoModel):OrderDto{
    return {
        id:pedido.id,
        cliente:mapToClienteDto(pedido.cliente),
        lugarEntrega: pedido.lugarEntrega,
        fechaEntrega : pedido.fechaEntrega,
        register: pedido.registradoPor,
        status:pedido.estatus,
        numProducts: pedido.numProductos,
        total: pedido.total,
        registerDate:pedido.fechaRegistro,
        updateDate: pedido.fechaActualizacion,
    };
}

export function mapToProductOrderDto(productoPedido:ProductoPedidoModel):ProductOrderDto{
    return {
        id:productoPedido.id,
        idPedido:productoPedido.idPedido,
        detalleProducto:mapToDetailProductDto(productoPedido.detalleProducto),
        sabor: productoPedido.sabor ? mapToCatalogTypeDto(productoPedido.sabor) : null,
        tipoProducto: productoPedido.tipoProducto ? mapToCatalogTypeDto(productoPedido.tipoProducto) : null,
        comentarios:productoPedido.comentarios,
        fechaRegistro:productoPedido.fechaRegistro,
        fechaActualizacion:productoPedido.fechaActualizacion,
        cantidad: productoPedido.cantidad,
        total: productoPedido.total,
        descuento: productoPedido.descuento
    }
}

export function mapToCatalogTypeDto(cat: CatalogTypeModel):CatalogTypeDto{
    if(!cat)
        return {
            id: 0,
            clave: '',
            descripcion: '',
            estatus: false,
            image: null,
            tags: '',
            selfDelete: () => {},
            selfUpdateEstatus: () => {}
        }
    return {
        id: cat.id,
        clave: cat.clave,
        descripcion: cat.descripcion,
        estatus: cat.estatus,
        image: null,
        tags: cat.tags,
        selfDelete: () => {},
        selfUpdateEstatus: () => {}
    }
}


export function mapToClienteDto(cliente: ClienteModel):ClientDto{
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
        status: product.estatus,
        completed: product.completed
    }
}

export function mapToDetailProductDto(product:DetailProductoModel):DetailProductoDto{
    return {
        id: product.id,
        producto:mapToProductDto(product.producto),
        size: mapToCatalogTypeDto(product.size),
        sabor:mapToCatalogTypeDto(product.sabor),
        tipoProducto:mapToCatalogTypeDto(product.tipoProducto),
        descripcion: product.descripcion,
        estatus: product.estatus,
        precio: product.precio,
        imagen: product.imagen,
        comentarios: product.comentarios
    }
}

export function mapToProductRequestByCatalog(newRecord: CatalogTypeDto):ProductRequest{
    return {
        clave: newRecord.clave,
        descripcion: newRecord.descripcion,
        estatus: newRecord.estatus,
        imagen: newRecord.image ?? ''
    }   
}