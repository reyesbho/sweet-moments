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
        deleteProductoPedido({idPedido:productItem.idOrder, idProductoPedido:productItem.id})
        .then((res) => {
            reload(productItem.id);
        })
    }
    
    return (
        <div key={productItem.id} className='product'>
            <img className='product-img' src={getImage(productItem.product?.key)} 
                loading="lazy"  
                alt={productItem.product?.nameProduct}></img>
            <div className='product-segment'>
            <div className='product-info'>
                <h6>{productItem.product?.nameProduct}</h6>
                {productItem.text ? <p><strong>Texto: </strong>{productItem.text}</p> : ''}
                {productItem.product?.type ? <p><strong>Tipo: </strong>{productItem.product?.type}</p> : ''}
                
            </div>
            <ul className='product-properties'>
            {productItem.product?.flavor ? <p><strong>Sabor: </strong>{productItem.product?.flavor}</p> : ''}
                Comentarios: 
                {productItem.comments ? <p>{productItem.comments}</p> : ''}
            </ul>
            </div>
            <div  className='product-segment'>
            <div className='product-totals'>
                <span className='product-size'>{productItem.key == 'pizza' ? `${productItem.size} Rebanadas` :productItem.key == 'pastel' ||  productItem.key == 'gelatina' ? `${productItem.size} Personas` : `${productItem.size} Piezas`} </span>
                <span className='product-price'>{`$${productItem.price}.00`} </span>
            </div>
            <div className='product-actions'>
                <span onClick={(event) => handleOpenModal(event, true)} className='icon-actions' title='Eliminar'>
                <FaTrash size="1rem" className='color-wrong'></FaTrash>
                </span>
            </div>
            </div>
            <ModalConfirm openModal={openModal} setOpenModal={setOpenModal} accept={handleDeleteProducPedido} ></ModalConfirm>
        </div>
    )

}