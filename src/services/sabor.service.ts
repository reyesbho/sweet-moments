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


export const deleteSabor = async(idSabor:number) => {
    try {
        const response = await fetch(API_SABOR+`/${idSabor}`,
        {
            method:"DELETE"
        }
        );
        return response;

    } catch (error) {
        throw new Error("Error al eliminar el sabores");
    }
}

export const updateStatusSabor = async(idSabor:number, estatus:boolean):Promise<CatalogTypeDto> => {
    try {
        const response = await fetch(API_SABOR+`/${idSabor}/${estatus}`,
        {
            method:"PUT"
        }
        );
        const tipo = await response.json();
        return mapToCatalogTypeDto(tipo);

    } catch (error) {
        throw new Error("Error al actualizar el sabor");
    }
}