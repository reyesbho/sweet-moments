
import { Dayjs } from "dayjs";

export interface Pagination{
    pageSize: Number;
    page: number;
    totalItems:number;
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


export interface OrderInfo{
    id: string | undefined,
    cliente: string,
    lugarEntrega: string,
    fechaEntrega: Dayjs,
}
