import { MdPlace } from 'react-icons/md';
import { IoIosArrowForward } from "react-icons/io";
import { iconStatusEnum } from '../../general/Status';
import './CardOrderInfo.css'
import { useNavigate } from 'react-router-dom';
import { formatDate, formatTime } from '../../utils/formatDate';
import { OrderDto } from '../../general/Interfaces';

export function CardOrderInfo({ order, enableIcon }: { order: OrderDto, enableIcon:boolean}) {
    const iconStatus = iconStatusEnum[order.status as keyof typeof iconStatusEnum];
    const navigate = useNavigate();
    const handleClicDetail = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        navigate(`/order/${order.id}`);
    }
    return (
        <div className={`order-info`}>
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
                    <span>{formatDate(order.fechaEntrega)} {formatTime(order.horaEntrega)}</span>
                    <p>Registrado por: {order.register}</p>
                </div>
            {enableIcon &&
                <button className='order-button-detail' onClick={(e) => handleClicDetail(e)}>
                        <IoIosArrowForward size="2.5rem" />
                </button>
            }

        </div>
    )
}