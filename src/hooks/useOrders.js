import { useEffect, useMemo, useState } from 'react';
import { formatDate } from '../utils/formatDate';
import { getPedidos } from '../services/pedidos.services';
import { STATUS, getValueStatus } from '../general/Status';
import { get } from 'react-hook-form';

export function useOrders(){
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const getOrders = async () =>{
        setLoading(true);
        await getPedidos()
        .then(newPedidos => setOrders(newPedidos))
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }

    useEffect(() => {
        getOrders();
        //clean effect
        return () => {}
    }, [])

  
   const sortOrders = useMemo(() => {
        const today = new Date();
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

    return {orders: sortOrders,getOrders, loading, error};
}