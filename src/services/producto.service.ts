import { DetailProductoDto, ProductDto } from "../general/Dtos";
import { ProductRequest } from "../general/Interfaces";
import { ProductModel } from "../general/Models";
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


export const deleteProducto = async(idProducto:number) => {
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

export const updateStatusProducto = async(idProducto:number, estatus:boolean):Promise<ProductDto> => {
    try {
        const response = await fetch(API_PRODUCTO+`/${idProducto}/${estatus}`,
        {
            method:"PUT"
        }
        );
        const tipo = await response.json();
        return mapToProductDto(tipo);

    } catch (error) {
        throw new Error("Error al actualizar el producto");
    }
}

export const addProducto = async (catalog: ProductRequest):Promise<ProductDto> => {
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


export const getDetalleProducto = async(idProducto: number):Promise<DetailProductoDto[]> => {
    try {
        let response = await  fetch(API_PRODUCTO+`/${idProducto}/producto`, {
            method: 'GET'
        });

        const productos = await response.json();
        return productos?.map(mapToDetailProductDto);

    }catch(error){
        console.log(error);
        throw new Error("Error al buscar los detalles")
    }
}
