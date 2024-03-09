import './Orders.css'
import { OrderList } from '../../components/order/OrderList'
import { FaPlusCircle } from 'react-icons/fa'
import { useOrders } from '../../hooks/useOrders'
import { Link } from 'react-router-dom'
import { STATUS } from '../../general/Status'

export function Orders() {
    const { orders, handleRefreshOrders, incrementPagination,changeStatusFilter,totalItems} = useOrders()

 
    return (
        <div className="orders">
            <Link to={"/new-order"}><FaPlusCircle size="3rem" className='color-success'></FaPlusCircle></Link>
            <h2>Mis pedidos</h2>
            <div className='orders-options'>
                
                <div className='orders-filters'>
                    <button onClick={() => changeStatusFilter(STATUS.INCOMPLETE)}>Incompleto</button>
                    <button onClick={() => changeStatusFilter(STATUS.BACKLOG)}>Por hacer</button>
                    <button onClick={() => changeStatusFilter(STATUS.DONE)}>Entregados</button>
                    <button onClick={() => changeStatusFilter(STATUS.CANCELED)}>Cancelados</button>
                </div>
            </div>
            <OrderList orders={orders} incrementPagination={incrementPagination} totalItems={totalItems} handleRefreshOrders={handleRefreshOrders} ></OrderList>
            <p>{`Número de pedidos ${totalItems}`}</p>
        </div>
    )
}