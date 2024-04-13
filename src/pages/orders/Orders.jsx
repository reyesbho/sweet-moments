import './Orders.css'
import { OrderList } from '../../components/order/OrderList'
import { FaPlusCircle } from 'react-icons/fa'
import { useOrders } from '../../hooks/useOrders'
import { Link } from 'react-router-dom'
import { STATUS} from '../../general/Status'
import { useStatus } from '../../hooks/useStatus'
import { STATUS_FILTER } from '../../general/StatusFilter'

export function Orders() {
    const { orders, handleRefreshOrders, incrementPagination,changeStatusFilter,totalItems, statusFilter} = useOrders(STATUS_FILTER.ALL)
    const {cssClassStatus, handleSetStatus} = useStatus(STATUS_FILTER.ALL);
    const handleChangeStatusFilter = (status) => {
        changeStatusFilter(status);
        handleSetStatus(status);
    }
 
    return (
        <div className="orders">
            <Link to={"/new-order"}><FaPlusCircle size="3rem" className='color-success'></FaPlusCircle></Link>
            <h2>Mis pedidos</h2>
            <div className='orders-options'>
                
                <div className='orders-filters'>
                    <button className={(statusFilter === STATUS_FILTER.ALL ? `btn btn-pill ${cssClassStatus}` : 'btn btn-pill')} onClick={() => handleChangeStatusFilter(STATUS_FILTER.ALL)}>Todos</button>
                    <button className={(statusFilter === STATUS_FILTER.INCOMPLETE ? `btn btn-pill ${cssClassStatus}` : 'btn btn-pill')} onClick={() => handleChangeStatusFilter(STATUS_FILTER.INCOMPLETE)}>Incompleto</button>
                    <button className={(statusFilter === STATUS_FILTER.BACKLOG ? `btn btn-pill ${cssClassStatus}` : 'btn btn-pill')} onClick={() => handleChangeStatusFilter(STATUS_FILTER.BACKLOG)}>Por hacer</button>
                    <button className={(statusFilter === STATUS_FILTER.DONE ? `btn btn-pill ${cssClassStatus}` : 'btn btn-pill')} onClick={() => handleChangeStatusFilter(STATUS_FILTER.DONE)}>Entregados</button>
                    <button className={(statusFilter === STATUS_FILTER.CANCELED ? `btn btn-pill ${cssClassStatus}` : 'btn btn-pill')} onClick={() => handleChangeStatusFilter(STATUS_FILTER.CANCELED)}>Cancelados</button>
                </div>
            </div>
            <OrderList orders={orders} incrementPagination={incrementPagination} totalItems={totalItems} handleRefreshOrders={handleRefreshOrders} ></OrderList>
            <p>{`Número de pedidos ${totalItems}`}</p>
        </div>
    )
}