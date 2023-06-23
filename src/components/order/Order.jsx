import { STATUS, classStatusEnum } from '../../general/Status';
import './Order.css'
import { useState } from 'react';
import { CardProduct } from '../cardProduct/CardProduct';
import { CardOrderInfo } from '../cardOrderInfo/CardOrderInfo';
import { updateStatePedido } from '../../services/pedidos.services';
import { ModalConfirm } from '../modal/Modal';

export function Order({ order, getOrders}) {
    const [open, setOpen] = useState(false)
    const cssClassName = classStatusEnum[order.status];
    const [openModal, setOpenModal] = useState(false);
    const [statusComplete, setStatusComplete] = useState();

    const handleStateOrderCancel = () => {
        updateStatePedido({id: order.id, status:statusComplete}).then(() => getOrders());
    }

    const handleOpenModal = (event, open, action) => {
        event.preventDefault();
        event.stopPropagation(); 
        setStatusComplete(action);
        setOpenModal(open);
    }

    
    return (
        <div className={`principal-order ${cssClassName}`} onClick={() => setOpen(!open)}> 
            <CardOrderInfo order={order} enableIcon={true}></CardOrderInfo>
            <div className={`detail-order ${(open ? 'active' : 'inactive')}`}>
                { order?.status === STATUS.BACKLOG &&
                    <div className='order-actions'>
                        <button type='button' className='btn-cancel btn-sm' onClick={(event) => handleOpenModal(event,true, STATUS.CANCELED)}>Cancelar</button>
                        <button type='button' className='btn-add btn-sm' onClick={(event) => handleOpenModal(event,true, STATUS.DONE)}>Entregado</button>
                    </div>
                }
                <hr></hr>
                {order.products.map(product => (
                    <CardProduct key={product.id} productItem={product}></CardProduct>
                ))}
            </div>
            <ModalConfirm openModal={openModal} setOpenModal={setOpenModal} accept={handleStateOrderCancel} ></ModalConfirm>
        </div>
    )
}