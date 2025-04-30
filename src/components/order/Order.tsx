import { STATUS, classStatusEnum } from '../../general/Status';
import './Order.css'
import { useEffect, useMemo, useState } from 'react';
import { CardProduct } from '../cardProduct/CardProduct';
import { CardOrderInfo } from '../cardOrderInfo/CardOrderInfo';
import { deletePedido, getProductsByPedidoId, updateStatePedido } from '../../services/pedidos.services';
import { ModalConfirm } from '../modal/Modal';
import { useModalConfirm } from '../../hooks/useModalConfirm';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { OrderDto, ProductOrderDto } from '../../general/Dtos';

export function Order({ order, handleRefreshOrders}:{order: OrderDto, handleRefreshOrders: Function}) {
    const [showProducts, setShowProducts] = useState(false)
    const [products, setProducts] = useState<ProductOrderDto[]>([])

    const {show, handleClose, handleShow} = useModalConfirm();
    const [status, setStatus] = useState<String>('');

    const handleShowProducts = async() => {
        setShowProducts(!showProducts);
    }

    const handleSelectStatus = (event:any, newStatus: String) => {
        event.stopPropagation();
        handleShow(event);
        setStatus(newStatus);
    }

    const handleUpdateState = (event:any) => {
        if(status === STATUS.DELETE){
            deletePedido({idPedido:order.id})
                .then((response) => {
                    handleRefreshOrders();
                    handleClose(event);
                    toast.success("Eliminado correctamente.")
                }).catch((error: Error) => toast.error(error.message));
            return;
        }else{
            updateStatePedido({id: order.id, status:status}).then(() => {
                handleRefreshOrders()
                handleClose(event);
                toast.success("Actualizado correctamente.")
            }).catch((error: Error) => toast.error(error.message));
        }
    }

    const handleReload = (id:number) =>{
        const newProducts = structuredClone(products);
        setProducts(newProducts.filter((product) => product.id !== id));
        updateStatePedido({id: order.id, status:status}).then(() => handleRefreshOrders());
    }

    useEffect(() => {
        if(products.length === 0 && showProducts){        
            getProductsByPedidoId(order.id).then((products) => {
                setProducts(products);
            });
        }
    },[showProducts])


    return (
        <>
        <div className={`principal-order `} onClick={handleShowProducts}> 
            <CardOrderInfo order={order} enableIcon={true}></CardOrderInfo>
            <div className='order-actions'>
                { (order?.status === STATUS.BACKLOG || order?.status === STATUS.INCOMPLETE)  && 
                <button type='button' className='btn btn-cancel btn-sm' onClick={(event) => handleSelectStatus(event, STATUS.CANCELED)}>Cancelar</button>}
                {order.status === STATUS.INCOMPLETE && 
                <Link className='btn btn-add btn-sm' to={`/order/${order.id}`}>Productos</Link>}
                {order?.status === STATUS.BACKLOG &&
                <button type='button' className='btn btn-add btn-sm' onClick={(event) => handleSelectStatus(event, STATUS.DONE)}>Entregado</button>}
                <button type='button' className='btn btn-delete btn-sm' onClick={(event) => handleSelectStatus(event, STATUS.DELETE)}>Eliminar</button>
            </div>
            <div className={`detail-order ${(showProducts ? '' : 'inactive')}`}>
                {products && <hr></hr> && products?.map(product => (
                    <CardProduct key={product.id} productItem={product} reload={handleReload}></CardProduct>
                ))}
                    
            </div>
        </div>
        <ModalConfirm show={show} handleClose={(e:any) => handleClose(e)} handleOk={handleUpdateState} ></ModalConfirm>
        </>
    )
}