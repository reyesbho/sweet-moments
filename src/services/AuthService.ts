import { API_AUTH, API_PRIVATE } from "../general/url";

export const getUrl = async() => {
    try{
        const res = await fetch(API_AUTH+`/url`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
        throw new Error("Error al obtener la URL")
    }
}

export const getToken = async(code:string) => {
    try{
        const res = await fetch(API_AUTH+`/callback?code=${code}`);
        const data = await res?.json();
        return data;
    } catch (error) {
        throw new Error("Error al buscar los pedidos")
    }
}

export const getUser = async(token:string) => {
    try{
        const res = await fetch(API_PRIVATE+`/user`,{
            method:"GET",
            headers:{
                "Authorization":"Bearer "+token
            }
        });
        const data = await res?.json();
        return data;
    } catch (error) {
        throw new Error("Error al buscar datos del usuario")
    }
}