import { CatalogTypeDto } from "../general/Dtos";
import { CatalogTypeModel } from "../general/Models";
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

export const deleteTipoCobro = async(idTipoCobro:number) => {
    try {
        const response = await fetch(API_TIPO_COBRO+`/${idTipoCobro}`,
        {
            method:"DELETE"
        }
        );
        return response;

    } catch (error) {
        throw new Error("Error al eliminar el tipo de cobro");
    }
}

export const updateStatusTipoCobro = async(idTipoCobro:number, estatus:boolean):Promise<CatalogTypeDto> => {
    try {
        const response = await fetch(API_TIPO_COBRO+`/${idTipoCobro}/${estatus}`,
        {
            method:"PUT"
        }
        );
        const tipo = await response.json();
        return mapToCatalogTypeDto(tipo);

    } catch (error) {
        throw new Error("Error al actualizar el tipo de cobro");
    }
}

export const addTipoCobro = async (catalog: CatalogTypeDto):Promise<CatalogTypeDto> => {
    try {
        const response = await fetch(API_TIPO_COBRO,
        {
            method:"POST",
            body:JSON.stringify(catalog)
        }
        );
        const tipo = await response.json();
        return mapToCatalogTypeDto(tipo);

    } catch (error) {
        throw new Error("Error al agregar el tipo de cobro");
    }   
}