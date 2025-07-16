import { toast } from "react-toastify";
import { addPedido, updatePedido} from "../services/pedidos.services"
import { Pedido } from "../general/interfaces/pedido";

export function useNewOrder(){
    const registerOrder = async(orderInfo: Pedido) => {
        try{
            const order = await addPedido(orderInfo);
            toast.success("Registrado correctamente");
            return order;
        }catch(error) {
            toast.error("Error al registrar el pedido");
            throw new Error("Error al registrar el pedido");
        }
    }

    const updateOrder = async(orderInfo: Pedido):Promise<Pedido> => {
        try{
            const order = await updatePedido(orderInfo);
            toast.success("Actualizado correctamente");
            return order;
        }catch(error) {
            toast.error("Error al actualizar el pedido");
            throw new Error("Error al actualizar el pedido");
        }
    }
    
    return { registerOrder, updateOrder}
}