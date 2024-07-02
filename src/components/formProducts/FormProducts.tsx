import { useForm } from "react-hook-form";
import { useProducts } from "../../hooks/useProducts";
import './FormProducts.css';
import { DetailProductoDto, ProductDto, ProductForm } from "../../general/Interfaces";
import { useState } from "react";
import { MdClose } from "react-icons/md";

export function FormProducts({idPedido,  handleIsOpen, reload}:{idPedido: number, handleIsOpen:CallableFunction, reload: CallableFunction }) {
    const { products, detailProducts, getDetailProducts, addDetailProductToOrder} = useProducts();
    const [productSelected, setProductSelected] = useState<ProductDto | null>(null);
    const [detailProductSelected, setDetailProductSelected] = useState<DetailProductoDto | null>(null);
    
    const { register, handleSubmit, reset, formState: { isSubmitSuccessful } } = useForm<ProductForm>({
        defaultValues: {
            quantity: 1,
            comments: undefined,
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
            handleIsOpen();
            reload();
        });   
    }

    return ( 
        <div className="modal"> 
            <div className="container-detail">
                <span className="container-detail-close" onClick={() => handleIsOpen()}><MdClose size={'2rem'}></MdClose></span>
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
                <div className="container-detailProduct-selected">
                    <h3>Producto seleccionado</h3>
                    <div className="container-detailProduct-selected-form">
                        {detailProductSelected && 
                            <div className="detailProduct-selected" >
                                <img className="detailProduct-selected-img" src={detailProductSelected?.producto.thumbnail}></img>
                                <div className="detailProduct-selected-info">
                                    <ul>
                                        <li><span>Tipo: </span>{detailProductSelected?.tipoProducto.descripcion}</li>
                                        <li><span>Sabor: </span>{detailProductSelected?.sabor.descripcion}</li>
                                        <li><span>Tamaño: </span>{detailProductSelected?.size.descripcion}</li>
                                        <li><span>Precio: </span>{detailProductSelected?.precio}</li>
                                        {detailProductSelected?.descripcion && <li><span>Detalles: </span>{detailProductSelected?.descripcion}</li>}
                                    </ul>
                                </div>
                            </div>
                        }
                        <form className="form-add-product" onSubmit={handleSubmit(handleAddDetailProduct)}>
                            <div className="form-input-sm">
                                <label>Comentarios:</label>
                                <input type="text" {...register("comments")}></input>
                            </div>
                            <div className="form-input-sm">
                                <label>Cantidad:</label>
                                <input type="number" {...register("quantity")}></input>
                            </div>
                            <button type="submit" className="btn btn-add">Agregar producto</button>
                        </form>
                    </div>
                </div>
                <hr></hr>
                <div className="detailProducts">
                    <h3>Tipos de productos</h3>
                    <div className="container-detailProducts">
                        {
                            
                            detailProducts && 
                            detailProducts.map((detailProduct) => (
                                <div className="detailProduct" key={detailProduct.id} onClick={() => handleDetailProductSelected(detailProduct)}>
                                    <img className="detailProduct-img" src={detailProduct.producto.thumbnail}></img>
                                    <div className="detailProduct-info">
                                        <ul>
                                            <li><span>Tipo: </span>{detailProduct.tipoProducto.descripcion}</li>
                                            <li><span>Sabor: </span>{detailProduct.sabor.descripcion}</li>
                                            <li><span>Tamaño: </span>{detailProduct.size.descripcion}</li>
                                            <li><span>Precio: </span>{detailProduct.precio}</li>
                                            {detailProduct.descripcion && <li><span>Detalles: </span>{detailProduct.descripcion}</li>}
                                        </ul>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}