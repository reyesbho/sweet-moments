import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { addPedido } from "../services/pedidos.services"

export function useNewOrder(){
    const [newProducts, setNewProducts] = useState([])
    const [order, setOrder] = useState(null)
    const [orderInfo, setOrderInfo] = useState(null)
    const navigate = useNavigate();
    const [toggleState, setToggleState] = useState(1)

    useEffect(() => {
        const neworder = {
            ...orderInfo,
            id: new Date().getUTCMilliseconds(),
            register: 'Reyes Bustamante',
            status: 'BACKLOG',
            numProducts: newProducts.length,
            products: newProducts
        }
        setOrder(neworder)

    }, [orderInfo, newProducts])

    const handleOrderInfo = (orderInfo) => {
        const newOrderInfo = { ...orderInfo,
             cliente: orderInfo.clienteObj.label,
             fechaEntrega: orderInfo.fechaEntrega};
        setOrderInfo(newOrderInfo)
        setToggleState(2)
    }

    const registerOrder = async() => {
        await addPedido(order)
            .then(() => {
                setToggleState(1);
                setOrderInfo(null);
                setOrder(null);
                setNewProducts([]);
                navigate('/');
            }).catch(() => {});
    }

    const handleTab = (event, tabNumber) => {
        event.preventDefault();
        if(tabNumber === 3 && order.products.length <=0){
            return;
        }
        setToggleState(tabNumber)
    }


    return {newProducts, setNewProducts, handleOrderInfo, order, registerOrder, toggleState, handleTab }
}