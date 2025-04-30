import { MdPlace } from 'react-icons/md';
import './CardOrderInfo.css'
import { formatDateTime } from '../../utils/formatDate';
import { FaClock, FaUser } from 'react-icons/fa';
import { OrderDto } from '../../general/Dtos';
import { getNameClient } from '../../general/Constants';

export function CardOrderInfo({ order, enableIcon }: { order: OrderDto, enableIcon:boolean}) {

    return (
        <div className={`order-info`}>
                
                <div className='order-information'>
                    <p className='order-client'><FaUser/>{getNameClient(order)}</p>
                    <p className='order-client'><MdPlace></MdPlace>{order.lugarEntrega}</p>
                    <p className='order-client'><FaClock />
                    {formatDateTime(order.fechaEntrega)}</p>
                </div>
                <div className='order-total'>
                    <p className='order-client'>Productos: {order.numProducts}</p>
                    <p className='order-client'>Total: ${order.total}.00</p>
                </div>
                <div className='order-data'>
                    <p>Registrado por: {order.register}</p>
                </div>
           

        </div>
    )
}