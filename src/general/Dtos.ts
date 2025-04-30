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
    detalleProducto:DetailProductoDto,
    sabor: CatalogTypeDto | null,
    tipoProducto: CatalogTypeDto | null,
    comentarios:String,
    fechaRegistro:Date,
    fechaActualizacion:Date,
    cantidad:number,
    total: number,
    descuento: number
}

export interface ProductDto{
    id: number, 
    key:string,
    nameProduct: string,
    thumbnail: string,
    status: boolean,
    completed: boolean;
}

export interface DetailProductoDto{
    id: number,
    producto:ProductDto,
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
    image: string | null,
    selfDelete: CallableFunction ;
    selfUpdateEstatus: CallableFunction;
    tags: string | null;
}

export interface ClientDto{
    id: number,
    name: string,
    apellidoPaterno: string,
    apellidoMaterno: string | null,
    direccion: string
}
