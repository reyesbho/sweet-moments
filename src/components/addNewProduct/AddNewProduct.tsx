import { useForm } from "react-hook-form";
import { useProducts } from "../../hooks/useProducts";
import './AddNewProduct.css';
import { useEffect, useState } from "react";
import { MdCancel, MdClose } from "react-icons/md";
import { useCatalogs } from "../../hooks/useCatalogs";
import { toast } from "react-toastify";
import { Product } from "../formProducts/Product";
import { FaPlusCircle } from "react-icons/fa";
import { zodResolver } from '@hookform/resolvers/zod';
import { AddNewProductForm, AddNewProductSchema, CATALOG_ESTATUS, mapToProduct, mapToSize, productOrderMapToCatalogTypeProduct } from "../../general/Constants";
import { Pedido, Producto, ProductoPedido, Size } from "../../general/interfaces/pedido";
import { updatePedido } from "../../services/pedidos.services";
import { CatalogTypeDto } from "../../general/Dtos";


export function AddNewProduct({pedido, productOrder,  handleClose, reload}:
    {pedido: Pedido,productOrder?:ProductoPedido, handleClose:CallableFunction, reload: CallableFunction }) {
    const {products, setProducts} = useProducts(CATALOG_ESTATUS.ACTIVO);
    const {getsizesActives, sizes, loading: sizesLoading} = useCatalogs();
    const [productSelected, setProductSelected] = useState<CatalogTypeDto | null>(productOrder ? productOrderMapToCatalogTypeProduct(productOrder):null);   
    const [detailList, setDetailList] = useState<string[]>([]);
    const [detail, setDetail] = useState<string>('');
    const [isInitialized, setIsInitialized] = useState(false);
    
    let productOrderForm: AddNewProductForm = (productOrder
        ? {
            cantidad: productOrder.cantidad,
            precio: productOrder.precio,
            caracteristicas: '',
            idSize: productOrder.size.id
        } :
        {
            cantidad: 1,
            precio: 0,
            caracteristicas:'',
            idSize: ''
        }
    )
    
    useEffect(() => {
        if(productSelected && productOrder){     
            getsizesActives({tag: productSelected.tag || ''});
            setDetailList(productOrder?.caracteristicas);
        }
    }, []);  

    const { register, handleSubmit,setValue, formState:{errors, isSubmitting} } = useForm<AddNewProductForm>({
        resolver: zodResolver(AddNewProductSchema),
        defaultValues: productOrderForm
    });
    

    const handleAddDetailProduct = async (productInfo: AddNewProductForm) => {
        const productoPedido: ProductoPedido = {
            size: mapToSize(sizes?.find(size => size.id === productInfo.idSize)),
            cantidad: productInfo.cantidad,
            producto: mapToProduct(productSelected),
            caracteristicas: detailList,
            precio: productInfo.precio
        };
        pedido.productos = (pedido.productos ? [...pedido.productos, productoPedido] : [productoPedido]);

        await updatePedido(pedido)
            .then(() => {
                toast.success("Producto agregado correctamente.");
                reload();
                handleClose();
            })
            .catch((error: Error) => toast.error(error.message));
    }

    const handleAddDetail = (e:React.MouseEvent) =>{
        e.preventDefault();
        if(detailList.length >= 5){
            toast.error("No se pueden agregar más de 5 detalles");
            return
        }
        if (detail.trim() !== '') {
            setDetailList([...detailList, detail]);
            setDetail('');
        }
    }

    const handleRemoveDetail = (e:React.MouseEvent, indexRemove:number) => {
        e.preventDefault();
        const newList = detailList.filter((_, index) => index !== indexRemove);
        setDetailList(newList);
    }

    const handleClickSelectProduct = (product: CatalogTypeDto) => {
        if(productSelected?.id === product.id){
            return
        }
        setProductSelected(product);
        getsizesActives({tag: product.tag || ''});
    };


    return ( 
        <div className="modal"> 
            <div className="container-detail">
                <span className="container-detail-close" onClick={() => handleClose()}><MdClose size={'2rem'}></MdClose></span>
                <h2>Agregar producto</h2>
                <div className="productos">
                    {
                        products && 
                        products.map((producto => (
                            <Product 
                                key={producto.id} 
                                isSelected={productSelected?.id == producto.id} 
                                product={producto} 
                                handleClickSelect={handleClickSelectProduct} >
                            </Product>
                        )))
                    }
                </div>
                <hr></hr>
                <div className="container-detailProduct-selected">
                    <h3>Caracteristicas</h3>
                    <div className="container-detailProduct-selected-form">
                        {productSelected && 
                            <form className="form-add-product" onSubmit={handleSubmit(handleAddDetailProduct)}>
                                <div>
                                    <div className="form-input">
                                        <label htmlFor="quantity">Cantidad:</label>
                                        <input id="quantity" type="number" {...register("cantidad")}></input>
                                        {errors.cantidad && <span className="error">{errors.cantidad.message}</span>}
                                    </div>
                                    <div className="form-input">
                                        <label htmlFor="comments">Tamaño:</label>
                                        <select id="size" {...register("idSize")}>
                                            <option value="">Seleccionar</option>
                                            {sizes && sizes.map((size) => (
                                                <option key={size.id} value={size.id}>{size.descripcion}</option>
                                            ))} 
                                        </select>
                                        {errors.idSize && <span className="error">{errors.idSize.message}</span>}
                                    </div>
                                    <div className="form-input">
                                        <label htmlFor="descuento">Precio:</label>
                                        <input id="descuento" type="number" {...register("precio")} placeholder="$0"></input>
                                        {errors.precio && <span className="error">{errors.precio.message}</span>}
                                    </div>
                                </div>
                                <div>
                                    <div className="form-input">
                                        <label htmlFor="descuento">Detalles:</label>
                                        <div className="form-input-add">
                                            <input id="detalles" type="text" value={detail} onChange={(e) => setDetail(e.target.value)} maxLength={30}></input>                                    
                                            <button className='button-add-icon' onClick={handleAddDetail}>
                                                        <FaPlusCircle size="2rem" className='color-success'></FaPlusCircle>
                                            </button>
                                        </div>
                                    </div>
                                    <ul className="list-details"> 
                                        {detailList && detailList.map((detail, index) => (
                                            <li key={index}>
                                                <span >{detail}</span>
                                                <span  className='icon-delete' title='Eliminar' onClick={(event) => handleRemoveDetail(event,index)}>
                                                                        <MdCancel size="1.4rem" className='color-wrong'></MdCancel>
                                                                    </span>
                                            </li>
                                        ))}       
                                    </ul>
                                    <button type="submit" className="btn btn-add btn-md rigth" disabled={isSubmitting}>{isSubmitting ? 'Agregando...' : 'Agregar producto'}</button>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}