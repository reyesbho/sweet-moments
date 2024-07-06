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
    const [showProducts, setShowProducts] = useState(false)
    const {show, handleShow, handleClose } = useModalConfirm()
    const [products, setProducts] = useState<ProductOrderDto[]>([])
    const [isLoadedProductos, setIsLoadedProductos] = useState(false)
    const [status, setStatus] = useState<String>('');
    const [action, setAction] = useState<CallableFunction>(() =>{});

    const handleShowProducts = async() => {
        setShowProducts(!showProducts);
        setIsLoadedProductos(true)
    }
    
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

    const handleSelectStatus = (event:any, newStatus: String, action: CallableFunction) => {
        event.stopPropagation();
        handleShow();
        setStatus(newStatus);
        setAction(action)
    }

    const handleUpdateState = () => {
        if(status === STATUS.DELETE){
            handleDelete(order.id);
            return;
        }
        updateStatePedido({id: order.id, status:status}).then(() => handleRefreshOrders());
    }

    const handleDelete = (idPedido: number) => {
        deletePedido({idPedido})
        .then((response) => {
            handleRefreshOrders();
        })
    }

    const handleReload = (id:number) =>{
        const newProducts = structuredClone(products);
        setProducts(newProducts.filter((product) => product.id !== id));
        updateStatePedido({id: order.id, status:status}).then(() => handleRefreshOrders());
    }


    return (
        <div className={`principal-order `} onClick={handleShowProducts}> 
            <CardOrderInfo order={order} enableIcon={true}></CardOrderInfo>
            <div className={`detail-order ${(showProducts ? 'active' : 'inactive')}`}>
                {products && <hr></hr> && products?.map(product => (
                    <CardProduct key={product.id} productItem={product} reload={handleReload}></CardProduct>
                ))}
                    <div className='order-actions'>
                        { (order?.status === STATUS.BACKLOG || order?.status === STATUS.INCOMPLETE)  && 
                        <button type='button' className='btn btn-cancel btn-sm' onClick={(event) => handleSelectStatus(event, STATUS.CANCELED, handleDelete)}>Cancelar</button>}
                        {order.status === STATUS.INCOMPLETE && 
                        <Link className='btn btn-add btn-sm' to={`/order/${order.id}`}>Continuar Registro</Link>}
                        {order?.status === STATUS.BACKLOG &&
                        <button type='button' className='btn btn-add btn-sm' onClick={(event) => handleSelectStatus(event, STATUS.DONE, handleUpdateState)}>Entregado</button>}
                        <button type='button' className='btn btn-delete btn-sm' onClick={(event) => handleSelectStatus(event, STATUS.DELETE, handleUpdateState)}>Eliminar</button>
                    </div>
            </div>
            <ModalConfirm show={show} handleClose={handleClose} handleOk={action} ></ModalConfirm>
        </div>
    )
}