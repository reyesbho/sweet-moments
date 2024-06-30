import {  CatalogTypeDto,  CatalogTypeModel } from "../general/Interfaces";
import { API_SABOR } from "../general/url";
import { mapToCatalogTypeDto} from "../utils/mapsToDto";


export const getSabores = async():Promise<CatalogTypeDto[]> => {
    try {
        const response = await fetch(API_SABOR,
        {
            method:"GET"
        }
        );
        const tipos = await response.json();
        return tipos?.map((cat: CatalogTypeModel) => mapToCatalogTypeDto(cat));

    } catch (error) {
        throw new Error("Error al buscar los sabores");
    }
}