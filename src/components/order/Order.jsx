import { STATUS, classStatusEnum } from '../../general/Status';
import './Order.css'
import { useState } from 'react';
import { CardProduct } from '../cardProduct/CardProduct';
import { CardOrderInfo } from '../cardOrderInfo/CardOrderInfo';
import { getProductsByPedidoId, updateStatePedido } from '../../services/pedidos.services';
import { ModalConfirm } from '../modal/Modal';

export function Order({ order, handleRefreshOrders}) {
    const [open, setOpen] = useState(false)
    const cssClassName = classStatusEnum[order.status];
    const [openModal, setOpenModal] = useState(false);
    const [statusConfirm, setStatusConfirm] = useState();
    const [products, setProducts] = useState([])

    const handleUpdateState = () => {
        updateStatePedido({id: order.id, status:statusConfirm}).then(() => handleRefreshOrders());
    }

    const handleOpenModal = (event, open, action) => {
        event.preventDefault();
        event.stopPropagation(); 
        setStatusConfirm(action);
        setOpenModal(open);
    }

    const handleShowProducts = async() => {
        setOpen(!open);
        const products = await getProductsByPedidoId(order.id);
        setProducts(products)
    }
    
    return (
        <div className={`principal-order ${cssClassName}`} onClick={handleShowProducts}> 
            <CardOrderInfo order={order} enableIcon={true}></CardOrderInfo>
            <div className={`detail-order ${(open ? 'active' : 'inactive')}`}>
                { order?.status === STATUS.BACKLOG &&
                    <div className='order-actions'>
                        <button type='button' className='btn-cancel btn-sm' onClick={(event) => handleOpenModal(event,true, STATUS.CANCELED)}>Cancelar</button>
                        <button type='button' className='btn-add btn-sm' onClick={(event) => handleOpenModal(event,true, STATUS.DONE)}>Entregado</button>
                    </div>
                }
                <hr></hr>
                {products?.map(product => (
                    <CardProduct key={product.id} productItem={product}></CardProduct>
                ))}
            </div>
            <ModalConfirm openModal={openModal} setOpenModal={setOpenModal} accept={handleUpdateState} ></ModalConfirm>
        </div>
    )
}