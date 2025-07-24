import { CatalogTypeDto } from "../general/Dtos";
import { Producto } from "../general/interfaces/pedido.js";
import { API_PRODUCTO } from "../general/url";
import { mapToProductDto } from "../utils/mapsToDto";

export const getProductos = async():Promise<Producto[]> => {
    try {
        const response = await fetch(API_PRODUCTO,
        {
            method:"GET",
        }
        );
        const tipos:Producto[] = await response.json();
        return tipos;

    } catch (error) {
        throw new Error("Error al buscar los productos");
    }
}


export const deleteProducto = async(idProducto:string) => {
    try {
        const response = await fetch(API_PRODUCTO+`/${idProducto}`,
        {
            method:"DELETE"
        }
        );
        return response;

    } catch (error) {
        throw new Error("Error al eliminar el producto");
    }
}


export const addProducto = async (catalog: CatalogTypeDto):Promise<CatalogTypeDto> => {
    try {
        const response = await fetch(API_PRODUCTO,
        {
            method:"POST",
            body:JSON.stringify(catalog)
        }
        );
        const tipo = await response.json();
        return mapToProductDto(tipo);

    } catch (error) {
        throw new Error("Error al agregar el sabor");
    }   
}

export const updateProducto = async (catalog: CatalogTypeDto):Promise<CatalogTypeDto> => {
    try {
        const response = await fetch(API_PRODUCTO,
        {
            method:"PATCH",
            body:JSON.stringify(catalog)
        }
        );
        const tipo = await response.json();
        return mapToProductDto(tipo);

    } catch (error) {
        throw new Error("Error al agregar el sabor");
    } 
}