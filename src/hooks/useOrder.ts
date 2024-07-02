import { useEffect, useState } from "react";
import {  getPedido, getProductsByPedidoId } from "../services/pedidos.services";
import { classStatusEnum, STATUS } from "../general/Status";
import { OrderDto, ProductOrderDto } from "../general/Interfaces";


export function useOrder({ orderId }:{orderId: number}) {
  const [orderItem, setOrderItem] = useState<OrderDto | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const getProductos = async() => { 
    await getProductsByPedidoId(orderId).
          then((products) => {
              setProductos([...products]);
          })
  }

  useEffect(() => {
      getOrder();
  }, []);



  return { order:orderItem, cssClassName, hasReturn, loading, error, productos, setProductos, getOrder, getProductos};
}
