import { useEffect, useState } from "react";
import { addSabor, deleteSabor, getSabores, updateStatusSabor } from "../services/sabor.service";
import { CatalogTypeDto, ProductRequest } from "../general/Interfaces";
import { addSizeProduct, daleteSizeProduct, getSizeProductos, updateStatusSizeProduct } from "../services/sizeProducto.service";
import { addTipoProducto, deleteTipoProduct, getTipoProducto, updateStatusTipoProduct } from "../services/tipoProducto.service";
import { addTipoCobro, deleteTipoCobro, getTipoCobro, updateStatusTipoCobro } from "../services/tipoCobro.service";
import { CATALOGS } from "../general/Constants";
import { addProducto, deleteProducto, getProductos, updateStatusProducto } from "../services/producto.service";


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
                catalog.selfDelete = () => deleteSabor(catalog.id);
                catalog.selfUpdateEstatus = (status: boolean) => updateStatusSabor(catalog.id, status);
            })
            setFlavors(resultCatalog);})
        .catch(error => {});
    }

    const getsizes = () => {
        getSizeProductos().then((listSize: CatalogTypeDto[])=>{
            listSize.map((size: CatalogTypeDto) => {
                size.selfDelete = () => daleteSizeProduct(size.id);
                size.selfUpdateEstatus = (status: boolean) => updateStatusSizeProduct(size.id, status);
            })
            setSizes(listSize);
        })
    }

    const getTypeProduct = () => {
        getTipoProducto().then((listTipoProduc: CatalogTypeDto[])=> {
            listTipoProduc.map((catalog: CatalogTypeDto) => {
                catalog.selfDelete = () => deleteTipoProduct(catalog.id);
                catalog.selfUpdateEstatus = (status: boolean) => updateStatusTipoProduct(catalog.id,status );
            })
            setTypeProducts(listTipoProduc);
        })
    }

    const getTipePayment = () => {
        getTipoCobro().then((listTipoCobro: CatalogTypeDto[])=> {
            listTipoCobro.map((catalog: CatalogTypeDto)=> {
                catalog.selfDelete = () => deleteTipoCobro(catalog.id);
                catalog.selfUpdateEstatus = (status: boolean) => updateStatusTipoCobro(catalog.id, status);
            })
            setTypePayments(listTipoCobro);
        })
    }

    const getProducts = () => {
        getProductos().then((products) => {
            setProducts(products.map((product)=> ({
                id: product.id,
                clave: product.key,
                descripcion: product.nameProduct,
                estatus: product.status,
                image: product.thumbnail,
                selfDelete: () => deleteProducto(product.id),
                selfUpdateEstatus: (status:boolean) => updateStatusProducto(product.id,status)
            })))
        })

        
    }

    const addNewRecord = (catalog:String, newRecord: CatalogTypeDto) => {
        if(catalog === CATALOGS.flavor){
            addSabor(newRecord).then(() => {
                setReload(!reload);
            });
        }
        if(catalog === CATALOGS.typePaymment){
            addTipoCobro(newRecord).then(() => {
                setReload(!reload);
            });
        }
        if(catalog === CATALOGS.typeProduct){
            addTipoProducto(newRecord).then(() => {
                setReload(!reload);
            });
        }
        if(catalog === CATALOGS.sizeProduct){
            addSizeProduct(newRecord).then(() => {
                setReload(!reload);
            });
        }
        if(catalog === CATALOGS.products){
            console.log(newRecord);
            const productModel:ProductRequest = {
                clave: newRecord.clave,
                descripcion: newRecord.descripcion,
                estatus: newRecord.estatus,
                imagen: newRecord.image
            }
            addProducto(productModel).then(()=> {
                setReload(!reload);
            })
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