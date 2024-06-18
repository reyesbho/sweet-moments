export interface OrderDto{
    id:number,
    cliente:String,
    lugarEntrega: String,
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
    text:String,
    size:Number,
    comments: String,
    key: String,
    price: Number,
    product: DetailProductoDto;
    flavorId:number;
    tipoId:number;
    idOrder: number;
}

export interface ProductDto{
    id: number, 
    key:string,
    nameProduct: string,
    thumbnail: string,
    status: string
}

export interface DetailProductoDto{
        id: number,
        nameProduct: string,
        thumbnail: string,    
        type: string,
        flavor:string,
        key:string;
}

export interface PedidoModel{
    id: number;
    fechaEntrega: Date;
    horaEntrega: Date,
    lugarEntrega: String;
    estatus: String;
    total: number;
    fechaRegistro: Date | null;
    fechaActualizacion: Date | null;
    cliente: ClienteModel;
    numProductos: number;
    registradoPor: string | null;
}

export interface ClienteModel{
     id: number;
     nombre: String;
     apellidoPaterno: String;
     apellidoMaterno: String | null;
     direccion: String;
}

export interface  ProductoPedidoModel{
    id: number;
    idPedido: Number;
    producto: ProductModel;
    sabor: SaborModel;
    tipoProducto: ProductoTipoModel;
    texto: String;
    comentarios: String;
    fechaRegistro: Date;
    fechaActualizacion: Date;
    porciones: Number;
    precio: number;
}


export interface ProductModel{
    id: number;
    clave: string;
    descripcion: string;
    estatus: string;
    imagen: string;
    cobroUnidad: boolean;
}

export interface SaborModel{
    id: number;
    clave: string;
    descripcion: string;
    estatus: string;
}

export interface ProductoTipoModel{
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
    text: string,
    size: number,
    tipoId: number,
    flavorId: number,
    comments: String,
    price:number
}

export interface CatalogTypeDto{
    value: string;
    label: string;
    id: Number;
}

export interface ClientDto{
    id: Number,
    name: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
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