import { useState } from "react";
import { DetailProduct } from "../../components/formProducts/DetailProduct";
import { useProducts } from "../../hooks/useProducts"
import { Product } from "../../components/formProducts/Product";
import { ProductDto } from "../../general/Interfaces";
import './detailProducts.css';
import { FaPlusCircle } from "react-icons/fa";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import { NewCatalogRecord } from "../../components/newCatalogRecord/NewCatalogRecord";
import { CATALOGS } from "../../general/Constants";


export function DetailProducts(){
    const {products,detailProducts, getDetailProducts, removeProduct, addProduct, handleReloadProducts} = useProducts();
    const [productSelected,setProductSelected ] = useState<ProductDto>();
    const modalProducto = useModalConfirm();
    const modalDetalleProducto = useModalConfirm();

    const handleClickSelect = (product: ProductDto) => {
        if(productSelected?.id === product.id){
            return
        }
        setProductSelected(product);
        getDetailProducts(product.id);
    };

    return (
        <>
        <div className="container-pageProducts">
            <h1>Administracion de productos</h1>
            <div className="segment-pageProducts">
                <div className="subtitle">
                    <h3>Productos</h3>
                    <button className='subtitle-add'>
                        <FaPlusCircle size="2rem" className='color-success' onClick={(event) => modalProducto.handleShow(event)}></FaPlusCircle>
                    </button>
                </div>
                <div className="container-products">
                    {products && products.map((product) => (
                        <Product key={product.id} product={product} handleClickSelect={handleClickSelect} showActions={true} handleReload={handleReloadProducts}></Product>
                    ))}
                </div>
            </div>
            {   productSelected && detailProducts && 
            <div className="segment-pageProducts">
                <div className="subtitle">
                    <h3>Tipos de productos</h3>
                    <button className='subtitle-add'>
                        <FaPlusCircle size="2rem" className='color-success' onClick={(event) => modalDetalleProducto.handleShow(event)}></FaPlusCircle>
                    </button>
                </div>
                 <div className="container-products">
                 {detailProducts.map((detailProduct) =>(
                        <DetailProduct key={detailProduct.id} detailProduct={detailProduct} showActions={true} handleReload={() => getDetailProducts(productSelected.id)}></DetailProduct>
                    ))}
                </div>
            </div>}
        </div>
        {modalProducto.show && <NewCatalogRecord catalogType={CATALOGS.products} addRecordCallback={addProduct} handleClose={modalProducto.handleClose} hasImage={true}></NewCatalogRecord>}
        </>
    )
}