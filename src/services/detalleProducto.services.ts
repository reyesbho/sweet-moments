import { DetailProductoDto, DetailProductoModel } from "../general/Interfaces";
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


export const deleteDetalleProducto = async(idDetalleProducto:number) => {
    try {
        const response = await fetch(API_DETALLE_PRODUCTO+`/${idDetalleProducto}`,
        {
            method:"DELETE"
        }
        );
        return response;

    } catch (error) {
        throw new Error("Error al eliminar el detalle del producto");
    }
}

export const updateStatusDetalleProducto = async(idDetalleProducto:number, estatus:boolean):Promise<DetailProductoDto> => {
    try {
        const response = await fetch(API_DETALLE_PRODUCTO+`/${idDetalleProducto}/${estatus}`,
        {
            method:"PUT"
        }
        );
        const tipo = await response.json();
        return mapToDetailProductDto(tipo);

    } catch (error) {
        throw new Error("Error al actualizar el detalle del producto");
    }
}
