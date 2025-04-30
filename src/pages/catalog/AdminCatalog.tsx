import './AdminCatalog.css';
import { TableCatalogType } from "../../components/tableCatalog/TableCatalogType";
import { CATALOGS } from "../../general/Constants";
import { useCatalogs } from "../../hooks/useCatalogs";


export function AdminCatalog(){
    const {flavors, typeProducts, sizes, handleTogleReload, addNewRecord} = useCatalogs();

    return (
        <div>
            <h1>Administracion de catalogos</h1>
            <div className="catalog">
                <TableCatalogType title={"Sabores"} catalogArray={flavors} catalogType={CATALOGS.flavor} handleReload={handleTogleReload} addNewRecord={addNewRecord}></TableCatalogType>
                <TableCatalogType title={"Tipo producto"} catalogArray={typeProducts} catalogType={CATALOGS.typeProduct}  handleReload={handleTogleReload}addNewRecord={addNewRecord} ></TableCatalogType>
                <TableCatalogType title={"Tamaños"} catalogArray={sizes} catalogType={CATALOGS.sizeProduct}  handleReload={handleTogleReload} addNewRecord={addNewRecord}></TableCatalogType>
            </div>
        </div>
    )
}