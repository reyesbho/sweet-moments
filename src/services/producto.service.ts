import { CatalogTypeDto } from "../general/Dtos";
import { Producto } from "../general/interfaces/pedido.js";
import { API_PRODUCTO } from "../general/url";

export const getProductos = async(status?:string):Promise<Producto[]> => {
    try {
        const response = await fetch(API_PRODUCTO+(status ? `?estatus=${status}`:''),
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

export const updateStateProduct = async(id:string) => {
    try {
        const response = await fetch(API_PRODUCTO+`/${id}`,
        {
            method:"PUT"
        }
        );
        return response;

    } catch (error) {
        throw new Error("Error al eliminar el tamaño producto");
    }
}

export const addProducto = async (catalog: CatalogTypeDto):Promise<Producto> => {
    try {
        const response = await fetch(API_PRODUCTO,
        {
            method:"POST",
            body:JSON.stringify(catalog)
        }
        );
        if (!response.ok) {
            const responseErrors = await response.json();
            throw new Error(responseErrors.error[0].message || "Error al agregar el producto");
        }
        const producto:Producto = await response.json();
        return producto;

    } catch (error) {
        throw new Error("Error al agregar el producto");
    }   
}

export const updateProducto = async (catalog: CatalogTypeDto):Promise<Producto> => {
    try {
        const response = await fetch(API_PRODUCTO,
        {
            method:"PATCH",
            body:JSON.stringify(catalog)
        }
        );
        const tipo:Producto = await response.json();
        return tipo;

    } catch (error) {
        throw new Error("Error al agregar el sabor");
    } 
}