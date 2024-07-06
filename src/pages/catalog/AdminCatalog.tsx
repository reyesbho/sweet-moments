import { EntityType } from "../../components/entityType/EntityType";
import { useCatalogs } from "../../hooks/useCatalogs";
import './Admincatalog.css';

export function AdminCatalog(){
    const {flavors, typePayments, typeProducts, sizes, handleTogleReload} = useCatalogs();

    return (
        <section>
            <h1 className="title-catalogos">Administracion de catalogos</h1>
            <div className="catalog">
                <EntityType title={"Sabores"} catalogType={flavors} handleReaload={handleTogleReload}></EntityType>
                <EntityType title={"Tipo cobro"} catalogType={typePayments} handleReaload={handleTogleReload}></EntityType>
                <EntityType title={"Tipo producto"} catalogType={typeProducts} handleReaload={handleTogleReload}></EntityType>
                <EntityType title={"Tamaños"} catalogType={sizes} handleReaload={handleTogleReload}></EntityType>
            </div>
        </section>
    )
}