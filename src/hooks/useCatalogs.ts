import { useEffect, useState } from "react";
import { addSabor, deleteSabor, getSabores, updateStatusSabor } from "../services/sabor.service";
import { addSizeProduct, daleteSizeProduct, getSizeProductos, updateStatusSizeProduct } from "../services/sizeProducto.service";
import { addTipoProducto, deleteTipoProduct, getTipoProducto, updateStatusTipoProduct } from "../services/tipoProducto.service";
import { toast } from "react-toastify";
import { CatalogTypeDto } from "../general/Dtos";
import { CATALOGS } from "../general/Constants";


export function useCatalogs(){
    const [flavors, setFlavors] = useState<CatalogTypeDto[]>([]);
    const [sizes, setSizes] = useState<CatalogTypeDto[]>([]);
    const [typeProducts, setTypeProducts] = useState<CatalogTypeDto[]>([]);
    const [reload, setReload] = useState(false);
    
    
    const handleResponseDelete = (response: Response) => {
        if (response.status === 200) {
            toast.success("Eliminado correctamente.");
        }
        else if (response.status === 304) {
            toast.error("No se puede eliminar el registro.");
        }
    }

    const getFlavors = () => {
        getSabores()
        .then(resultCatalog => {
            resultCatalog.map((catalog: CatalogTypeDto) => {
                catalog.selfDelete = () => deleteSabor(catalog.id).then(handleResponseDelete).catch((error: Error) => toast.error(error.message));
                catalog.selfUpdateEstatus = (status: boolean) => updateStatusSabor(catalog.id, status).then(item => toast.success("Actualizado correctamente.")).catch(error => toast.error("Error al actualizar el registro."));
            })
            setFlavors(resultCatalog);})
            .catch((error: Error) => toast.error(error.message));
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

    const getTypeProduct = () => {
        getTipoProducto().then((listTipoProduc: CatalogTypeDto[])=> {
            listTipoProduc.map((catalog: CatalogTypeDto) => {
                catalog.selfDelete = () => deleteTipoProduct(catalog.id).then(handleResponseDelete).catch((error: Error) => toast.error(error.message));
                catalog.selfUpdateEstatus = (status: boolean) => updateStatusTipoProduct(catalog.id,status ).then(item => toast.success("Actualizado correctamente.")).catch(error => toast.error("Error al actualizar el registro."));
            })
            setTypeProducts(listTipoProduc);
        }).catch((error: Error) => toast.error(error.message));
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
        getFlavors();
        getsizes();
        getTypeProduct();
    },[reload])
    
    return {flavors, sizes, typeProducts, handleTogleReload, addNewRecord};
}