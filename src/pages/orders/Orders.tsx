import './Orders.css'
import { OrderList } from '../../components/order/OrderList'
import { FaPlusCircle } from 'react-icons/fa'
import { useOrders } from '../../hooks/useOrders'
import { Link } from 'react-router-dom'
import { useStatus } from '../../hooks/useStatus'
import { useState } from 'react'
import { STATUS_FILTER } from '../../general/Status'
import { DateRangePicker } from 'rsuite';
import 'rsuite/DateRangePicker/styles/index.css';
import format from 'date-fns/format';
import { predefinedRanges } from '../../general/Constants'
import { formatDate } from '../../utils/formatDate'
import dayjs from 'dayjs'

export function Orders() {
    const [status, setStatus] = useState<String>(STATUS_FILTER.ALL)
    
    const { orders, handleRefreshOrders, incrementPagination,changeStatusFilter,handleDateFilter,totalItems, statusFilter} = useOrders(status)
    const {cssClassStatus, handleSetStatus} = useStatus(status);
    
    const handleChangeStatusFilter = (status: String) => {
        setStatus(status);
        changeStatusFilter(status);
        handleSetStatus(status);
    }

    const handleChangeDate = (range:any) => {
        const dateInit = dayjs(range[0]).format('DD-MM-YYYY');
        const dateEnd = dayjs(range[1]).format('DD-MM-YYYY');
        handleDateFilter(dateInit, dateEnd);
    }
    const onShortcutClick = (shortcut:any, event:any) => {
        const dateInit = dayjs(shortcut.value[0]).format('DD-MM-YYYY');
        const dateEnd = dayjs(shortcut.value[1]).format('DD-MM-YYYY');
        handleDateFilter(dateInit, dateEnd);
      }

    const onCleanable = () => {
        handleDateFilter(null, null);
    }
 
    return (
        <div className="orders">
            <Link to={"/new-order"}><FaPlusCircle size="3rem" className='color-success'></FaPlusCircle></Link>
            <h2>Mis pedidos</h2>
            <div className='orders-options'>
                <div className='orders-filters'>
                    <DateRangePicker showOneCalendar size="lg" placeholder="Select Date Range" appearance="subtle" 
                    cleanable={true}
                    onClean={onCleanable}
                    ranges={predefinedRanges}
                    onOk={handleChangeDate}
                    onShortcutClick={onShortcutClick}
                    renderValue={([start, end]) => {
                        return format(start, 'dd/MM/yyyy') + ' - ' + format(end, 'dd/MM/yyyy');
                    }}/>
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