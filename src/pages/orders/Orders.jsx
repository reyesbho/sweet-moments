import './Orders.css'
import { OrderList } from '../../components/order/OrderList'
import { FaPlusCircle } from 'react-icons/fa'
import { useOrders } from '../../hooks/useOrders'
import { Link } from 'react-router-dom'
import { STATUS } from '../../general/Status'
import ReactPaginate from 'react-paginate'
import { useState } from 'react'

export function Orders() {
    const [dataPagination, setDataPagination] = useState({
        pageSize: 10,
        totalItems: 0,
        itemOffset: 0,
        endOffset:0,
    })
    const { orders, getOrders, getOrdersPage,setStatusFilter, totalItems, loading } = useOrders(dataPagination)

    const handleFilterStatus = (status) => {
        setStatusFilter(status);
        setDataPagination({
            pageSize: 10,
            totalItems: 0,
            itemOffset: 0,
            endOffset:15
        })
    }

    return (
        <div className="orders">
            <Link to={"/new-order"}><FaPlusCircle size="3rem" className='color-success'></FaPlusCircle></Link>
            <h2>Mis pedidos</h2>
            <div className='orders-options'>
                
                <div className='orders-filters'>
                    <button onClick={() => handleFilterStatus(STATUS.BACKLOG)}>Por hacer</button>
                    <button onClick={() => handleFilterStatus(STATUS.DONE)}>Entregados</button>
                    <button onClick={() => handleFilterStatus(STATUS.CANCELED)}>Cancelados</button>
                </div>
            </div>
            <OrderList orders={orders} getOrders={getOrders} getOrdersPage={getOrdersPage} isLoading={loading} totalItems={totalItems} ></OrderList>
            <p>{`Total de pedidos ${totalItems}`}</p>
        </div>
    )
}