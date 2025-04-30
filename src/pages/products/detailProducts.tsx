import { useState } from "react";
import { useProducts } from "../../hooks/useProducts"
import { Product } from "../../components/formProducts/Product";
import './detailProducts.css';
import { FaPlusCircle } from "react-icons/fa";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import { NewCatalogRecord } from "../../components/newCatalogRecord/NewCatalogRecord";
import { CATALOGS } from "../../general/Constants";
import { TableComponent } from "../../components/tableComponent/tableComponent";
import { DetailProductRecord } from "../../components/detailProductRecord/DetailProductRecord";
import { NewDetailOrder } from "../../components/newDetailOrder/newDetailOrder";
import { ProductDto } from "../../general/Dtos";
import { ModalConfigProduct } from "../../components/modalConfigProduct/ConfigProduct";


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


    const configTable = {
        columns:[ 'Imagen','Producto','Tamaño','Tipo producto','Comentario',"Precio",'Estatus' ,'Acciones']
    }

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
                        <Product key={product.id} product={product} handleClickSelect={handleClickSelect} showActions={true} handleReload={handleReloadProducts}></Product>
                    ))}
                </div>
            </div>
            {   productSelected && detailProducts && 
            <div className="segment-pageProducts">
                <div className="subtitle">
                    <h3>Detalles de producto</h3>
                    <button className='subtitle-add'>
                        <FaPlusCircle title="Nuevo tipo de producto" size="2rem" className='color-success' onClick={(event) => modalDetalleProducto.handleShow(event)}></FaPlusCircle>
                    </button>
                </div>
                 <div className="container-products">
                    <TableComponent configTable={configTable} hasImage={true} title='Tipos de producto' >
                        <tbody>
                        {detailProducts && 
                            detailProducts.map(detailProduct => (
                                <DetailProductRecord key={detailProduct.id} catalog={detailProduct} handleReload={() => getDetailProducts(productSelected.id)}></DetailProductRecord>
                            ))
                        }
                        </tbody>
                    </TableComponent>
                </div>
            </div>}
        </div>
        {modalProducto.show && 
            <NewCatalogRecord catalogType={CATALOGS.products} addRecordCallback={addProduct} handleClose={modalProducto.handleClose} hasImage={true}></NewCatalogRecord>
        }
        {modalDetalleProducto.show && productSelected && 
            <NewDetailOrder handleClose={modalDetalleProducto.handleClose} product={productSelected} handleReload={() => getDetailProducts(productSelected.id)}></NewDetailOrder>
        }
        
        </>
    )
}