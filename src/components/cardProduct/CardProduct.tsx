import { FaTrash } from 'react-icons/fa'
import './CardProduct.css'
import { useModalConfirm } from '../../hooks/useModalConfirm';
import { ModalConfirm } from '../modal/Modal';
import { ProductoPedido } from '../../general/interfaces/pedido.js';
export function CardProduct({ productItem, reload, handleDeleteProducPedido = () => {}, showDelete = false   }: 
                            { productItem: ProductoPedido, reload: CallableFunction, handleDeleteProducPedido?: CallableFunction, showDelete?: boolean }) {
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
                        <span className='product-name'>{productItem.producto?.descripcion} ({productItem.size.descripcion})</span>
                        <span className='product-price'>{`$${productItem.precio}`} x ({productItem.cantidad})</span>
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
                {showDelete && <span onClick={(event) => handleShow(event)} className='icon-actions' title='Eliminar'>
                    <FaTrash size="1.2rem" className='color-wrong'></FaTrash>
                </span>
                }
            </div>

            <ModalConfirm show={show} handleClose={handleClose} handleOk={handleDelete} ></ModalConfirm>
        </div>
    )

}