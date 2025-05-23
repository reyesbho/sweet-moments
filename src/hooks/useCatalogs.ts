import { useEffect, useState } from "react";
import { addSabor, deleteSabor, getSabores, updateStatusSabor } from "../services/sabor.service";
import { addSizeProduct, daleteSizeProduct, getSizeProductos, updateStatusSizeProduct } from "../services/sizeProducto.service";
import { addTipoProducto, deleteTipoProduct, getTipoProducto, updateStatusTipoProduct } from "../services/tipoProducto.service";
import { toast } from "react-toastify";
import { CatalogTypeDto } from "../general/Dtos";
import { CATALOGS } from "../general/Constants";


export function useCatalogs(){
    const [sizes, setSizes] = useState<CatalogTypeDto[]>([]);
    const [reload, setReload] = useState(false);
    
    
    const handleResponseDelete = (response: Response) => {
        if (response.status === 200) {
            toast.success("Eliminado correctamente.");
        }
        else if (response.status === 304) {
            toast.error("No se puede eliminar el registro.");
        }
    }

    const getsizes = () => {
        getSizeProductos().then((listSize: CatalogTypeDto[])=>{
            listSize.map((size: CatalogTypeDto) => {
                size.selfDelete = () => daleteSizeProduct(size.id).then(handleResponseDelete).catch((error: Error) => toast.error(error.message));
                size.selfUpdateEstatus = (status: boolean) => updateStatusSizeProduct(size.id, status).then(item => toast.success("Actualizado correctamente.")).catch(error => toast.error("Error al actualizar el registro."));
            })
            setSizes(listSize);
        })
        .catch((error: Error) => toast.error(error.message));
    }

    const addNewRecord = (catalog:String, newRecord: CatalogTypeDto) => {
        if(catalog === CATALOGS.flavor){
            addSabor(newRecord).then(() => {
                setReload(!reload);
                toast.success("Registrado correctamente.");
            }).catch((error: Error) => toast.error(error.message));
        }
        if(catalog === CATALOGS.typeProduct){
            addTipoProducto(newRecord).then(() => {
                setReload(!reload);
                toast.success("Registrado correctamente.");
            }).catch((error: Error) => toast.error(error.message));
        }
        if(catalog === CATALOGS.sizeProduct){
            addSizeProduct(newRecord).then(() => {
                setReload(!reload);
                toast.success("Registrado correctamente.");
            }).catch((error: Error) => toast.error(error.message));
        }
    }
    
    const handleTogleReload = () => {
        setReload(!reload);
    }

    useEffect(()=>{
        getsizes();
    },[reload])
    
    return {sizes,handleTogleReload, addNewRecord};
}