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
        <div key={productItem.id} className='product'>
            <img className='product-img' src={getImage(productItem.detalleProducto.producto?.key)} 
                loading="lazy"  
                alt={productItem.detalleProducto.producto?.nameProduct}></img>
            <div className='product-segment'>
                <div className='product-info'>
                    <h6>{productItem.detalleProducto.producto?.nameProduct}</h6>
                    {productItem.detalleProducto.descripcion ? <p><strong>Texto: </strong>{productItem.detalleProducto.descripcion}</p> : ''}
                    {productItem.detalleProducto.tipoProducto?.clave ? <p><strong>Tipo: </strong>{productItem.detalleProducto.tipoProducto?.descripcion }</p> : ''}
                    
                </div>
                <ul className='product-properties'>
                    <li>{productItem.detalleProducto.sabor?.clave ? <p><strong>Sabor: </strong>{productItem.detalleProducto.sabor?.descripcion}</p> : ''}</li>
                    <li>{productItem.comentarios ? <div className='product-comments'><strong>Comentarios: </strong><p >{productItem.comentarios}</p></div>: ''}</li>                    
                </ul>
            </div>
            <div  className='product-segment'>
                <div className='product-totals'>
                    <span className='product-size'>{productItem.detalleProducto.size.descripcion} </span>
                    <span className='product-price'>{`$${productItem.detalleProducto.precio}.00`} </span>
                    <span onClick={(event) => handleOpenModal(event, true)} className='icon-actions' title='Eliminar'>
                    <FaTrash size="1rem" className='color-wrong'></FaTrash>
                    </span>
                </div>
            </div>
            <ModalConfirm openModal={openModal} setOpenModal={setOpenModal} accept={handleDeleteProducPedido} ></ModalConfirm>
        </div>
    )

}