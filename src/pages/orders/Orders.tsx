import './Orders.css'
import { OrderList } from '../../components/order/OrderList'
import { FaPlusCircle } from 'react-icons/fa'
import { useOrders } from '../../hooks/useOrders'
import { useStatus } from '../../hooks/useStatus'
import { useState } from 'react'
import { iconStatusEnum, STATUS_FILTER } from '../../general/Status'
import { DateRangePicker } from 'rsuite';
import 'rsuite/DateRangePicker/styles/index.css';
import format from 'date-fns/format';
import { predefinedRanges } from '../../general/Constants';
import dayjs from 'dayjs';
import { NewOrder } from '../../components/new-order/NewOrder';
import { useNavigate } from 'react-router-dom';
import { useModalConfirm } from '../../hooks/useModalConfirm'

export function Orders() {
    const [status, setStatus] = useState<String>(STATUS_FILTER.ALL)
    const { orders, handleRefreshOrders, incrementPagination,changeStatusFilter,handleDateFilter,totalItems, statusFilter} = useOrders(status)
    const {cssClassStatus, handleSetStatus} = useStatus(status);
    const {show, handleShow, handleClose} = useModalConfirm();
    const navigate = useNavigate();

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

    const navigateDetail = (idOrder: number) => {
        navigate(`/order/${idOrder}`);
    }

 
    return (
        <div className="orders">
            <button className='orders-add'><FaPlusCircle size="3rem" className='color-success' onClick={(event) => handleShow(event)}></FaPlusCircle></button>
            <h2>Mis pedidos</h2>
            <div className='orders-options'>
                <div className='orders-filters'>
                    <div className='periodo-filter'>
                        <label htmlFor="periodo-filtro">Periodo</label>
                        <DateRangePicker id='periodo-filtro' showOneCalendar size="lg" placeholder="Seleccionar el periodo" appearance="subtle" 
                        cleanable={true}
                        onClean={onCleanable}
                        ranges={predefinedRanges}
                        onOk={handleChangeDate}
                        onShortcutClick={onShortcutClick}
                        renderValue={([start, end]) => {
                            return format(start, 'dd/MM/yyyy') + ' - ' + format(end, 'dd/MM/yyyy');
                        }}/>
                    </div>
                    <div className='status-filters'>
                        <label >Estatus</label>
                        <button className={(statusFilter === STATUS_FILTER.ALL ? `btn btn-pill ${cssClassStatus}` : 'btn btn-pill')} onClick={() => handleChangeStatusFilter(STATUS_FILTER.ALL)}>Todos</button>
                        <button className={(statusFilter === STATUS_FILTER.INCOMPLETE ? `btn btn-pill ${cssClassStatus}` : 'btn btn-pill')} onClick={() => handleChangeStatusFilter(STATUS_FILTER.INCOMPLETE)}>
                            <span >{iconStatusEnum(STATUS_FILTER.INCOMPLETE, "1rem")}</span> 
                            Incompleto
                        </button>
                        <button className={(statusFilter === STATUS_FILTER.BACKLOG ? `btn btn-pill ${cssClassStatus}` : 'btn btn-pill')} onClick={() => handleChangeStatusFilter(STATUS_FILTER.BACKLOG)}>
                            <span >{iconStatusEnum(STATUS_FILTER.BACKLOG, '1rem')} </span>
                            Por hacer
                        </button>
                        <button className={(statusFilter === STATUS_FILTER.DONE ? `btn btn-pill ${cssClassStatus}` : 'btn btn-pill')} onClick={() => handleChangeStatusFilter(STATUS_FILTER.DONE)}>
                            <span >{iconStatusEnum(STATUS_FILTER.DONE, '1rem')} </span>
                            Entregados
                        </button>
                        <button className={(statusFilter === STATUS_FILTER.CANCELED ? `btn btn-pill ${cssClassStatus}` : 'btn btn-pill')} onClick={() => handleChangeStatusFilter(STATUS_FILTER.CANCELED)}>
                            <span >{iconStatusEnum(STATUS_FILTER.CANCELED, '1rem')} </span>
                            Cancelados
                        </button>
                    </div>
                </div>
            </div>
            <OrderList orders={orders} incrementPagination={incrementPagination} totalItems={totalItems} handleRefreshOrders={handleRefreshOrders} ></OrderList>
            <p>{`Número de pedidos ${totalItems}`}</p>
            {
                show && 
                <NewOrder handleClose={handleClose} orderDto={null} reload={navigateDetail}></NewOrder>
            }
        </div>
    )
}