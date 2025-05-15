import { FaTrash } from 'react-icons/fa'
import './CardProduct.css'
import { useModalConfirm } from '../../hooks/useModalConfirm';
import { ModalConfirm } from '../modal/Modal';
import { deleteProductoPedido } from '../../services/pedidos.services';
import { toast } from 'react-toastify';
import { ProductOrderDto } from '../../general/Dtos';
export function CardProduct({productItem,reload }:{productItem: ProductOrderDto, reload: CallableFunction}) {
    const {show, handleShow, handleClose} = useModalConfirm();

    const handleDeleteProducPedido = () => {
        deleteProductoPedido({idPedido:productItem.idPedido, idProductoPedido:productItem.id})
        .then((res) => {
            reload(productItem.id);
            toast.success("Eliminado correctamente.")
        }).catch((error: Error) => toast.error(error.message));
    }
    
    return (
        <section>
        <div key={productItem.id} className='product'>
            <img className='product-img' src={productItem.producto.thumbnail} 
                loading="lazy"  
                alt={productItem.producto?.nameProduct}></img>
            <div className='product-segment'>
                <div className='product-info'>
                    <span className='product-name'>{productItem.producto?.nameProduct}</span>
                    <span className='product-size'>{productItem.sizeProducto?.descripcion}</span>
                    <span className='product-price'>{`$${productItem.precio}`} </span>
                    <span><strong>Cantidad: </strong>{productItem.cantidad}</span>
                </div>
                <ul className='product-properties'>
                    {productItem.caracteristicas &&                         
                        <ul>
                            <span className='product-properties-title'>Detalles:</span>                
                            {productItem.caracteristicas.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    }
                </ul>
            </div>
            <span onClick={(event) => handleShow(event)} className='icon-actions' title='Eliminar'>
                        <FaTrash size="1.2rem" className='color-wrong'></FaTrash>
                    </span>
        </div>
         
        <ModalConfirm show={show} handleClose={handleClose} handleOk={handleDeleteProducPedido} ></ModalConfirm>
        </section>
    )

}