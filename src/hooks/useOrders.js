import { useEffect, useMemo, useState } from 'react';
import { formatDate } from '../utils/formatDate';
import { getPedidos } from '../services/pedidos.services';

export function useOrders(){
    const [orders, setOrders] = useState([])
    const [today, setToday] = useState(formatDate(new Date()))
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const getOrders = () =>{
        setLoading(true);
        getPedidos()
        .then(newPedidos => setOrders(newPedidos))
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }

    useEffect(() => {
        setToday(formatDate(new Date()));
        getOrders();
    }, [])

  
   const sortOrders = useMemo(() => {
        return orders.slice()
        .filter(order => formatDate(order.fechaEntrega).localeCompare((today)) == 1)
        .sort((a, b) =>  a.fechaEntrega.localeCompare(b.fechaEntrega));
    },[orders, today])

    return {orders: sortOrders, loading, error};
}