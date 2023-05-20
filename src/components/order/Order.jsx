import { classStatusEnum, iconStatusEnum } from '../../general/Status';
import './Order.css'
import { IoIosArrowForward } from "react-icons/io";
import { products } from './../../mocks/pedido.json';
import './CardOrder.css';
import { useState } from 'react';

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
                    <p>{order.lugarEntrega}</p>
                    <p>Num. products: {order.numProducts}</p>
                </div>
                <div className='order-metadata'>
                    <span>{order.fechaEntrega}</span>
                    <p>Registrado por: {order.register}</p>
                </div>
                <button className='order-detail'>
                    <IoIosArrowForward size="2.5rem" />
                </button>
            </div>
            <div className={`detail-order ${(open ? 'active' : 'inactive')}`}>
            <hr></hr>
                {products.map(product => (
                    <div key={product.id} className='product'>
                        <img className='product-img' src={product.thumbnail} alt={product.nameProduct}></img>
                        <div className='product-info'>
                            <h6>{product.nameProduct}</h6>
                            {product.text ? <p><strong>Texto: </strong>{product.text}</p> : ''}
                        </div>
                        <ul className='product-properties'>
                            Caracteristicas:
                            {product.properties.map(property => (
                                <li key={property}>{property}</li>
                            ))}
                        </ul>
                        <span className='product-size'>{product.size} personas</span>
                    </div>
                ))}
            </div>
        </div>
    )
}