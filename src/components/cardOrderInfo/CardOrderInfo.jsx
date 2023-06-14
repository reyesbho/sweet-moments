import { MdPlace } from 'react-icons/md';
import { IoIosArrowForward } from "react-icons/io";
import { iconStatusEnum } from '../../general/Status';
import './CardOrderInfo.css'

export function CardOrderInfo({ order, enableIcon,styleStatus }) {
    const iconStatus = iconStatusEnum[order.status];
    return (
        <div className={`order-info ${styleStatus}`}>
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
            {enableIcon &&
                <button className='order-button-detail'>
                    <IoIosArrowForward size="2.5rem" />
                </button>
            }

        </div>
    )
}