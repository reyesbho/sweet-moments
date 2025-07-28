import './AdminCatalog.css';
import { TableCatalogType } from "../../components/tableCatalog/TableCatalogType";
import { CATALOGS } from "../../general/Constants";
import { useCatalogs } from "../../hooks/useCatalogs";
import { useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';

export function AdminCatalog(){
    const {sizes, addNewSize, getsizes, loading} = useCatalogs();
    const {products, removeProduct,updateProduct, addProduct, handleReloadProducts, loading: loadingProduct} = useProducts();
    useEffect(() => {
        // Fetch initial data for sizes
        getsizes();
    }, [getsizes]);
    
    return (
        <div className='container-catalogs'>
            <h1>Administracion de catalogos</h1>
            <div className="catalog">
                <TableCatalogType title={"Tamaños"} catalogArray={sizes} catalogType={CATALOGS.sizeProduct}  handleReload={getsizes} addNewRecord={addNewSize} loading={loading} />
                <TableCatalogType title={"Productos"} hasImage={true} catalogArray={products} catalogType={CATALOGS.products}  handleReload={handleReloadProducts} addNewRecord={addProduct} loading={loadingProduct} />
            </div>
        </div>
    )
}