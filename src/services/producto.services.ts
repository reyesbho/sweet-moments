import { ProductoResponse } from "../general/Interfaces";
import { API_PRODUCTOS } from "../general/url";


export const getProductos = async () => {
    try {
        const response = await fetch(API_PRODUCTOS,
            {
                method:"GET",
            });
        const data = await response.json();
        const {content} = data;
        return content?.map((producto:ProductoResponse) => (
            {
                id: producto.id, 
                key:producto.clave,
                nameProduct: producto.descripcion,
                thumbnail: producto.imagen,
                status: producto.estatus
           }
        ))  

    } catch (error) {
        throw new Error("Error al buscar los productos");
    }
}

export const getProducto = async ({id}:{id:number}) => {
    try {
        const response = await fetch(API_PRODUCTOS+ `/${id}`,
        {
            method:"GET",
        }
        );
        const producto = await response.json();
        return {
            id: producto.id, 
            key:producto.clave,
            nameProduct: producto.descripcion,
            thumbnail: producto.imagen,
            status: producto.estatus
       }

    } catch (error) {
        throw new Error("Error al buscar el producto");
    }
}