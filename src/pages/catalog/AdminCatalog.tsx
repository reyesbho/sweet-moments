import './AdminCatalog.css';
import { TableCatalogType } from "../../components/tableCatalog/TableCatalogType";
import { CATALOGS } from "../../general/Constants";
import { useCatalogs } from "../../hooks/useCatalogs";
import { useEffect, useState } from 'react';


export function AdminCatalog(){
    const {sizes, addNewSize, getsizes} = useCatalogs();
    useEffect(() => {
        // Fetch initial data for sizes
        getsizes();
    }, []);
    

    return (
        <div>
            <h1>Administracion de catalogos</h1>
            <div className="catalog">
                <TableCatalogType title={"Tamaños"} catalogArray={sizes} catalogType={CATALOGS.sizeProduct}  handleReload={getsizes} addNewRecord={addNewSize}></TableCatalogType>
            </div>
        </div>
    )
}