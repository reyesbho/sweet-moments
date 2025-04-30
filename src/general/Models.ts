
export interface DetailProductoModel{
    id: number,
    producto:ProductModel,
    size: CatalogTypeModel,
    sabor:CatalogTypeModel,
    tipoProducto:CatalogTypeModel,
    descripcion: string,
    comentarios: string,
    estatus: boolean,
    precio: number,
    imagen: string;
}

export interface PedidoModel{
    id: number;
    fechaEntrega: Date;
    lugarEntrega: string;
    estatus: string;
    total: number;
    fechaRegistro: Date | null;
    fechaActualizacion: Date | null;
    cliente: ClienteModel;
    numProductos: number;
    registradoPor: string | null;
}


export interface ClienteModel{
    id: number | undefined;
    nombre: string | undefined;
    apellidoPaterno: string | undefined;
    apellidoMaterno: string | null | undefined;
    direccion: string | undefined;
}

export interface  ProductoPedidoModel {
   id:number,
   idPedido:number,
   detalleProducto:DetailProductoModel,
   sabor: CatalogTypeModel,
   tipoProducto: CatalogTypeModel,
   comentarios:String,
   fechaRegistro:Date,
   fechaActualizacion:Date,
   cantidad: number,
   total: number,
   descuento: number
}


export interface ProductModel{
    id: number;
    clave: string;
    descripcion: string;
    estatus: boolean;
    imagen: string;
    completed: boolean;
}


export interface CatalogTypeModel{
    id: number;
    clave: string;
    descripcion: string;
    estatus: boolean;
    tags: string;
}