import { useEffect, useMemo, useState } from 'react';
import { getPedidos } from '../services/pedidos.services';
import { paginationInit } from '../general/Constants';
import { compareDesc } from 'date-fns';
import { toast } from 'react-toastify';
import { Pedido } from '../general/interfaces/pedido';

export function useOrders(status: String){
    const [orders, setOrders] = useState<Pedido[]>([])
    const [statusFilter, setStatusFilter] = useState<String>(status) 
    const [dateInit, setDateInit ] = useState<String | null>(null);
    const [dateEnd, setDateEnd ] = useState<String | null>(null);
    const [loading, setLoading] = useState(false);
    
    const [pagination, setPagination] = useState(paginationInit)

    const getOrders = async () =>{
        setLoading(true);
        await getPedidos(statusFilter,dateInit, dateEnd, pagination)
        .then(({pedidos, total, nextCursor, hasMore}) => {
            setOrders([...pedidos]); 
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
        .then(({pedidos, total, nextCursor, hasMore}) => {
            setOrders([...pedidos]); 
            setPagination(paginationInit);
        })
        .catch((error: Error) => toast.error(error.message))
        .finally(() => setLoading(false));
    }

   const sortOrders = useMemo(() => {
        const ordersAux = orders.slice().sort((a,b) => {
            return compareDesc(new Date(b.fechaEntrega.seconds * 1000), new Date(a.fechaEntrega.seconds * 1000));
        });
        return ordersAux;
    },[orders])

    return {orders: sortOrders,handleRefreshOrders,incrementPagination, changeStatusFilter,handleDateFilter, statusFilter};
}