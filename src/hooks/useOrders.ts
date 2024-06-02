import { useEffect, useMemo, useState } from 'react';
import { getPedidos } from '../services/pedidos.services';
import { paginationInit } from '../general/Constants';
import { OrderDto } from '../general/Interfaces';
import dayjs from 'dayjs';

export function useOrders(status: String){
    const [orders, setOrders] = useState<OrderDto[]>([])
    const [statusFilter, setStatusFilter] = useState<String>(status) 
    const [date, setDate ] = useState<String>(dayjs(Date.now()).format('DD-MM-YYYY'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [totalItems, setTotalItems] = useState(0)
    const [pagination, setPagination] = useState(paginationInit)

    const getOrders = async () =>{
        setLoading(true);
        await getPedidos(statusFilter,date, pagination)
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
    }, [pagination, statusFilter, date])

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


    const handleDateFilter = (newDate: string) => {
        if(date === newDate){
            return
        }
        setOrders([]);
        setPagination(paginationInit);
        setStatusFilter(statusFilter);
        setDate(newDate)
    }

    const handleRefreshOrders = async() => {
        setLoading(true);
        await getPedidos(statusFilter,date, paginationInit)
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

    return {orders: sortOrders,handleRefreshOrders,incrementPagination, changeStatusFilter,handleDateFilter,totalItems, statusFilter};
}