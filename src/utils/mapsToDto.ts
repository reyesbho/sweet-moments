import { CatalogTypeDto, ClientDto, DetailProductoDto, OrderDto, ProductOrderDto } from "../general/Dtos";
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
        producto:mapToProductDto(productoPedido.producto),
        sizeProducto:  mapToCatalogTypeDto(productoPedido.sizeProducto),
        caracteristicas: (productoPedido.caracteristicas ? productoPedido.caracteristicas.split(',') : null),
        fechaRegistro:productoPedido.fechaRegistro,
        fechaActualizacion:productoPedido.fechaActualizacion,
        cantidad: productoPedido.cantidad,
        precio: productoPedido.precio
    }
}

export function mapToCatalogTypeDto(cat: CatalogTypeModel):CatalogTypeDto{
    if(!cat)
        return {
            id: 0,
            clave: '',
            descripcion: '',
            estatus: false,
            imagen: undefined,
            tags: '',
            selfDelete: undefined,
            selfUpdateEstatus: undefined
        }
    return {
        id: cat.id,
        clave: cat.clave,
        descripcion: cat.descripcion,
        estatus: cat.estatus,
        imagen: undefined,
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

export function mapToProductDto(product:ProductModel):CatalogTypeDto{
    return {
        id: product.id, 
        clave:product.clave,
        descripcion: product.descripcion,
        imagen: product.imagen,
        estatus: product.estatus,
        selfDelete: undefined,
        selfUpdateEstatus: undefined,
        tags:undefined
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

export function mapToProductRequestByCatalog(newRecord: CatalogTypeDto):CatalogTypeDto{
    return {
        id: newRecord.id,
        clave: newRecord.clave,
        descripcion: newRecord.descripcion,
        estatus: newRecord.estatus,
        imagen: newRecord.imagen ?? '',
        selfDelete: undefined,
        selfUpdateEstatus: undefined,
        tags: undefined,
    }   
}