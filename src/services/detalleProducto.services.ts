import { DetailProductoDto, DetailProductoModel, ProductDto, ProductModel } from "../general/Interfaces";
import { API_DETALLE_PRODUCTO } from "../general/url";
import { mapToDetailProductDto } from "../utils/mapsToDto";


export const getDetalleProductos = async ():Promise<DetailProductoDto[]> => {
    try {
        const response = await fetch(API_DETALLE_PRODUCTO,
            {
                method:"GET",
            });
        const data = await response.json();
        const {content} = data;
        return content?.map((producto:DetailProductoModel) => mapToDetailProductDto(producto))  

    } catch (error) {
        throw new Error("Error al buscar los productos");
    }
}