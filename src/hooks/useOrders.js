import { useEffect, useMemo, useState } from 'react';
import { getPedidos } from '../services/pedidos.services';
import { STATUS, getValueStatus } from '../general/Status';
import { paginationInit } from '../general/Constants';

export function useOrders(){
    const [orders, setOrders] = useState([])
    const [statusFilter, setStatusFilter] = useState(STATUS.INCOMPLETE) 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [totalItems, setTotalItems] = useState(0)
    const [pagination, setPagination] = useState(paginationInit)

    const getOrders = async () =>{
        setLoading(true);
        await getPedidos(statusFilter, pagination)
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
    }, [pagination, statusFilter])

    const incrementPagination = () => {
        const newPagination = {...pagination, page: pagination.page + 1};
        setPagination(newPagination);
    }

    const changeStatusFilter = (newStatus) => {
        if(statusFilter === newStatus){
            return
        }
        setOrders([]);
        setPagination(paginationInit);
        setStatusFilter(newStatus);
    }

    const handleRefreshOrders = async() => {
        setLoading(true);
        await getPedidos(statusFilter, paginationInit)
        .then(({pedidos, totalItems}) => {
            setOrders([...pedidos]); 
            setTotalItems(totalItems);
            setPagination(paginationInit);
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }

   const sortOrders = useMemo(() => {
        return orders.slice().sort();
    },[orders])

    return {orders: sortOrders,handleRefreshOrders,incrementPagination, changeStatusFilter,totalItems};
}