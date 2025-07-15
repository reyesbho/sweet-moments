import { MdPlace } from 'react-icons/md';
import './CardOrderInfo.css'
import { formatDateTime } from '../../utils/formatDate';
import { FaClock, FaUser } from 'react-icons/fa';
import { Pedido } from '../../general/interfaces/pedido';

export function CardOrderInfo({ order, enableIcon }: { order: Pedido, enableIcon:boolean}) {

    return (
        <div className={`order-info`}>
                
                <div className='order-information'>
                    <p className='order-client'><FaUser/>{order.cliente}</p>
                    <p className='order-client'><MdPlace></MdPlace>{order.lugarEntrega}</p>
                    <p className='order-client'><FaClock />
                    {formatDateTime(order.fechaEntrega)}</p>
                </div>
                <div className='order-total'>
                    <p className='order-client'>Productos: {order.productos.length}</p>
                    <p className='order-client'>Total: {order.total}</p>
                </div>
                <div className='order-data'>
                    <p>Registrado por: {order.registradoPor}</p>
                </div>
           

        </div>
    )
}