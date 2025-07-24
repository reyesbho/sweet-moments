import { CatalogTypeDto } from "../general/Dtos";
import { CatalogTypeModel, ProductModel, ProductoPedidoModel } from "../general/Models";


export function mapToCatalogTypeDto(cat: CatalogTypeModel):CatalogTypeDto{
    if(!cat)
        return {
            id: '',
            descripcion: '',
            estatus: false,
            tags: [],
            selfDelete: undefined,
            selfUpdateEstatus: undefined
        }
    return {
        id: String(cat.id),
        descripcion: cat.descripcion,
        estatus: cat.estatus,
        tags: cat.tags ? cat.tags.split(',') : [],
        selfDelete: () => {},
        selfUpdateEstatus: () => {}
    }
}

export function mapToProductDto(product:ProductModel):CatalogTypeDto{
    return {
        id: String(product.id),
        descripcion: product.descripcion,
        estatus: product.estatus,
        tags: [],
        selfDelete: undefined,
        selfUpdateEstatus: undefined
    }
}

export function mapToProductRequestByCatalog(newRecord: CatalogTypeDto):CatalogTypeDto{
    return {
        id: String(newRecord.id),
        descripcion: newRecord.descripcion,
        estatus: newRecord.estatus,
        tags: newRecord.tags ?? [],
        selfDelete: undefined,
        selfUpdateEstatus: undefined,
    }   
}