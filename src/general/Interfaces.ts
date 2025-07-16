
import { Dayjs } from "dayjs";
import { ClientDto } from "./Dtos";
import { ClienteModel } from "./Models";

export interface DetailProductoRequest{
    idProducto:number,
    idSize: number,
    idTipoCobro:number,
    descripcion: string,
    precio: number,
    imagen:string
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
        idProducto:number,
        idSize:number,
        caracteristicas:string,
        cantidad: number,
        precio: number,
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
    id: string | undefined,
    cliente: string,
    lugarEntrega: string,
    fechaEntrega: Dayjs,
}

export interface PedidoRequest{
    idPedido: number | undefined,
    lugarEntrega: string | undefined,
    fechaEntrega: number ,
    cliente: ClienteModel
}