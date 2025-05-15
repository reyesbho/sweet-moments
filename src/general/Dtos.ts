export interface OrderDto{
    id:number,
    cliente:ClientDto,
    lugarEntrega: string,
    fechaEntrega : Date,
    register: string | null,
    status:string,
    numProducts: number,
    total: number,
    registerDate:Date | null,
    updateDate: Date | null,
}

export interface ProductOrderDto{
    id:number,
    idPedido:number,
    producto: CatalogTypeDto,
    sizeProducto: CatalogTypeDto,
    caracteristicas:string[] | null,
    fechaRegistro:Date,
    fechaActualizacion:Date,
    cantidad:number,
    precio: number,
}


export interface DetailProductoDto{
    id: number,
    producto:CatalogTypeDto,
    size: CatalogTypeDto,
    sabor:CatalogTypeDto,
    tipoProducto:CatalogTypeDto,
    descripcion: string,
    estatus: boolean,
    precio: number,
    imagen:string,
    comentarios:string
}


export interface CatalogTypeDto{
    id: number;
    clave: string;
    descripcion: string;
    estatus: boolean;
    imagen: string | undefined,
    selfDelete: CallableFunction | undefined ;
    selfUpdateEstatus: CallableFunction | undefined;
    tags: string | undefined;
}

export interface ClientDto{
    id: number,
    name: string,
    apellidoPaterno: string,
    apellidoMaterno: string | null | undefined,
    direccion: string | undefined
}
