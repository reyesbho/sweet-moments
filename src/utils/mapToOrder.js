import { formatDate } from "./formatDate";

export function mapToOrder({pedido}){
    return {
        id:pedido.id,
        cliente:`${pedido.cliente.nombre} ${pedido.cliente.apellidoPaterno}`,
        lugarEntrega: pedido.lugarEntrega,
        fechaEntrega : formatDate(pedido.fechaEntrega),
        register: "Reyes Bustamante",
        status:pedido.estatus,
        numProducts: 10,
        total: pedido.total,
        registerDate:formatDate(pedido.fechaRegistro),
        updateDate: formatDate(pedido.fechaActualizacion)
    };
}