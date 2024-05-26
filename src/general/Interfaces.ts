export interface Order{
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

export interface Product{
    id:number,
    text:String,
    size:Number,
    comments: String,
    key: String,
    price: Number,
    product: DetailProducto;
}

export interface DetailProducto{
        id: number,
        nameProduct: string,
        thumbnail: string,    
        type: String,
        flavor:String,
}

export interface Pedido{
    id: number;
    fechaEntrega: Date;
    horaEntrega: Date,
    lugarEntrega: String;
    estatus: String;
    total: number;
    fechaRegistro: Date | null;
    fechaActualizacion: Date | null;
    cliente: ClienteResponse;
    numProductos: number;
    registradoPor: string | null;
}

export interface ClienteResponse{
     id: number;
     nombre: String;
     apellidoPaterno: String;
     apellidoMaterno: String | null;
     direccion: String;
}

export interface ProductoPedido{
    id: number;
    idPedido: Number;
    producto: ProductoResponse;
    sabor: SaborResponse;
    tipoProducto: ProductoTipoResponse;
    texto: String;
    comentarios: String;
    fechaRegistro: Date;
    fechaActualizacion: Date;
    porciones: Number;
    precio: Number;
}


export interface ProductoResponse{
    id: number;
    clave: String;
    descripcion: string;
    estatus: String;
    imagen: string;
    cobroUnidad: boolean;
}

export interface SaborResponse{
    id: number;
    clave: String;
    descripcion: String;
    estatus: String;
}

export interface ProductoTipoResponse{
    id: number;
    clave: String;
    descripcion: String;
    estatus: String;
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

export interface CatalogType{
    value: string;
    label: string;
    id: Number;
}

export interface Client{
    id: Number,
    name: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    direccion: string
}

export interface ClientOption{
   value:Number;
   label:string;
   client: Client;
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
