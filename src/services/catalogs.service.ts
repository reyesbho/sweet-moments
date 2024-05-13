import {  CatalogType, Client, ClienteResponse, ProductoTipoResponse, SaborResponse } from "../general/Interfaces";
import { API_CATALOGOS,  API_PRODUCTOS } from "../general/url";
export const getCatalogType = async({idProduct}:{idProduct:Number}):Promise<CatalogType[]> => {
    if (!idProduct) return [];
    try {
        const response = await fetch(API_PRODUCTOS+ `/${idProduct}/tipo`);
        const tipos = await response.json();
        return tipos?.map((cat:ProductoTipoResponse) => ({
            value: cat.id,
            label: cat.descripcion
        }));

    } catch (error) {
        throw new Error("Error al buscar los tipos");
    }
}


export const searchClient = async({search}:{search:String}):Promise<Client[]> => {
    if (search === '') return [];

    try {
        const response = await fetch(API_CATALOGOS+ `/cliente?search=${search}`);
        const clients = await response.json();
        return clients?.map((cliente:ClienteResponse) => ({
            id: cliente.id,
            name: cliente.nombre,
            apellidoPaterno: cliente.apellidoPaterno,
            apellidoMaterno: cliente.apellidoMaterno,
            direccion: cliente.direccion
        }))

    } catch (error) {
        throw new Error("Error al buscar el nombre");
    }
}


export const getSabores = async():Promise<CatalogType[]> => {
    try {
        const response = await fetch(API_CATALOGOS+ `/sabor`);
        const tipos = await response.json();
        return tipos?.map((cat: SaborResponse) => ({
            value: cat.id,
            label: cat.descripcion
        }));

    } catch (error) {
        throw new Error("Error al buscar los sabores");
    }
}