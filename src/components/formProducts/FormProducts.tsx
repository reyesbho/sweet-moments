import { useForm } from "react-hook-form";
import { useProducts } from "../../hooks/useProducts";
import './FormProducts.css';
import { CatalogTypeDto, DetailProductoDto, ProductDto, ProductForm } from "../../general/Interfaces";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useCatalogs } from "../../hooks/useCatalogs";
import { DetailProduct } from "./DetailProduct";
import { Product } from "./Product";

export function FormProducts({idPedido,  handleClose, reload}:{idPedido: number, handleClose:CallableFunction, reload: CallableFunction }) {
    const { products, detailProducts, getDetailProducts, addDetailProductToOrder} = useProducts();
    const [productSelected, setProductSelected] = useState<ProductDto | null>(null);
    const [detailProductSelected, setDetailProductSelected] = useState<DetailProductoDto | null>(null);
    const {flavors, typeProducts} = useCatalogs();
    const [typeProductList, setTypeProductList] = useState<CatalogTypeDto[]>();
    
    const { register, handleSubmit, reset, formState: { isSubmitSuccessful, errors } } = useForm<ProductForm>({
        defaultValues: {
            quantity: 1,
            comments: undefined,
            idFlavor:0,
            idTypeProduct:undefined,
            descuento:0,
            total:0
        }
    });

    
    const isValidForm = () => {
        if (!detailProductSelected){
            return false;
        }
        return true;
    }

    const handleClickSelect = (product: ProductDto) => {
        if(productSelected?.id === product.id){
            return
        }
        setProductSelected(product);
        getDetailProducts(product.id);
        filterProductsType(product.key);
    };

    const handleDetailProductSelected = (detailProduc: DetailProductoDto) => {
        if(detailProductSelected?.id === detailProduc.id){
            return
        }
        setDetailProductSelected(detailProduc);
    }



    const handleAddDetailProduct = (productInfo: ProductForm, event: any) => {
        event?.preventDefault();
        if(!isValidForm()){
            return;
        }
        productInfo.idDetailProduct = detailProductSelected?.id ?? 0;
        addDetailProductToOrder(idPedido,productInfo)
        .then(() =>{
            handleClose();
            reload();
        });   
    }

    const filterProductsType = (keyProduct: string) => {
        const newArray = typeProducts.filter((type) => type.tags?.includes(keyProduct) || !type.tags);
        setTypeProductList(newArray) ;
    }

    return ( 
        <div className="modal"> 
            <div className="container-detail">
                <span className="container-detail-close" onClick={() => handleClose()}><MdClose size={'2rem'}></MdClose></span>
                <h2>Productos</h2>
                <div className="productos">
                    {
                        products && 
                        products.map((producto => (
                            <Product key={producto.id} product={producto} handleClickSelect={handleClickSelect}></Product>
                        )))
                    }
                </div>
                <hr></hr>
                <div className="detailProducts-container">
                    <h3>Tipos de productos</h3>
                    <div className="detailProducts-list">
                        {
                            detailProducts && 
                            detailProducts.map((detailProduct) => (
                                <DetailProduct key={detailProduct.id} detailProduct={detailProduct} handleDetailProductSelected={handleDetailProductSelected}></DetailProduct>
                            ))
                        }
                    </div>
                </div>
                
                <hr></hr>
                <div className="container-detailProduct-selected">
                    <h3>Producto seleccionado</h3>
                    <div className="container-detailProduct-selected-form">
                        {detailProductSelected && 
                        <DetailProduct detailProduct={detailProductSelected} ></DetailProduct>
                        }
                        {detailProductSelected && 
                            <form className="form-add-product" onSubmit={handleSubmit(handleAddDetailProduct)}>
                                {!detailProductSelected.producto.completed &&
                                <div className="form-input-sm">
                                    <label htmlFor="idFlavor" >Sabor:</label>
                                    <select id="idFlavor" {...register("idFlavor")}>
                                        <option key={0} value={0}>Seleccionar</option>
                                        {flavors && flavors.map((flavor) => (
                                            <option key={flavor.id} value={flavor.id}>{flavor.descripcion}</option>
                                        ))}
                                    </select>
                                </div> }
                                {!detailProductSelected.producto.completed &&
                                <div className="form-input-sm">
                                    <label htmlFor="idTypeProduct">Tipo:</label>
                                    <select id="idTypeProduct" {...register("idTypeProduct")}>
                                    <option key={0} value={0}>Seleccionar</option>
                                    {typeProductList && typeProductList.map((type) =>(
                                        <option key={type.id} value={type.id}>{type.descripcion}</option>
                                    ))}
                                    </select>
                                    {errors.idTypeProduct && <p>{errors.idTypeProduct.message}</p>}
                                </div>}
                                <div className="form-input-sm">
                                    <label htmlFor="quantity">Cantidad:</label>
                                    <input id="quantity" type="number" {...register("quantity")}></input>
                                </div>
                                <div className="form-input-sm">
                                    <label htmlFor="comments">Comentarios:</label>
                                    <input id="comments" type="text" {...register("comments")}></input>
                                </div>
                                <div className="form-input-sm">
                                    <label htmlFor="descuento">Descuento:</label>
                                    <input id="descuento" type="number" max={detailProductSelected.precio} {...register("descuento")} placeholder="$0"></input>
                                </div>
                                <button type="submit" className="btn btn-add">Agregar producto</button>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}