
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
    id: number ;
    nombre: string ;
    apellidoPaterno: string ;
    apellidoMaterno: string | null | undefined;
    direccion: string | undefined;
}

export interface  ProductoPedidoModel {
   id:number;
   idPedido:number;
   producto: ProductModel;
   sizeProducto: CatalogTypeModel;
   caracteristicas:string;
   fechaRegistro:Date;
   fechaActualizacion:Date;
   cantidad: number;
   precio: number;
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