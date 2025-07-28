import { CatalogTypeDto } from "../general/Dtos";
import { Producto, Size } from "../general/interfaces/pedido";
import { API_SIZE } from "../general/url";

export const getSizeProductos = async({tag, estatus}:{tag?: string, estatus?:string}):Promise<CatalogTypeDto[]> => {
        try {
            const params = new URLSearchParams();

        if (tag) params.append("tag", tag);
        if (estatus) params.append("estatus", estatus);

        const query = params.toString();
        const url = `${API_SIZE}${query ? `?${query}` : ''}`;
        const response = await fetch(url,
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

export const updateStateSizeProduct = async(idSizeProduct:string) => {
    try {
        const response = await fetch(API_SIZE+`/${idSizeProduct}`,
        {
            method:"PUT"
        }
        );
        return response;

    } catch (error) {
        throw new Error("Error al eliminar el tamaño producto");
    }
}

export const updateSizeProduct = async(idSizeProduct:string, catalog: CatalogTypeDto):Promise<Producto> => {
    try {
        const response = await fetch(API_SIZE+`/${idSizeProduct}`,
        {
            method:"PATCH",
            body:JSON.stringify(catalog)
        }
        );
        const tipo:Producto = await response.json();
        return tipo;

    } catch (error) {
        throw new Error("Error al actualizar el tamaño producto");
    }
}


export const addSizeProduct = async (catalog: CatalogTypeDto):Promise<Size> => {
    try {
        const response = await fetch(API_SIZE,
        {
            method:"POST",
            body:JSON.stringify(catalog)
        }
        );
        if (!response.ok) {
            const responseErrors = await response.json();
            throw new Error(responseErrors.error[0].message || "Error al agregar el tamaño del producto");
        }
        const tipo:Size = await response.json();
        return tipo;

    } catch (error) {
        throw new Error("Error al agregar el tamaño del producto");
    }   
}