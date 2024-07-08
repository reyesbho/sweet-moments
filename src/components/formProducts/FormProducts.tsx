import { useForm } from "react-hook-form";
import { useProducts } from "../../hooks/useProducts";
import './FormProducts.css';
import { DetailProductoDto, ProductDto, ProductForm } from "../../general/Interfaces";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useCatalogs } from "../../hooks/useCatalogs";
import { DetailProduct } from "./DetailProduct";

export function FormProducts({idPedido,  handleClose, reload}:{idPedido: number, handleClose:CallableFunction, reload: CallableFunction }) {
    const { products, detailProducts, getDetailProducts, addDetailProductToOrder} = useProducts();
    const [productSelected, setProductSelected] = useState<ProductDto | null>(null);
    const [detailProductSelected, setDetailProductSelected] = useState<DetailProductoDto | null>(null);
    const {flavors, typeProducts} = useCatalogs();
    
    const { register, handleSubmit, reset, formState: { isSubmitSuccessful } } = useForm<ProductForm>({
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

    return ( 
        <div className="modal"> 
            <div className="container-detail">
                <span className="container-detail-close" onClick={() => handleClose()}><MdClose size={'2rem'}></MdClose></span>
                <h2>Productos</h2>
                <div className="productos">
                    {
                        products && 
                        products.map((producto => (
                            <div className="producto" key={producto.id} onClick={() => handleClickSelect(producto)}>
                                <img className="producto-img" src={producto.thumbnail}></img>
                                <span className="producto-title">{producto.nameProduct}</span>
                            </div>
                        )))
                    }
                </div>
                <hr></hr>
                <div className="detailProducts">
                    <h3>Tipos de productos</h3>
                    <div className="container-detailProducts">
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
                                
                                <div className="form-input-sm">
                                    <label>Sabor:</label>
                                    <select {...register("idFlavor")}>
                                        <option key={0} value={0}>Sin sabor</option>
                                        {flavors && flavors.map((flavor) => (
                                            <option key={flavor.id} value={flavor.id}>{flavor.descripcion}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-input-sm">
                                    <label>Tipo:</label>
                                    <select {...register("idTypeProduct")}>
                                    {typeProducts && typeProducts.map((type) =>(
                                        <option key={type.id} value={type.id}>{type.descripcion}</option>
                                    ))}
                                    </select>
                                </div>
                                <div className="form-input-sm">
                                    <label>Cantidad:</label>
                                    <input type="number" {...register("quantity")}></input>
                                </div>
                                <div className="form-input-sm">
                                    <label>Comentarios:</label>
                                    <input type="text" {...register("comments")}></input>
                                </div>
                                <div className="form-input-sm">
                                    <label>Descuento:</label>
                                    <input type="number" {...register("descuento")} placeholder="$0"></input>
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