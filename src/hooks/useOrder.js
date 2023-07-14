import { useEffect, useState } from "react";
import { getPedido } from "../services/pedidos.services";
import { classStatusEnum } from "../general/Status";

export function useOrder({ order, orderId }) {
  const [orderItem, setOrderItem] = useState(order);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cssClassName, setCssClassName] = useState("");
  const [hasReturn, setHasReturn] = useState(false);

  const getOrder = async (orderId) => {
    setLoading(true);
    await getPedido(orderId)
      .then((pedido) => {
        setOrderItem(pedido);
        setCssClassName(classStatusEnum[pedido.status]);
        setHasReturn(true);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!orderId) {
      setOrderItem(order);
      setCssClassName(classStatusEnum[order.status]);
    } else {
      getOrder(orderId);
    }
  }, [order]);

  return { orderItem, cssClassName, hasReturn, loading, error };
}
