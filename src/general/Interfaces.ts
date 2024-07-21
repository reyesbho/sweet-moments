export interface OrderDto{
    id:number,
    cliente:String,
    lugarEntrega: string,
    fechaEntrega : Date,
    horaEntrega: Date,
    register: string | null,
    status:String,
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
    status: string,
    completed: boolean;
}

export interface DetailProductoDto{
    id: number,
    producto:ProductDto,
    size: CatalogTypeDto,
    tipoCobro:CatalogTypeDto,
    descripcion: string,
    estatus: boolean,
    precio: number,
    imagen:string,
    comentarios:string
}


export interface DetailProductoRequest{
    idProducto:number,
    idSize: number,
    idTipoCobro:number,
    descripcion: string,
    precio: number,
    imagen:string
}

export interface DetailProductoModel{
    id: number,
    producto:ProductModel,
    size: CatalogTypeModel,
    tipoCobro:CatalogTypeModel,
    descripcion: string,
    comentarios: string,
    estatus: boolean,
    precio: number,
    imagen: string;
}

export interface PedidoModel{
    id: number;
    fechaEntrega: Date;
    horaEntrega: Date,
    lugarEntrega: string;
    estatus: String;
    total: number;
    fechaRegistro: Date | null;
    fechaActualizacion: Date | null;
    cliente: ClienteModel;
    numProductos: number;
    registradoPor: string | null;
}

export interface ClienteModel{
     id: number | null;
     nombre: String | undefined;
     apellidoPaterno: String;
     apellidoMaterno: String | null;
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
    estatus: string;
    imagen: string;
    completed: boolean;
}

export interface ProductRequest{
    clave: string;
    descripcion: string;
    estatus: string;
    imagen: string;
}

export interface CatalogTypeModel{
    id: number;
    clave: string;
    descripcion: string;
    estatus: string;
}

export interface Pagination{
    pageSize: Number;
    page: number;
    totalItems:number;
}


export interface ProductForm{
    quantity: number,
    comments: string,
    idDetailProduct: number,
    idFlavor:number ,
    idTypeProduct: number,
    descuento: number,
    total: number
}

export interface ProductFormRequest{
        idDetalleProducto:number,
        idSabor:number,
        idTipoProducto: number,
        comentarios:string,
        cantidad: number,
        total: number,
        descuento: number
}

export interface CatalogTypeDto{
    id: number;
    clave: string;
    descripcion: string;
    estatus: string;
    image: string | null,
    selfDelete: CallableFunction ;
    selfUpdateEstatus: CallableFunction;
}

export interface ClientDto{
    id: Number,
    name: string,
    apellidoPaterno: string,
    apellidoMaterno: string | null,
    direccion: string
}

export interface ClientOptionDto{
   value:Number;
   label:string;
   client: ClientDto;
}


export interface UserLogin{
    email?:String | null;
    password?:String | null;
}

export interface TokenResponse{
    token:String;
    expiresIn:Number;
}

export interface UserResponse{
    id: Number,
    user: String,
    email: String,
    fullName: String,
    password: String,
    enabled: boolean,
    accountNonExpired: boolean,
    credentialsNonExpired: boolean,
    authorities: null,
    username: String,
    accountNonLocked: boolean
}

export interface ErrorResponse {
    type: String,
    title: String,
    status: number,
    detail: String,
    instance: String,
    description: String
}


export interface ProductSelectDto{
    id: number, 
    key:string,
    nameProduct: string,
    thumbnail: string,
    status: string,
    isCheck:boolean;

}

export interface OrderInfo{
    idOrder: Number | undefined,
    cliente: String | undefined,
    lugarEntrega: string | undefined,
    fechaEntrega: Date | undefined,
}

export interface PedidoRequest{
    idPedido: Number | undefined,
    lugarEntrega: String | undefined,
    fechaEntrega: Date | undefined,
    cliente: ClienteModel
}