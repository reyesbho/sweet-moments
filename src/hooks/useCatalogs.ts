import { useState, useCallback } from "react";
import { addSizeProduct,  getSizeProductos, updateStateSizeProduct } from "../services/sizeProducto.service";
import { toast } from "react-toastify";
import { CatalogTypeDto } from "../general/Dtos";

export function useCatalogs(){
    const [sizes, setSizes] = useState<CatalogTypeDto[]>([]);
    const [loading, setLoading] = useState(false);
    
    const handleResponseUpdate = (response: Response) => {
        if (response.status === 200) {
            toast.success("Actualizado correctamente.");
        }
        else if (response.status === 304) {
            toast.error("No se puede actualizar el registro.");
        }
    }

    const getsizes = useCallback(() => {
        setLoading(true);
        getSizeProductos({}).then((listSize: CatalogTypeDto[])=>{
            listSize.forEach((size: CatalogTypeDto) => {
                size.selfUpdateEstatus = () => updateStateSizeProduct(size.id).then(handleResponseUpdate).catch((error: Error) => toast.error(error.message));
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
                size.selfUpdateEstatus = () => updateStateSizeProduct(size.id).then(handleResponseUpdate).catch((error: Error) => toast.error(error.message));
            })
            setSizes(listSize);
        })
        .catch((error: Error) => toast.error(error.message))
        .finally(() => setLoading(false));
    }, []);

    const addNewSize = useCallback(async (newRecord: CatalogTypeDto) => {
        setLoading(true);
        try {
            await addSizeProduct(newRecord);
            toast.success("Registrado correctamente.");
            setLoading(false);
            return { success: true };
        } catch (error: any) {
            toast.error(error.message);
            setLoading(false);
            return { success: false, error: error.message };
        }
    }, []);
    
    return {sizes,addNewSize, getsizes, getsizesActives, loading};
}