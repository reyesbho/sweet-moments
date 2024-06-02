import {  CatalogTypeDto,  ClientDto,  ClienteModel,  ProductoTipoModel, SaborModel } from "../general/Interfaces";
import { API_CATALOGOS,  API_PRODUCTOS } from "../general/url";
import { mapToCatalogTypeDto, mapToClienteDto } from "../utils/mapsToDto";
export const getCatalogType = async({idProduct}:{idProduct:Number}):Promise<CatalogTypeDto[]> => {
    if (!idProduct) return [];
    try {
        const response = await fetch(API_PRODUCTOS+ `/${idProduct}/tipo`,
        {
            method:"GET",
        }
        );
        const tipos = await response.json();
        return tipos?.map((cat:ProductoTipoModel) => mapToCatalogTypeDto(cat));

    } catch (error) {
        throw new Error("Error al buscar los tipos");
    }
}


export const searchClient = async({search}:{search:String}):Promise<ClientDto[]> => {
    if (search === '') return [];

    try {
        const response = await fetch(API_CATALOGOS+ `/cliente?search=${search}`,
        {
            method:"GET",
        }
        );
        const clients = await response.json();
        return clients?.map((cliente:ClienteModel) => mapToClienteDto(cliente))

    } catch (error) {
        throw new Error("Error al buscar el nombre");
    }
}


export const getSabores = async():Promise<CatalogTypeDto[]> => {
    try {
        const response = await fetch(API_CATALOGOS+ `/sabor`,
        {
            method:"GET"
        }
        );
        const tipos = await response.json();
        return tipos?.map((cat: SaborModel) => mapToCatalogTypeDto(cat));

    } catch (error) {
        throw new Error("Error al buscar los sabores");
    }
}