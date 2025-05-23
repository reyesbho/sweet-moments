import { CatalogTypeDto } from "../general/Dtos";
import { CatalogTypeModel } from "../general/Models";
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

export const addSabor = async (catalog: CatalogTypeDto):Promise<CatalogTypeDto> => {
    try {
        const response = await fetch(API_SABOR,
        {
            method:"POST",
            body:JSON.stringify(catalog)
        }
        );
        const tipo = await response.json();
        return mapToCatalogTypeDto(tipo);

    } catch (error) {
        throw new Error("Error al agregar el sabor");
    }   
}