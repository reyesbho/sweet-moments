import { API_AUTH, API_PRIVATE } from "../general/url";

export const getUrl = async() => {
    try{
        const res = await fetch(API_AUTH+`/url`);
        const data = await res.json();
        return data;
    } catch (error) {
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

export const getUser = async() => {
    try{
        const res = await fetch(API_PRIVATE+`/user`,{
            method:"GET",
        });
        const data = await res?.json();
        return data;
    } catch (error) {
        throw new Error("Error al buscar los pedidos")
    }
}