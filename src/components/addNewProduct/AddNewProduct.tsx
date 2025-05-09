import { useForm } from "react-hook-form";
import { useProducts } from "../../hooks/useProducts";
import './AddNewProduct.css';
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useCatalogs } from "../../hooks/useCatalogs";
import { toast } from "react-toastify";
import { CatalogTypeDto, DetailProductoDto, ProductDto } from "../../general/Dtos";
import { AddNewProductForm, ProductForm } from "../../general/Interfaces";
import { DetailProduct } from "../formProducts/DetailProduct";
import { Product } from "../formProducts/Product";

export function AddNewProduct({idPedido,  handleClose, reload}:{idPedido: number, handleClose:CallableFunction, reload: CallableFunction }) {
    const { products, detailProducts, getDetailProducts, addDetailProductToOrder} = useProducts();
    const [productSelected, setProductSelected] = useState<ProductDto | null>(null);
    const [detailProductSelected, setDetailProductSelected] = useState<DetailProductoDto | null>(null);
    const {sizes, typeProducts} = useCatalogs();
    const [typeProductList, setTypeProductList] = useState<CatalogTypeDto[]>();
    const [sizesList, setSizesList] = useState<CatalogTypeDto[]>();
    
    const { register, handleSubmit, reset,setValue, formState: { isSubmitSuccessful, errors } } = useForm<AddNewProductForm>({
        defaultValues: {
            cantidad: 1,
            size: undefined,
            precio:0,
            idProducto: 0,
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
        setValue("idProducto", product.id);
        console.log("productSelected", sizes);
        console.log("productSelected", product);
        setSizesList([...sizes].filter((size) => size.tags?.includes(product.key)));
    };

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
                <h2>Agregar producto</h2>
                <div className="productos">
                    {
                        products && 
                        products.map((producto => (
                            <Product key={producto.id} product={producto} handleClickSelect={handleClickSelect}></Product>
                        )))
                    }
                </div>
                <hr></hr>
                <div className="container-detailProduct-selected">
                    <h3>Caracteristicas</h3>
                    <div className="container-detailProduct-selected-form">
                        {productSelected && 
                            <form className="form-add-product" onSubmit={handleSubmit(handleAddDetailProduct)}>
                                
                                <div className="form-input">
                                    <label htmlFor="quantity">Cantidad:</label>
                                    <input id="quantity" type="number" {...register("cantidad")}></input>
                                </div>
                                <div className="form-input">
                                    <label htmlFor="comments">Tamaño:</label>
                                    <select id="size" {...register("size")} onChange={(e) => filterProductsType(e.target.value)}>
                                        <option value="">Seleccionar</option>
                                        {sizesList && sizesList.map((size) => (
                                            <option key={size.id} value={size.id}>{size.descripcion}</option>
                                        ))} 
                                    </select>
                                </div>
                                <div className="form-input">
                                    <label htmlFor="descuento">Precio:</label>
                                    <input id="descuento" type="number" {...register("precio")} placeholder="$0"></input>
                                </div>
                                <button type="submit" className="btn btn-add btn-md">Agregar producto</button>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}