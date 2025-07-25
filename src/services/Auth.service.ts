import { LoginError } from "../config/Errors";
import { TokenResponse, UserLogin, UserResponse } from "../general/interfaces/Generals";
import { API_AUTH } from "../general/url";

export const login = async(userLogin: UserLogin):Promise<TokenResponse> => {
    try{
        const response = await fetch(API_AUTH+`/login`,{
            method:"POST",
            body:JSON.stringify(userLogin)
        });

        if(!response.ok || response.status != 200){
            throw new LoginError("Usuario o contraseña invalido")
        }
        const data = await response?.json();
        return data;

    } catch (error) {
        if(error instanceof LoginError){
            throw error;
        }
        console.log(error)
        throw new Error("Error al intentar logearse")
    }
}

export const logout = async() => {
    try{
         await fetch(API_AUTH+`/logout`,{
            method:"POST",
        });

    } catch (error) {
        console.log(error)
    }
}

export const getUser = async():Promise<UserResponse> => {
    try{
        const res = await fetch(API_AUTH+`/user`,{
            method:"GET",
        });
        const data = await res?.json();
        return data;
    } catch (error) {
        throw new Error("Error al buscar datos del usuario")
    }
}