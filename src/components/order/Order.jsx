import { STATUS, classStatusEnum } from '../../general/Status';
import './Order.css'
import { useState } from 'react';
import { CardProduct } from '../cardProduct/CardProduct';
import { CardOrderInfo } from '../cardOrderInfo/CardOrderInfo';
import { getProductsByPedidoId, updateStatePedido } from '../../services/pedidos.services';
import { ModalConfirm } from '../modal/Modal';
import { useModalConfirm } from '../../hooks/useModalConfirm';
import { Link } from 'react-router-dom';

export function Order({ order, handleRefreshOrders}) {
    const [open, setOpen] = useState(false)
    const cssClassName = classStatusEnum[order.status];
    const {openModal, statusConfirm, handleOpenModal, setOpenModal } = useModalConfirm()

    const [products, setProducts] = useState([])

    const handleUpdateState = () => {
        updateStatePedido({id: order.id, status:statusConfirm}).then(() => handleRefreshOrders());
    }

    const handleShowProducts = async() => {
        setOpen(!open);
        const products = await getProductsByPedidoId(order.id);
        setProducts(products)
        console.log(products)
    }
    
    return (
        <div className={`principal-order ${cssClassName}`} onClick={handleShowProducts}> 
            <CardOrderInfo order={order} enableIcon={true}></CardOrderInfo>
            <div className={`detail-order ${(open ? 'active' : 'inactive')}`}>
                { (order?.status === STATUS.BACKLOG || order?.status === STATUS.INCOMPLETE)  &&
                    <div className='order-actions'>
                        <button type='button' className='btn btn-cancel btn-sm' onClick={(event) => handleOpenModal(event,true, STATUS.CANCELED)}>Cancelar</button>
                        {order.status === STATUS.INCOMPLETE && 
                        <Link className='btn btn-add btn-sm' to={`/order/${order.id}`}>Continuar</Link>}
                        {order?.status === STATUS.BACKLOG &&
                        <button type='button' className='btn btn-add btn-sm' onClick={(event) => handleOpenModal(event,true, STATUS.DONE)}>Entregado</button>}
                    </div>
                }
                <hr></hr>
                {products?.map(product => (
                    <CardProduct key={product.id} productItem={product}></CardProduct>
                ))}
            </div>
            <ModalConfirm openModal={openModal} setOpenModal={setOpenModal} accept={handleUpdateState} ></ModalConfirm>
        </div>
    )
}