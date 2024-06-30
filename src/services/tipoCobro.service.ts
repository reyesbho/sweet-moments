import {  CatalogTypeDto,  CatalogTypeModel} from "../general/Interfaces";
import { API_TIPO_COBRO } from "../general/url";
import { mapToCatalogTypeDto } from "../utils/mapsToDto";


export const getTipoCobro = async():Promise<CatalogTypeDto[]> => {
    try {
        const response = await fetch(API_TIPO_COBRO,
        {
            method:"GET"
        }
        );
        const tipos = await response.json();
        return tipos?.map((cat: CatalogTypeModel) => mapToCatalogTypeDto(cat));

    } catch (error) {
        throw new Error("Error al buscar los tipos de cobro");
    }
}