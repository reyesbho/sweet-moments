import './OrderList.css'
import { IoIosArrowForward } from "react-icons/io";
import {FaCheckSquare, FaHourglassStart, } from 'react-icons/fa'
import { MdOutlineCancel } from "react-icons/md";
import { STATUS } from '../../general/Status';
export function OrderList({ordersInit}){
    console.log(ordersInit)
    const orders = ordersInit.slice()
    .sort((a, b) =>  { 
        if(a.status == STATUS.BACKLOG && (a.fechaEntrega.localeCompare(new Date()) === 1) ){
            return  -1 + a.fechaEntrega.localeCompare(b.fechaEntrega);
        }
        if(a.status == STATUS.DONE && (a.fechaEntrega.localeCompare(new Date()) === 1)){
            return  0 + a.fechaEntrega.localeCompare(b.fechaEntrega);
        }
        if(a.status == STATUS.BACKLOG && (a.fechaEntrega.localeCompare(new Date()) === 1)){
            return  1 + a.fechaEntrega.localeCompare(b.fechaEntrega);
        }
     });

    return (
        <div className="order-list">{
        orders && orders.map((order) => (
            <div key={order.id} className={order.status === 'DONE' ? 'order order-status-success' :
                    order.status === 'BACKLOG' ? 'order order-status-backlog' : 'order order-status-wrong'}>
                <span className='order-icon-status'>
                    {order.status === 'DONE' ? <FaCheckSquare size="2.5rem" className='color-success'></FaCheckSquare> :
                    order.status === 'BACKLOG' ? <FaHourglassStart size="2.5rem" className='color-backlog'></FaHourglassStart> :
                    <MdOutlineCancel size="2.5rem" className='color-wrong'></MdOutlineCancel>}
                </span>
                <div className='order-information'>
                    <span>{order.cliente}</span>
                    <p>{order.lugarEntrega}</p>
                    <p>Num. products: {order.numProducts}</p>
                </div>
                <div className='order-metadata'>
                    <span>{order.fechaEntrega}</span>
                    <p>Registrodo por: {order.register}</p>
                </div>
                <button className='order-detail'>
                    <IoIosArrowForward size="2.5rem"/>
                </button>
            </div>
        ))}
        </div>
    )
}