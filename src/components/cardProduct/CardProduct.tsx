import { FaTrash } from 'react-icons/fa'
import { getImage } from '../../general/Constants'
import { ProductOrderDto } from '../../general/Interfaces'
import './CardProduct.css'
import { useModalConfirm } from '../../hooks/useModalConfirm';
import { ModalConfirm } from '../modal/Modal';
import { deleteProductoPedido } from '../../services/pedidos.services';
export function CardProduct({productItem,reload }:{productItem: ProductOrderDto, reload: CallableFunction}) {
    const {openModal, statusConfirm, handleOpenModal, setOpenModal} = useModalConfirm();

    const handleDeleteProducPedido = () => {
        deleteProductoPedido({idPedido:productItem.idPedido, idProductoPedido:productItem.id})
        .then((res) => {
            reload(productItem.id);
        })
    }
    
    return (
        <section>
        <div key={productItem.id} className='product'>
            <img className='product-img' src={getImage(productItem.detalleProducto.producto?.key)} 
                loading="lazy"  
                alt={productItem.detalleProducto.producto?.nameProduct}></img>
            <div className='product-segment'>
                <h2>{productItem.detalleProducto.producto?.nameProduct}</h2>
                <ul className='product-properties'>
                    <li>{productItem.comentarios && <p><strong>Texto: </strong>{productItem.comentarios}</p> }</li>
                    <li>{productItem.detalleProducto.tipoProducto && <p><strong>Tipo: </strong>{productItem.detalleProducto.tipoProducto?.descripcion }</p>}</li>
                    <li>{productItem.detalleProducto.sabor.clave && <p><strong>Sabor: </strong>{productItem.detalleProducto.sabor.descripcion}</p>}</li>
                    <li>{productItem.detalleProducto.descripcion && <div className='product-comments'><strong>Detalles: </strong><p >{productItem.detalleProducto.descripcion}</p></div>}</li>                    
                </ul>
            </div>
            <div  className='product-segment'>
                <hr />
                <div className='product-totals'>
                    <span className='product-size'>{productItem.detalleProducto.size.descripcion} </span>
                    <span className='product-price'>{`$${productItem.detalleProducto.precio}.00`} </span>
                    <span onClick={(event) => handleOpenModal(event, true)} className='icon-actions' title='Eliminar'>
                    <FaTrash size="1rem" className='color-wrong'></FaTrash>
                    </span>
                </div>
            </div>
        </div>
        <ModalConfirm openModal={openModal} setOpenModal={setOpenModal} accept={handleDeleteProducPedido} ></ModalConfirm>
        </section>
    )

}