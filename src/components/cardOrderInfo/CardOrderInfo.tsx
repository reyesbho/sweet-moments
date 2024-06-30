import { MdPlace } from 'react-icons/md';
import { IoIosArrowForward } from "react-icons/io";
import { iconStatusEnum } from '../../general/Status';
import './CardOrderInfo.css'
import { useNavigate } from 'react-router-dom';
import { formatDate, formatTime } from '../../utils/formatDate';
import { OrderDto } from '../../general/Interfaces';

export function CardOrderInfo({ order, enableIcon }: { order: OrderDto, enableIcon:boolean}) {
    const iconStatus = iconStatusEnum(order.status, '1.5rem');
    const navigate = useNavigate();
    const handleClicDetail = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        navigate(`/order/${order.id}`);
    }
    return (
        <div className={`order-info`}>
                
                <div className='order-information'>
                    <p className='order-client'><span className='order-icon-status'>{iconStatus}</span>{order.cliente}</p>
                    <p className='order-place'><MdPlace></MdPlace> {order.lugarEntrega}</p>
                    <p className='order-place'>{formatDate(order.fechaEntrega)} {formatTime(order.horaEntrega)}</p>
                </div>
                <div className='order-total'>
                    <p>Productos: {order.numProducts}</p>
                    <span>Total: ${order.total}.00</span>
                </div>
                <div className='order-data'>
                    
                    <p>Registrado por: {order.register}</p>
                </div>
           

        </div>
    )
}