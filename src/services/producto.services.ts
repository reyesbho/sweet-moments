import { ProductDto, ProductModel } from "../general/Interfaces";
import { API_PRODUCTOS } from "../general/url";
import { mapToProductDto } from "../utils/mapsToDto";


export const getProductos = async ():Promise<ProductDto[]> => {
    try {
        const response = await fetch(API_PRODUCTOS,
            {
                method:"GET",
            });
        const data = await response.json();
        const {content} = data;
        return content?.map((producto:ProductModel) => mapToProductDto(producto))  

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
        return mapToProductDto(producto);

    } catch (error) {
        throw new Error("Error al buscar el producto");
    }
}