import { useState } from "react";
import { addSizeProduct,  getSizeProductos, updateStateSizeProduct } from "../services/sizeProducto.service";
import { toast } from "react-toastify";
import { CatalogTypeDto } from "../general/Dtos";
import { CATALOGS } from "../general/Constants";


export function useCatalogs(){
    const [sizes, setSizes] = useState<CatalogTypeDto[]>([]);
    
    
    const handleResponseDelete = (response: Response) => {
        if (response.status === 200) {
            toast.success("Eliminado correctamente.");
        }
        else if (response.status === 304) {
            toast.error("No se puede eliminar el registro.");
        }
    }

    const getsizes = () => {
        getSizeProductos({}).then((listSize: CatalogTypeDto[])=>{
            listSize.map((size: CatalogTypeDto) => {
                size.selfUpdateEstatus = () => updateStateSizeProduct(size.id).then(handleResponseDelete).catch((error: Error) => toast.error(error.message));
            })
            setSizes(listSize);
        })
        .catch((error: Error) => toast.error(error.message));
    }

    const getsizesActives = ({tag}:{tag:string}) => {
        getSizeProductos({tag, estatus: 'ACTIVO'}).then((listSize: CatalogTypeDto[])=>{
            listSize.map((size: CatalogTypeDto) => {
                size.selfUpdateEstatus = () => updateStateSizeProduct(size.id).then(handleResponseDelete).catch((error: Error) => toast.error(error.message));
            })
            setSizes(listSize);
        })
        .catch((error: Error) => toast.error(error.message));
    }

    const addNewSize = (newRecord: CatalogTypeDto) => {
            addSizeProduct(newRecord).then(() => {
                toast.success("Registrado correctamente.");
            }).catch((error: Error) => toast.error(error.message));
    }
    

    
    return {sizes,addNewSize, getsizes, getsizesActives};
}