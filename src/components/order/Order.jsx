import { classStatusEnum } from '../../general/Status';
import './Order.css'
import { useState } from 'react';
import { CardProduct } from '../cardProduct/CardProduct';
import { CardOrderInfo } from '../cardOrderInfo/CardOrderInfo';

export function Order({ order }) {
    const [open, setOpen] = useState(false)
    const cssClassName = classStatusEnum[order.status];
   

    return (
        <div className={`pricipal-order ${cssClassName}`} onClick={() => setOpen(!open)}>
            <CardOrderInfo order={order}></CardOrderInfo>
            <div className={`detail-order ${(open ? 'active' : 'inactive')}`}>
                <hr></hr>
                {order.products.map(product => (
                    <CardProduct key={product.id} productItem={product}></CardProduct>
                ))}
            </div>
        </div>
    )
}