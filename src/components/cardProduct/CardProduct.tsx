import { FaTrash } from 'react-icons/fa'
import './CardProduct.css'
import { useModalConfirm } from '../../hooks/useModalConfirm';
import { ModalConfirm } from '../modal/Modal';
import { ProductoPedido } from '../../general/interfaces/pedido.js';
export function CardProduct({ productItem, reload, handleDeleteProducPedido = () => {} }: 
                            { productItem: ProductoPedido, reload: CallableFunction, handleDeleteProducPedido?: CallableFunction }) {
    const { show, handleShow, handleClose } = useModalConfirm();
    const handleDelete = (event: any) => {
        event?.preventDefault();
        event?.stopPropagation();
        handleDeleteProducPedido(productItem);
        handleClose(event);
    }

    return (
        <div>
            <div className='product'>
                <img className='product-img' src={productItem.producto.imagen}
                    loading="lazy"
                    alt={productItem.producto?.descripcion}></img>
                <div className='product-segment'>
                    <div className='product-info'>
                        <span className='product-name'>{productItem.producto?.descripcion}</span>
                        <span className='product-size'>{productItem.size.descripcion}</span>
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

            <ModalConfirm show={show} handleClose={handleClose} handleOk={handleDelete} ></ModalConfirm>
        </div>
    )

}