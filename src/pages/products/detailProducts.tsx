import { useProducts } from "../../hooks/useProducts"
import { Product } from "../../components/formProducts/Product";
import './detailProducts.css';
import { FaPlusCircle } from "react-icons/fa";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import { NewCatalogRecord } from "../../components/newCatalogRecord/NewCatalogRecord";
import { CATALOGS } from "../../general/Constants";


export function DetailProducts(){
    const {products, removeProduct,updateProduct, addProduct, handleReloadProducts} = useProducts();
    const modalProducto = useModalConfirm();

    return (
        <>
        <div className="container-pageProducts">
            <h1>Administracion de productos</h1>
            <div className="segment-pageProducts">
                <div className="subtitle">
                    <h3>Productos</h3>
                    <button className='subtitle-add'>
                        <FaPlusCircle title="Nuevo producto" size="2rem" className='color-success' onClick={(event) => modalProducto.handleShow(event)}></FaPlusCircle>
                    </button>
                </div>
                <div className="container-products">
                    {products && products.map((product) => (
                        <Product key={product.id} product={product} handleUpdate={updateProduct} showActions={true} handleReload={handleReloadProducts}></Product>
                    ))}
                </div>
            </div>
        </div>
        {modalProducto.show && 
            <NewCatalogRecord  catalogType={CATALOGS.products} handleRealod={handleReloadProducts} addRecordCallback={addProduct} handleClose={modalProducto.handleClose} hasImage={true}></NewCatalogRecord>
        }
        
        </>
    )
}