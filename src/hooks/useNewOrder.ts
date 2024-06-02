import { useNavigate } from "react-router-dom"
import { addPedido} from "../services/pedidos.services"

export function useNewOrder(){
    const navigate = useNavigate();

    const registerOrder = async(orderInfo: any) => {
        const neworder = {
            ...orderInfo,
            cliente: orderInfo.cliente,
            fechaEntrega: orderInfo.fechaEntrega,
            register: 'Reyes Bustamante',
            status: 'BACKLOG',
        }
        
        await addPedido(neworder)
            .then((order) => {
                navigate(`/order/${order.id}`,{ replace: true });
            }).catch((error) => {console.error(error);});
    }
    
    return { registerOrder}
}