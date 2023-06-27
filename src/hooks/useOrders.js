import { useEffect, useMemo, useState } from 'react';
import { formatDate } from '../utils/formatDate';
import { getPedidos } from '../services/pedidos.services';
import { STATUS, getValueStatus } from '../general/Status';
import { get } from 'react-hook-form';

export function useOrders(pagination){
    const [orders, setOrders] = useState([])
    const [statusFilter, setStatusFilter] = useState(STATUS.BACKLOG) 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [lastItem, setLastItem] = useState(null)
    const [totalItems, setTotalItems] = useState(0)

    const getOrders = async () =>{
        setLoading(true);
        await getPedidos(statusFilter, pagination)
        .then(({pedidos, lastItem,totalItems}) => {setOrders(pedidos); setLastItem(lastItem);setTotalItems(totalItems);})
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }

    const getOrdersPage = async () =>{
        setLoading(true);
        await getPedidos(statusFilter, pagination, lastItem)
        .then(({pedidos, lastItem, totalItems}) => {setOrders([...orders,...pedidos]); setLastItem(lastItem); setTotalItems(totalItems)})
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }

    useEffect(() => {
        getOrders(statusFilter);
        //clean effect
        return () => {}
    }, [statusFilter])

  
   const sortOrders = useMemo(() => {
        return orders.slice()
        .sort((a,b) => a.fechaEntrega.localeCompare(b.fechaEntrega))
        .sort((a, b) =>   {
            if(getValueStatus(b.status) > getValueStatus(a.status)){
                return 1;
            }
            if(getValueStatus(b.status) < getValueStatus(a.status)){
                return -1;
            }
            return 0;
        });
    },[orders])

    return {orders: sortOrders,getOrders,getOrdersPage,setStatusFilter,totalItems:totalItems, loading, error};
}