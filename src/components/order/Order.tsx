import { STATUS, classStatusEnum } from '../../general/Status';
import './Order.css'
import { useEffect, useState } from 'react';
import { CardProduct } from '../cardProduct/CardProduct';
import { CardOrderInfo } from '../cardOrderInfo/CardOrderInfo';
import { deletePedido, getProductsByPedidoId, updateStatePedido } from '../../services/pedidos.services';
import { ModalConfirm } from '../modal/Modal';
import { useModalConfirm } from '../../hooks/useModalConfirm';
import { Link } from 'react-router-dom';
import { OrderDto, ProductOrderDto } from '../../general/Interfaces';

export function Order({ order, handleRefreshOrders}:{order: OrderDto, handleRefreshOrders: Function}) {
    const [open, setOpen] = useState(false)
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
        if(statusConfirm === STATUS.DELETE){
            handleDelete(order.id);
            return;
        }
        updateStatePedido({id: order.id, status:statusConfirm}).then(() => handleRefreshOrders());
    }

    const handleShowProducts = async() => {
        setOpen(!open);
        setIsLoadedProductos(true)
    }

    const handleReload = (id:number) =>{
        const newProducts = structuredClone(products);
        setProducts(newProducts.filter((product) => product.id !== id));
    }

    const handleDelete = (idPedido: number) => {
        deletePedido({idPedido})
        .then((response) => {
            handleRefreshOrders();
        })
    }


    return (
        <div className={`principal-order `} onClick={handleShowProducts}> 
            <CardOrderInfo order={order} enableIcon={true}></CardOrderInfo>
            <div className={`detail-order ${(open ? 'active' : 'inactive')}`}>
                {products && <hr></hr> && products?.map(product => (
                    <CardProduct key={product.id} productItem={product} reload={handleReload}></CardProduct>
                ))}
                { (order?.status === STATUS.BACKLOG || order?.status === STATUS.INCOMPLETE)  &&
                    <div className='order-actions'>
                        <button type='button' className='btn btn-cancel btn-sm' onClick={(event) => handleOpenModal(event,true, STATUS.CANCELED)}>Cancelar</button>
                        {order.status === STATUS.INCOMPLETE && 
                        <Link className='btn btn-add btn-sm' to={`/order/${order.id}`}>Continuar Registro</Link>}
                        {order?.status === STATUS.BACKLOG &&
                        <button type='button' className='btn btn-add btn-sm' onClick={(event) => handleOpenModal(event,true, STATUS.DONE)}>Entregado</button>}
                        <button type='button' className='btn btn-delete btn-sm' onClick={(event) => handleOpenModal(event,true, STATUS.DELETE)}>Eliminar</button>
                    </div>
                }
            </div>
            <ModalConfirm openModal={openModal} setOpenModal={setOpenModal} accept={handleUpdateState} ></ModalConfirm>
        </div>
    )
}