import { toast } from "react-toastify";
import { addPedido, updatePedido} from "../services/pedidos.services"

export function useNewOrder(){

    const registerOrder = async(orderInfo: any) => {
        return await addPedido(orderInfo)
            .then((order) => {
                toast.success("Registrado correctamente");
                return order;
            }).catch((error) => {
                toast.error("Error al registrar");
            });
    }

    const updateOrder = async(orderInfo: any) => {
        await updatePedido(orderInfo)
            .then((order) => {
                toast.success("Actualizado correctamente");
            }).catch((error) => {
                toast.error("Error al actualizar");
            });
    }
    
    return { registerOrder, updateOrder}
}