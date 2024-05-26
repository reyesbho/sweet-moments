import './Orders.css'
import { OrderList } from '../../components/order/OrderList'
import { FaPlusCircle } from 'react-icons/fa'
import { useOrders } from '../../hooks/useOrders'
import { Link } from 'react-router-dom'
import { useStatus } from '../../hooks/useStatus'
import { useState } from 'react'
import { STATUS_FILTER } from '../../general/Status'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from 'dayjs'

export function Orders() {
    const [status, setStatus] = useState<String>(STATUS_FILTER.BACKLOG)
    const [startDate, setStartDate] = useState<Dayjs>(dayjs(Date.now()));
    const { orders, handleRefreshOrders, incrementPagination,changeStatusFilter,handleDateFilter,totalItems, statusFilter} = useOrders(status)
    const {cssClassStatus, handleSetStatus} = useStatus(status);

    
    const handleChangeStatusFilter = (status: String) => {
        setStatus(status);
        changeStatusFilter(status);
        handleSetStatus(status);
    }

    const handleChangeDate = (date: Dayjs | null) => {
        handleDateFilter(date?.format('DD-MM-YYYY') ?? dayjs(Date.now()).format('DD-MM-YYYY'));
    }
 
    return (
        <div className="orders">
            <Link to={"/new-order"}><FaPlusCircle size="3rem" className='color-success'></FaPlusCircle></Link>
            <h2>Mis pedidos</h2>
            <div className='orders-options'>
                <div className='orders-filters'>
                    <DatePicker value={startDate} onChange={handleChangeDate} format='DD/MM/YYYY'/>
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