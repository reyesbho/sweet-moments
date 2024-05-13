import { useEffect, useState } from "react";
import { addProductoToPedido, getPedido, getProductsByPedidoId } from "../services/pedidos.services";
import { classStatusEnum, STATUS } from "../general/Status";
import { Order, Product } from "../general/Interfaces";

export function useOrder({ order, orderId }:{order: Order, orderId: number}) {
  const [orderItem, setOrderItem] = useState(order);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cssClassName, setCssClassName] = useState("");
  const [hasReturn, setHasReturn] = useState(false);
  const [productos, setProductos] = useState<Product[]>([]);
  

  const getOrder = async (orderId: number) => {
    setLoading(true);
    await getPedido(orderId)
      .then(async(pedido) => {
        setOrderItem(pedido);
        let status = pedido.status as keyof typeof STATUS;
        setCssClassName(classStatusEnum[status]);
        setHasReturn(true);
        getProductos(orderId);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const getProductos = async(orderId: number) => { 
    await getProductsByPedidoId(orderId).
          then((products) => {
              setProductos([...products]);
          })
  }

  useEffect(() => {
    if (!orderId) {
      setOrderItem(order);
      let status = order.status as keyof typeof STATUS;
      setCssClassName(classStatusEnum[status]);
    } else {
      getOrder(orderId);
    }
  }, [order]);

  const handleSetNewProducts = async(producto) => {
    await addProductoToPedido({id: orderId, producto: producto})
    .then(() => {
      getProductos(orderId);
    })
    .catch((error) => console.error(error))
  }

  return { orderItem, cssClassName, hasReturn, loading, error, handleSetNewProducts, productos};
}
