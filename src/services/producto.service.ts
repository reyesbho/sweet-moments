import { DetailProductoDto, DetailProductoModel, ProductDto, ProductModel } from "../general/Interfaces";
import { API_PRODUCTO } from "../general/url";
import { mapToDetailProductDto, mapToProductDto,  } from "../utils/mapsToDto";

export const getProductos = async():Promise<ProductDto[]> => {
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


export const getDetalleProducto = async(idProducto: number):Promise<DetailProductoDto[]> => {
    try {
        let response = await  fetch(API_PRODUCTO+`/${idProducto}/producto`, {
            method: 'GET'
        });

        const productos = await response.json();
        return productos?.map(mapToDetailProductDto);

    }catch(error){
        throw new Error("Error al buscar los detalles")
    }
}
