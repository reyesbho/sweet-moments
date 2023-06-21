import { STATUS, classStatusEnum } from '../../general/Status';
import './Order.css'
import { useState } from 'react';
import { CardProduct } from '../cardProduct/CardProduct';
import { CardOrderInfo } from '../cardOrderInfo/CardOrderInfo';
import { updateStatePedido } from '../../services/pedidos.services';

export function Order({ order, getOrders}) {
    const [open, setOpen] = useState(false)
    const cssClassName = classStatusEnum[order.status];
    
    const handleStateOrder = (state) => {
        updateStatePedido({id: order.id, status:state}).then(() => getOrders());
    }

    return (
        <div className={`principal-order ${cssClassName}`} onClick={() => setOpen(!open)}>
            <CardOrderInfo order={order} enableIcon={true}></CardOrderInfo>
            <div className={`detail-order ${(open ? 'active' : 'inactive')}`}>
                <div className='order-actions'>
                    <button type='button' className='btn-cancel' onClick={() => handleStateOrder(STATUS.CANCELED)}>Cancelar</button>
                    <button type='button' className='btn-add' onClick={() => handleStateOrder(STATUS.DONE)}>Entregado</button>
                </div>
                <hr></hr>
                {order.products.map(product => (
                    <CardProduct key={product.id} productItem={product}></CardProduct>
                ))}
            </div>
        </div>
    )
}