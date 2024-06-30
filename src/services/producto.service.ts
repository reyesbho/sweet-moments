import { ProductDto, ProductModel } from "../general/Interfaces";
import { API_PRODUCTO } from "../general/url";
import { mapToProductDto,  } from "../utils/mapsToDto";

export const getProducto = async():Promise<ProductDto[]> => {
    try {
        const response = await fetch(API_PRODUCTO,
        {
            method:"GET",
        }
        );
        const tipos = await response.json();
        return tipos?.map((cat:ProductModel) => mapToProductDto(cat));

    } catch (error) {
        throw new Error("Error al buscar los productos");
    }
}
