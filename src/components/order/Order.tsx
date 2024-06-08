import { STATUS, classStatusEnum } from '../../general/Status';
import './Order.css'
import { useEffect, useState } from 'react';
import { CardProduct } from '../cardProduct/CardProduct';
import { CardOrderInfo } from '../cardOrderInfo/CardOrderInfo';
import { getProductsByPedidoId, updateStatePedido } from '../../services/pedidos.services';
import { ModalConfirm } from '../modal/Modal';
import { useModalConfirm } from '../../hooks/useModalConfirm';
import { Link } from 'react-router-dom';
import { OrderDto, ProductOrderDto } from '../../general/Interfaces';

export function Order({ order, handleRefreshOrders}:{order: OrderDto, handleRefreshOrders: Function}) {
    const [open, setOpen] = useState(false)
    const cssClassName = classStatusEnum[order.status as keyof typeof classStatusEnum];
    const {openModal, statusConfirm, handleOpenModal, setOpenModal } = useModalConfirm()
    const [products, setProducts] = useState<ProductOrderDto[]>([])
    const [isLoadedProductos, setIsLoadedProductos] = useState(false)
    useEffect(() => {
        if(!open){
            return;
        }
        handleGetPedidos();
    }, [isLoadedProductos])

    const handleGetPedidos = async () => {
        const result = await getProductsByPedidoId(order.id);
        setProducts(result);
    }
    const handleUpdateState = () => {
        updateStatePedido({id: order.id, status:statusConfirm}).then(() => handleRefreshOrders());
    }

    const handleShowProducts = async() => {
        setOpen(!open);
        setIsLoadedProductos(true)
    }
    
    return (
        <div className={`principal-order `} onClick={handleShowProducts}> 
            <CardOrderInfo order={order} enableIcon={true}></CardOrderInfo>
            <div className={`detail-order ${(open ? 'active' : 'inactive')}`}>
                { (order?.status === STATUS.BACKLOG || order?.status === STATUS.INCOMPLETE)  &&
                    <div className='order-actions'>
                        <button type='button' className='btn btn-cancel btn-sm' onClick={(event) => handleOpenModal(event,true, STATUS.CANCELED)}>Cancelar Pedido</button>
                        {order.status === STATUS.INCOMPLETE && 
                        <Link className='btn btn-add btn-sm' to={`/order/${order.id}`}>Continuar Registro</Link>}
                        {order?.status === STATUS.BACKLOG &&
                        <button type='button' className='btn btn-add btn-sm' onClick={(event) => handleOpenModal(event,true, STATUS.DONE)}>Entregado</button>}
                    </div>
                }
                
                {products && <hr></hr> && products?.map(product => (
                    <CardProduct key={product.id} productItem={product}></CardProduct>
                ))}
            </div>
            <ModalConfirm openModal={openModal} setOpenModal={setOpenModal} accept={handleUpdateState} ></ModalConfirm>
        </div>
    )
}