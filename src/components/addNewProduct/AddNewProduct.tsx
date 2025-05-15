import { useForm } from "react-hook-form";
import { useProducts } from "../../hooks/useProducts";
import './AddNewProduct.css';
import { useState } from "react";
import { MdCancel, MdClose } from "react-icons/md";
import { useCatalogs } from "../../hooks/useCatalogs";
import { toast } from "react-toastify";
import { CatalogTypeDto } from "../../general/Dtos";
import { Product } from "../formProducts/Product";
import { FaPlusCircle } from "react-icons/fa";
import { zodResolver } from '@hookform/resolvers/zod';
import { AddNewProductForm, AddNewProductSchema } from "../../general/Constants";


export function AddNewProduct({idPedido,  handleClose, reload}:{idPedido: number, handleClose:CallableFunction, reload: CallableFunction }) {
    const {products, addDetailProductToOrder} = useProducts();
    const [productSelected, setProductSelected] = useState<CatalogTypeDto | null>(null);
    const {sizes} = useCatalogs();
    const [sizesList, setSizesList] = useState<CatalogTypeDto[]>();
    const [detailList, setDetailList] = useState<string[]>([]);
    const [detail, setDetail] = useState<string>('');
    
    const { register, handleSubmit,setValue, formState:{errors} } = useForm<AddNewProductForm>({
        resolver: zodResolver(AddNewProductSchema),
        defaultValues: {
            cantidad: 1,
            idSize: 0,
            precio:0,
            idProducto: 0,
            caracteristicas:''
        }
    });

    const handleClickSelect = (product: CatalogTypeDto) => {
        if(productSelected?.id === product.id){
            return
        }
        setProductSelected(product);
        setValue("idProducto", product.id);
        setSizesList([...sizes].filter((size) => size.tags?.includes(product.clave) || !size.tags));
    };

    const handleAddDetailProduct = (productInfo: AddNewProductForm) => {
        productInfo.idProducto = productSelected?.id ?? 0;
        productInfo.caracteristicas = detailList.join(',');
        addDetailProductToOrder(idPedido,productInfo)
        .then(() =>{
            handleClose();
            reload();
        });
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

    return ( 
        <div className="modal"> 
            <div className="container-detail">
                <span className="container-detail-close" onClick={() => handleClose()}><MdClose size={'2rem'}></MdClose></span>
                <h2>Agregar producto</h2>
                <div className="productos">
                    {
                        products && 
                        products.map((producto => (
                            <Product key={producto.id} product={producto} handleClickSelect={handleClickSelect} ></Product>
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
                                            {sizesList && sizesList.map((size) => (
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
                                                <span  className='icon-actions' title='Eliminar' onClick={(event) => handleRemoveDetail(event,index)}>
                                                                        <MdCancel size="1.4rem" className='color-wrong'></MdCancel>
                                                                    </span>
                                            </li>
                                        ))}       
                                    </ul>
                                    <button type="submit" className="btn btn-add btn-md rigth">Agregar</button>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}