import './AdminCatalog.css';
import { TableCatalogType } from "../../components/tableCatalog/TableCatalogType";
import { CATALOGS } from "../../general/Constants";
import { useCatalogs } from "../../hooks/useCatalogs";


export function AdminCatalog(){
    const {flavors, typePayments, typeProducts, sizes, handleTogleReload, addNewRecord} = useCatalogs();

    return (
        <section>
            <h1 className="title-catalogos">Administracion de catalogos</h1>
            <div className="catalog">
                <TableCatalogType title={"Sabores"} catalogArray={flavors} catalogType={CATALOGS.flavor} handleReaload={handleTogleReload} addNewRecord={addNewRecord}></TableCatalogType>
                <TableCatalogType title={"Tipo cobro"} catalogArray={typePayments} catalogType={CATALOGS.typePaymment}  handleReaload={handleTogleReload} addNewRecord={addNewRecord}></TableCatalogType>
                <TableCatalogType title={"Tipo producto"} catalogArray={typeProducts} catalogType={CATALOGS.typeProduct}  handleReaload={handleTogleReload}addNewRecord={addNewRecord} ></TableCatalogType>
                <TableCatalogType title={"Tamaños"} catalogArray={sizes} catalogType={CATALOGS.sizeProduct}  handleReaload={handleTogleReload} addNewRecord={addNewRecord}></TableCatalogType>
            </div>
        </section>
    )
}