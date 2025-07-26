import { useEffect, useState } from "react";
import {  getPedido } from "../services/pedidos.services";
import { classBorderStatusEnum, STATUS } from "../general/Status";
import { toast } from "react-toastify";
import { Pedido } from "../general/interfaces/pedido";


export function useOrder({ orderId }:{orderId: string}) {
  const [orderItem, setOrderItem] = useState<Pedido | null>();
  const [loading, setLoading] = useState(false);
  const [cssClassName, setCssClassName] = useState("");
  const [hasReturn, setHasReturn] = useState(false);
  

  const getOrder = async () => {
    setLoading(true);
    await getPedido(orderId)
      .then(async(pedido) => {
        setOrderItem(pedido);
        let status = pedido.estatus as keyof typeof STATUS;
        setCssClassName(classBorderStatusEnum[status]);
        setHasReturn(true);
      })
      .catch((error: Error) => toast.error(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
      getOrder();
  }, []);



  return { order:orderItem, cssClassName, hasReturn, loading, getOrder};
}
