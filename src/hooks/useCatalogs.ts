import { useEffect, useState } from "react";
import { addSabor, deleteSabor, getSabores, updateStatusSabor } from "../services/sabor.service";
import { CatalogTypeDto } from "../general/Interfaces";
import { addSizeProduct, daleteSizeProduct, getSizeProductos, updateStatusSizeProduct } from "../services/sizeProducto.service";
import { addTipoProducto, deleteTipoProduct, getTipoProducto, updateStatusTipoProduct } from "../services/tipoProducto.service";
import { addTipoCobro, deleteTipoCobro, getTipoCobro, updateStatusTipoCobro } from "../services/tipoCobro.service";
import { CATALOGS } from "../general/Constants";
import { addProducto, deleteProducto, getProductos, updateStatusProducto } from "../services/producto.service";
import { mapToProductRequestByCatalog } from "../utils/mapsToDto";
import { toast } from "react-toastify";


export function useCatalogs(){
    const [flavors, setFlavors] = useState<CatalogTypeDto[]>([]);
    const [sizes, setSizes] = useState<CatalogTypeDto[]>([]);
    const [typeProducts, setTypeProducts] = useState<CatalogTypeDto[]>([]);
    const [typePayments, setTypePayments] = useState<CatalogTypeDto[]>([]);
    const [products, setProducts] = useState<CatalogTypeDto[]>([]);
    const [reload, setReload] = useState(false);
    
    
    const getFlavors = () => {
        getSabores()
        .then(resultCatalog => {
            resultCatalog.map((catalog: CatalogTypeDto) => {
                catalog.selfDelete = () => deleteSabor(catalog.id).then(item => toast.success("Eliminado correctamente.")).catch((error: Error) => toast.error(error.message));
                catalog.selfUpdateEstatus = (status: boolean) => updateStatusSabor(catalog.id, status).then(item => toast.success("Actualizado correctamente.")).catch(error => toast.error("Error al actualizar el registro."));
            })
            setFlavors(resultCatalog);})
            .catch((error: Error) => toast.error(error.message));
    }

    const getsizes = () => {
        getSizeProductos().then((listSize: CatalogTypeDto[])=>{
            listSize.map((size: CatalogTypeDto) => {
                size.selfDelete = () => daleteSizeProduct(size.id).then(item => toast.success("Eliminado correctamente.")).catch((error: Error) => toast.error(error.message));
                size.selfUpdateEstatus = (status: boolean) => updateStatusSizeProduct(size.id, status).then(item => toast.success("Actualizado correctamente.")).catch(error => toast.error("Error al actualizar el registro."));
            })
            setSizes(listSize);
        })
        .catch((error: Error) => toast.error(error.message));
    }

    const getTypeProduct = () => {
        getTipoProducto().then((listTipoProduc: CatalogTypeDto[])=> {
            listTipoProduc.map((catalog: CatalogTypeDto) => {
                catalog.selfDelete = () => deleteTipoProduct(catalog.id).then(item => toast.success("Eliminado correctamente.")).catch((error: Error) => toast.error(error.message));
                catalog.selfUpdateEstatus = (status: boolean) => updateStatusTipoProduct(catalog.id,status ).then(item => toast.success("Actualizado correctamente.")).catch(error => toast.error("Error al actualizar el registro."));
            })
            setTypeProducts(listTipoProduc);
        }).catch((error: Error) => toast.error(error.message));
    }

    const getTipePayment = () => {
        getTipoCobro().then((listTipoCobro: CatalogTypeDto[])=> {
            listTipoCobro.map((catalog: CatalogTypeDto)=> {
                catalog.selfDelete = () => deleteTipoCobro(catalog.id).then(item => toast.success("Eliminado correctamente.")).catch((error: Error) => toast.error(error.message));
                catalog.selfUpdateEstatus = (status: boolean) => updateStatusTipoCobro(catalog.id, status).then(item => toast.success("Actualizado correctamente.")).catch(error => toast.error("Error al actualizar el registro."));
            })
            setTypePayments(listTipoCobro);
        }).catch((error: Error) => toast.error(error.message));
    }

    const getProducts = () => {
        getProductos().then((products) => {
            setProducts(products.map((product)=> ({
                id: product.id,
                clave: product.key,
                descripcion: product.nameProduct,
                estatus: product.status,
                image: product.thumbnail,
                tags:null,
                selfDelete: () => deleteProducto(product.id),
                selfUpdateEstatus: (status:boolean) => updateStatusProducto(product.id,status)
            })))
        }).catch((error: Error) => toast.error(error.message));
    }

    const addNewRecord = (catalog:String, newRecord: CatalogTypeDto) => {
        if(catalog === CATALOGS.flavor){
            addSabor(newRecord).then(() => {
                setReload(!reload);
                toast.success("Registrado correctamente.");
            }).catch((error: Error) => toast.error(error.message));
        }
        if(catalog === CATALOGS.typePaymment){
            addTipoCobro(newRecord).then(() => {
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
        if(catalog === CATALOGS.products){
            addProducto(mapToProductRequestByCatalog(newRecord)).then(()=> {
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
        getTipePayment();
        getTypeProduct();
        getProducts();
    },[reload])
    
    return {flavors, sizes, typeProducts, typePayments, products, handleTogleReload, addNewRecord};
}