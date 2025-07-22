import { useState, useCallback } from "react";
import { addSizeProduct,  getSizeProductos, updateStateSizeProduct } from "../services/sizeProducto.service";
import { toast } from "react-toastify";
import { CatalogTypeDto } from "../general/Dtos";

export function useCatalogs(){
    const [sizes, setSizes] = useState<CatalogTypeDto[]>([]);
    const [loading, setLoading] = useState(false);
    
    const handleResponseDelete = (response: Response) => {
        if (response.status === 200) {
            toast.success("Eliminado correctamente.");
        }
        else if (response.status === 304) {
            toast.error("No se puede eliminar el registro.");
        }
    }

    const getsizes = useCallback(() => {
        setLoading(true);
        getSizeProductos({}).then((listSize: CatalogTypeDto[])=>{
            listSize.forEach((size: CatalogTypeDto) => {
                size.selfUpdateEstatus = () => updateStateSizeProduct(size.id).then(handleResponseDelete).catch((error: Error) => toast.error(error.message));
            })
            setSizes(listSize);
        })
        .catch((error: Error) => toast.error(error.message))
        .finally(() => setLoading(false));
    }, []);

    const getsizesActives = useCallback(({tag}:{tag:string}) => {
        setLoading(true);
        getSizeProductos({tag, estatus: 'ACTIVO'}).then((listSize: CatalogTypeDto[])=>{
            listSize.forEach((size: CatalogTypeDto) => {
                size.selfUpdateEstatus = () => updateStateSizeProduct(size.id).then(handleResponseDelete).catch((error: Error) => toast.error(error.message));
            })
            setSizes(listSize);
        })
        .catch((error: Error) => toast.error(error.message))
        .finally(() => setLoading(false));
    }, []);

    const addNewSize = useCallback(async (newRecord: CatalogTypeDto) => {
        try {
            await addSizeProduct(newRecord);
            toast.success("Registrado correctamente.");
            return { success: true };
        } catch (error: any) {
            toast.error(error.message);
            return { success: false, error: error.message };
        }
    }, []);
    
    return {sizes,addNewSize, getsizes, getsizesActives, loading};
}