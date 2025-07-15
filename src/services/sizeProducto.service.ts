import { CatalogTypeDto } from "../general/Dtos";
import { CatalogTypeModel } from "../general/Models";
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
        return tipos;

    } catch (error) {
        throw new Error("Error al buscar los tamaños");
    }
}

export const daleteSizeProduct = async(idSizeProduct:string) => {
    try {
        const response = await fetch(API_SIZE+`/${idSizeProduct}`,
        {
            method:"DELETE"
        }
        );
        return response;

    } catch (error) {
        throw new Error("Error al eliminar el tamaño producto");
    }
}

export const updateStatusSizeProduct = async(idSizeProduct:string, estatus:boolean):Promise<CatalogTypeDto> => {
    try {
        const response = await fetch(API_SIZE+`/${idSizeProduct}/${estatus}`,
        {
            method:"PUT"
        }
        );
        const tipo = await response.json();
        return mapToCatalogTypeDto(tipo);

    } catch (error) {
        throw new Error("Error al actualizar el tamaño producto");
    }
}


export const addSizeProduct = async (catalog: CatalogTypeDto):Promise<CatalogTypeDto> => {
    try {
        const response = await fetch(API_SIZE,
        {
            method:"POST",
            body:JSON.stringify(catalog)
        }
        );
        const tipo = await response.json();
        return mapToCatalogTypeDto(tipo);

    } catch (error) {
        throw new Error("Error al agregar el tamaño del producto");
    }   
}