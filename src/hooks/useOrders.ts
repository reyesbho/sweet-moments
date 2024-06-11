import { useEffect, useMemo, useState } from 'react';
import { getPedidos } from '../services/pedidos.services';
import { paginationInit } from '../general/Constants';
import { OrderDto } from '../general/Interfaces';
import dayjs from 'dayjs';
import { dateOptions, timeOptions } from '../utils/formatDate';
import { compareDesc } from 'date-fns';

export function useOrders(status: String){
    const [orders, setOrders] = useState<OrderDto[]>([])
    const [statusFilter, setStatusFilter] = useState<String>(status) 
    const [dateInit, setDateInit ] = useState<String | null>(null);
    const [dateEnd, setDateEnd ] = useState<String | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [totalItems, setTotalItems] = useState(0)
    const [pagination, setPagination] = useState(paginationInit)

    const getOrders = async () =>{
        setLoading(true);
        await getPedidos(statusFilter,dateInit, dateEnd, pagination)
        .then(({pedidos, totalItems}) => {
            setOrders([...orders,...pedidos]); 
            setTotalItems(totalItems);
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }

    useEffect(() => {
        getOrders();
        //clean effect
        return () => {}
    }, [pagination, statusFilter, dateInit, dateEnd])

    const incrementPagination = () => {
        const newPagination = {...pagination, page: pagination.page + 1};
        setPagination(newPagination);
    }

    const changeStatusFilter = (newStatus: String) => {
        if(statusFilter === newStatus){
            return
        }
        setOrders([]);
        setPagination(paginationInit);
        setStatusFilter(newStatus);
    }


    const handleDateFilter = (newDateInit: string | null, newDateEnd: string | null) => {
        if(dateInit === newDateInit && dateEnd === newDateEnd){
            return
        }
        setOrders([]);
        setPagination(paginationInit);
        setStatusFilter(statusFilter);
        setDateInit(newDateInit);
        setDateEnd(newDateEnd);
    }

    const handleRefreshOrders = async() => {
        setLoading(true);
        await getPedidos(statusFilter,dateInit, dateEnd, paginationInit)
        .then(({pedidos, totalItems}) => {
            setOrders([...pedidos]); 
            setTotalItems(totalItems);
            setPagination(paginationInit);
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }

   const sortOrders = useMemo(() => {
        const ordersAux = orders.slice().sort((a,b) => {
            const dateOne = new Date(a.fechaEntrega.toLocaleString("es-MX",dateOptions));
            const dateOneHour = new Date(a.horaEntrega.toLocaleString("es-MX",timeOptions));
            dateOne.setHours(dateOneHour.getHours());
            dateOne.setMinutes(dateOneHour.getMinutes());
            dateOne.setSeconds(dateOneHour.getSeconds());
            
            const dateTwo = new Date(b.fechaEntrega.toLocaleString("es-MX",dateOptions));
            const dateTwoTime = new Date(b.horaEntrega.toLocaleString("es-MX",timeOptions));
            dateTwo.setHours(dateTwoTime.getHours());
            dateTwo.setMinutes(dateTwoTime.getMinutes());
            dateTwo.setSeconds(dateTwoTime.getSeconds());
   
            return compareDesc(dateTwo, dateOne);
        });
        return ordersAux;
    },[orders])

    return {orders: sortOrders,handleRefreshOrders,incrementPagination, changeStatusFilter,handleDateFilter,totalItems, statusFilter};
}