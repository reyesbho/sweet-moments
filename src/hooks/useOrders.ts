import { useEffect, useMemo, useState } from 'react';
import { getPedidos } from '../services/pedidos.services';
import { paginationInit } from '../general/Constants';
import { compareDesc } from 'date-fns';
import { toast } from 'react-toastify';
import { OrderDto } from '../general/Dtos';

export function useOrders(status: String){
    const [orders, setOrders] = useState<OrderDto[]>([])
    const [statusFilter, setStatusFilter] = useState<String>(status) 
    const [dateInit, setDateInit ] = useState<String | null>(null);
    const [dateEnd, setDateEnd ] = useState<String | null>(null);
    const [loading, setLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0)
    const [pagination, setPagination] = useState(paginationInit)

    const getOrders = async () =>{
        setLoading(true);
        await getPedidos(statusFilter,dateInit, dateEnd, pagination)
        .then(({pedidos, totalItems}) => {
            setOrders([...orders,...pedidos]); 
            setTotalItems(totalItems);
        })
        .catch((error: Error) => toast.error(error.message))
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
        .catch((error: Error) => toast.error(error.message))
        .finally(() => setLoading(false));
    }

   const sortOrders = useMemo(() => {
        const ordersAux = orders.slice().sort((a,b) => {
            return compareDesc(b.fechaEntrega, a.fechaEntrega);
        });
        return ordersAux;
    },[orders])

    return {orders: sortOrders,handleRefreshOrders,incrementPagination, changeStatusFilter,handleDateFilter,totalItems, statusFilter};
}