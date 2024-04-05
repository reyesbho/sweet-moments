import { useEffect, useState } from "react";
import { addProductoToPedido, getPedido, getProductsByPedidoId } from "../services/pedidos.services";
import { classStatusEnum } from "../general/Status";

export function useOrder({ order, orderId }) {
  const [orderItem, setOrderItem] = useState(order);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cssClassName, setCssClassName] = useState("");
  const [hasReturn, setHasReturn] = useState(false);
  const [productos, setProductos] = useState([]);
  

  const getOrder = async (orderId) => {
    setLoading(true);
    await getPedido(orderId)
      .then(async(pedido) => {
        setOrderItem(pedido);
        setCssClassName(classStatusEnum[pedido.status]);
        setHasReturn(true);
        getProductos(orderId);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const getProductos = async(orderId) => { 
    await getProductsByPedidoId(orderId).
          then((products) => {
              console.log("products")
              console.log(products)
              setProductos([...products]);
          })
  }

  useEffect(() => {
    if (!orderId) {
      setOrderItem(order);
      setCssClassName(classStatusEnum[order.status]);
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
