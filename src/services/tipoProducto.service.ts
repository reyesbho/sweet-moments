import {  CatalogTypeDto, CatalogTypeModel } from "../general/Interfaces";
import { API_TIPO_PRODUCTO } from "../general/url";
import { mapToCatalogTypeDto,  } from "../utils/mapsToDto";

export const getTipoProducto = async():Promise<CatalogTypeDto[]> => {
    try {
        const response = await fetch(API_TIPO_PRODUCTO,
        {
            method:"GET"
        }
        );
        const tipos = await response.json();
        return tipos?.map((cat: CatalogTypeModel) => mapToCatalogTypeDto(cat));

    } catch (error) {
        throw new Error("Error al buscar los tipos de producto");
    }
}