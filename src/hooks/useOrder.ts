import { useEffect, useState } from "react";
import {  getPedido, getProductsByPedidoId } from "../services/pedidos.services";
import { classStatusEnum, STATUS } from "../general/Status";
import { toast } from "react-toastify";
import { OrderDto, ProductOrderDto } from "../general/Dtos";


export function useOrder({ orderId }:{orderId: number}) {
  const [orderItem, setOrderItem] = useState<OrderDto | null>();
  const [loading, setLoading] = useState(false);
  const [cssClassName, setCssClassName] = useState("");
  const [hasReturn, setHasReturn] = useState(false);
  const [productos, setProductos] = useState<ProductOrderDto[]>([]);
  

  const getOrder = async () => {
    setLoading(true);
    await getPedido(orderId)
      .then(async(pedido) => {
        setOrderItem(pedido);
        let status = pedido.status as keyof typeof STATUS;
        setCssClassName(classStatusEnum[status]);
        setHasReturn(true);
        getProductos();
      })
      .catch((error: Error) => toast.error(error.message))
      .finally(() => setLoading(false));
  };

  const getProductos = async() => { 
    await getProductsByPedidoId(orderId).
          then((products) => {
              setProductos([...products]);
          }).catch((error: Error) => toast.error(error.message));
  }

  useEffect(() => {
      getOrder();
  }, []);



  return { order:orderItem, cssClassName, hasReturn, loading, productos, setProductos, getOrder, getProductos};
}
