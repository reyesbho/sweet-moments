import { useEffect, useMemo, useState } from 'react';
import {pedidos as ordersInit} from './../mocks/pedidos.json'
import { formatDate } from '../utils/formatDate';

export function useOrders(){
    const [orders, setOrders] = useState(ordersInit)
    const [today, setToday] = useState(formatDate(new Date()))

    useEffect(() => {
        setToday(formatDate(new Date()))
    },[orders])
  
   const sortOrders = useMemo(() => {
        return orders.slice()
        .filter(order => formatDate(order.fechaEntrega).localeCompare((today)) == 1)
        .sort((a, b) =>  a.fechaEntrega.localeCompare(b.fechaEntrega));
    },[orders])

    return {orders: sortOrders};
}