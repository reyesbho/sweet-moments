import { STATUS, classStatusEnum } from '../../general/Status';
import './Order.css'
import { useState } from 'react';
import { CardProduct } from '../cardProduct/CardProduct';
import { CardOrderInfo } from '../cardOrderInfo/CardOrderInfo';
import { updateStatePedido } from '../../services/pedidos.services';
import { ModalConfirm } from '../modal/Modal';
import { useModalConfirm } from '../../hooks/useModalConfirm';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Pedido, ProductoPedido } from '../../general/interfaces/pedido';

export function Order({ order, handleRefreshOrders}:{order: Pedido, handleRefreshOrders: Function}) {
    const [showProducts, setShowProducts] = useState(false)
    const [products, setProducts] = useState<ProductoPedido[]>([])
    const {show, handleClose, handleShow} = useModalConfirm();
    const [status, setStatus] = useState<string>('');
    const [cssClassStatus, setCssClassStatus] = useState(classStatusEnum[order.estatus as keyof typeof classStatusEnum]);

    const handleShowProducts = async() => {
        setShowProducts(!showProducts);
    }

    const handleSelectStatus = (event:any, newStatus: string) => {
        event.stopPropagation();
        handleShow(event);
        setStatus(newStatus);
    }

    const handleUpdateState = (event:any) => {
        if(!order.id){
            return
        }
        updateStatePedido({id: order.id, status:status}).then(() => {
            handleRefreshOrders()
            handleClose(event);
            toast.success("Actualizado correctamente.")
        }).catch((error: Error) => toast.error(error.message));
    
    }

    const handleReload = (id:string) =>{
        const newProducts = structuredClone(products);
        setProducts(newProducts.filter((product) => product.id !== id));
        //updateStatePedido({id: order.id, status:status}).then(() => handleRefreshOrders());
    }

   


    return (
        <>
        <div className={`principal-order ${cssClassStatus}`} onClick={handleShowProducts}> 
            <CardOrderInfo order={order} enableIcon={true}></CardOrderInfo>
            <div className='order-actions'>
                { (order?.estatus === STATUS.BACKLOG || order?.estatus === STATUS.INCOMPLETE)  && 
                <button type='button' className='btn btn-cancel btn-sm' onClick={(event) => handleSelectStatus(event, STATUS.CANCELED)}>Cancelar</button>}
                {order.estatus === STATUS.INCOMPLETE && 
                <Link className='btn btn-add btn-sm' to={`/order/${order.id}`}>Continuar</Link>}
                {order?.estatus === STATUS.BACKLOG &&
                <button type='button' className='btn btn-add btn-sm' onClick={(event) => handleSelectStatus(event, STATUS.DONE)}>Entregado</button>}
                <button type='button' className='btn btn-delete btn-sm' onClick={(event) => handleSelectStatus(event, STATUS.DELETE)}>Eliminar</button>
            </div>
            <div className={`detail-order ${(showProducts ? '' : 'inactive')}`}>
                {order.productos && <hr></hr> && order.productos?.map((productoPedido, index) => (
                    <CardProduct key={index} productItem={productoPedido} reload={handleReload}></CardProduct>
                ))}
                    
            </div>
        </div>
        <ModalConfirm show={show} handleClose={(e:any) => handleClose(e)} handleOk={handleUpdateState} ></ModalConfirm>
        </>
    )
} 