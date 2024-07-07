import { addPedido, updatePedido} from "../services/pedidos.services"

export function useNewOrder(){

    const registerOrder = async(orderInfo: any) => {
        return await addPedido(orderInfo)
            .then((order) => {
                return order;
            }).catch((error) => {console.error(error);});
    }

    const updateOrder = async(orderInfo: any) => {
        await updatePedido(orderInfo)
            .then((order) => {
            }).catch((error) => {console.error(error);});
    }
    
    return { registerOrder, updateOrder}
}