import { useEffect, useMemo, useState } from 'react';
import { formatDate } from '../utils/formatDate';
import { getPedidos } from '../services/pedidos.services';

export function useOrders(){
    const [orders, setOrders] = useState([])
    const [today, setToday] = useState(formatDate(new Date()))

    const getOrders = () =>{
        getPedidos().then(newPedidos => setOrders(newPedidos));
    }

    useEffect(() => {
        getOrders()
    }, [])

    useEffect(() => {
        setToday(formatDate(new Date()))
    },[orders])
  
   const sortOrders = useMemo(() => {
        return orders.slice()
        .filter(order => formatDate(order.fechaEntrega).localeCompare((today)) == 1)
        .sort((a, b) =>  a.fechaEntrega.localeCompare(b.fechaEntrega));
    },[orders, today])

    return {orders: sortOrders};
}