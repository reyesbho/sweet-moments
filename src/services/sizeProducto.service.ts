import {  CatalogTypeDto,  CatalogTypeModel } from "../general/Interfaces";
import { API_SIZE } from "../general/url";
import { mapToCatalogTypeDto } from "../utils/mapsToDto";

export const getSizeProductos = async():Promise<CatalogTypeDto[]> => {
    try {
        const response = await fetch(API_SIZE,
        {
            method:"GET"
        }
        );
        const tipos = await response.json();
        return tipos?.map((cat: CatalogTypeModel) => mapToCatalogTypeDto(cat));

    } catch (error) {
        throw new Error("Error al buscar los tamaños");
    }
}