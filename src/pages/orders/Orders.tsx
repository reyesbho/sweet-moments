import './Orders.css'
import { OrderList } from '../../components/order/OrderList'
import { FaPlusCircle } from 'react-icons/fa'
import { useOrders } from '../../hooks/useOrders'
import { useStatus } from '../../hooks/useStatus'
import { useState, useEffect } from 'react'
import { iconStatusEnum, STATUS_FILTER } from '../../general/Status'
import { DateRangePicker } from 'rsuite';
import 'rsuite/DateRangePicker/styles/index.css';
import format from 'date-fns/format';
import { predefinedRanges } from '../../general/Constants';
import dayjs from 'dayjs';
import { NewOrder } from '../../components/new-order/NewOrder';
import { useNavigate, useLocation } from 'react-router-dom';
import { useModalConfirm } from '../../hooks/useModalConfirm'
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';

export function Orders() {
    const [status, setStatus] = useState<string>(STATUS_FILTER.BACKLOG)
    const { orders, handleRefreshOrders, incrementPagination,changeStatusFilter,handleDateFilter, statusFilter} = useOrders(status)
    const {cssClassStatus, handleSetStatus} = useStatus(status);
    const {show, handleShow, handleClose} = useModalConfirm();
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
    const location = useLocation();
    const dateParam = location.state?.date;

    useEffect(() => {
    
      if (dateParam) {
        // Aplica el filtro de fecha solo para ese día
        handleDateFilter(dateParam, dateParam);
        // Setea el valor inicial del DateRangePicker
        const parsedDate = dayjs(dateParam, 'DD-MM-YYYY').toDate();
        setDateRange([parsedDate, parsedDate]);
      } else {
        setDateRange(null);
      }
    }, [location.search]);

    const handleChangeStatusFilter = (status: string) => {
        setStatus(status);
        changeStatusFilter(status);
        handleSetStatus(status);
    }

    const handleChangeDate = (range:any) => {
        if (range && range[0] instanceof Date && range[1] instanceof Date) {
          setDateRange([range[0], range[1]]);
          const dateInit = dayjs(range[0]).format('DD-MM-YYYY');
          const dateEnd = dayjs(range[1]).format('DD-MM-YYYY');
          handleDateFilter(dateInit, dateEnd);
        }
    }
    const onShortcutClick = (shortcut:any, event:any) => {
        if (shortcut.value && shortcut.value[0] instanceof Date && shortcut.value[1] instanceof Date) {
          setDateRange([shortcut.value[0], shortcut.value[1]]);
          const dateInit = dayjs(shortcut.value[0]).format('DD-MM-YYYY');
          const dateEnd = dayjs(shortcut.value[1]).format('DD-MM-YYYY');
          handleDateFilter(dateInit, dateEnd);
        }
      }

    const onCleanable = () => {
        setDateRange(null);
        const dateInit = dayjs(startOfMonth(new Date())).format('DD-MM-YYYY');
        const dateEnd = dayjs(endOfMonth(new Date())).format('DD-MM-YYYY');
        handleDateFilter(dateInit, dateEnd);
    }

    const navigateDetail = (idOrder: number) => {
        navigate(`/order/${idOrder}`);
    }

    const statusButtons = [
        { label: 'Todos', value: STATUS_FILTER.ALL },
        { label: 'Incompleto', value: STATUS_FILTER.INCOMPLETE },
        { label: 'Por hacer', value: STATUS_FILTER.BACKLOG },
        { label: 'Entregados', value: STATUS_FILTER.DONE },
        { label: 'Cancelados', value: STATUS_FILTER.CANCELED }
      ];

    const renderStatusButtons = () => statusButtons.map(({ label, value }) => (
        <button
          key={value}
          className={`btn btn-pill ${statusFilter === value ? cssClassStatus : ''}`}
          onClick={() => handleChangeStatusFilter(value)}
        >
          {value !== STATUS_FILTER.ALL && <span>{iconStatusEnum(value, '1rem')}</span>}
          {label}
        </button>
      ));
 
    return (
        <div className="orders">
            <div className="subtitle">
            <h1>Mis pedidos</h1>
            <button className='subtitle-add'  onClick={(event) => handleShow(event)}>
                <FaPlusCircle size="3rem" className='color-success'></FaPlusCircle>
            </button>
        </div>
            <div className='orders-options'>
                <div className='orders-filters'>
                    <div className='periodo-filter'>
                        <DateRangePicker id='periodo-filtro' showOneCalendar size="lg" placeholder="Seleccionar el periodo" appearance="subtle" 
                        cleanable={true}
                        onClean={onCleanable}
                        ranges={predefinedRanges}
                        value={dateRange ?? undefined}
                        onOk={handleChangeDate}
                        onShortcutClick={onShortcutClick}
                        renderValue={([start, end]) => {
                            return format(start, 'dd/MM/yyyy') + ' - ' + format(end, 'dd/MM/yyyy');
                        }}/>
                    </div>
                    <div className='status-filters'>
                        {renderStatusButtons()}
                    </div>
                </div>
            </div>
            <OrderList orders={orders} handleRefreshOrders={handleRefreshOrders} ></OrderList>
            <p>{`Número de pedidos ${orders.length}`}</p>
            {
                show && 
                <NewOrder handleClose={handleClose} orderDto={null} reload={navigateDetail}></NewOrder>
            }
        </div>
    )
}