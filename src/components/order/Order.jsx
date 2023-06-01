import { classStatusEnum, iconStatusEnum } from '../../general/Status';
import './Order.css'
import { IoIosArrowForward } from "react-icons/io";
import { useState } from 'react';
import { CardProduct } from '../cardProduct/CardProduct';
import { MdPlace } from 'react-icons/md';

export function Order({ order }) {
    const [open, setOpen] = useState(false)
    const cssClassName = classStatusEnum[order.status];
    const iconStatus = iconStatusEnum[order.status];
    

    return (
        <div className={`pricipal-order ${cssClassName}`} onClick={() => setOpen(!open)}>
            <div className="order">
                <span className='order-icon-status'>
                    {iconStatus}
                </span>
                <div className='order-information'>
                    <span>{order.cliente}</span>
                    <p><MdPlace></MdPlace> {order.lugarEntrega}</p>
                </div>
                <div className='order-total'>
                    <p>Productos: {order.numProducts}</p>
                    <span>Total: ${order.total}.00</span>
                </div>
                <div className='order-data'>
                    <span>{order.fechaEntrega}</span>
                    <p>Registrado por: {order.register}</p>
                </div>
                <button className='order-button-detail'>
                    <IoIosArrowForward size="2.5rem" />
                </button>
            </div>
            <div className={`detail-order ${(open ? 'active' : 'inactive')}`}>
            <hr></hr>
                {order.products.map(product => (
                   <CardProduct key={product.id} productItem={product}></CardProduct>
                ))}
            </div>
        </div>
    )
}