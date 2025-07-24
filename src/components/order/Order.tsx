import { STATUS, classStatusEnum } from '../../general/Status';
import './Order.css'
import { useState } from 'react';
import { CardProduct } from '../cardProduct/CardProduct';
import { CardOrderInfo } from '../cardOrderInfo/CardOrderInfo';
import { updateStatePedido } from '../../services/pedidos.services';
import { ModalConfirm } from '../modal/Modal';
import { useModalConfirm } from '../../hooks/useModalConfirm';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Pedido, ProductoPedido } from '../../general/interfaces/pedido';
import { FaClock, FaUser } from 'react-icons/fa';
import { MdPlace } from 'react-icons/md';
import { formatDateTime } from '../../utils/formatDate';
import { colors } from '@mui/material';
import { Button } from 'rsuite';

export function Order({ order, handleRefreshOrders}:{order: Pedido, handleRefreshOrders: Function}) {
    const [showProducts, setShowProducts] = useState(false)
    const [products, setProducts] = useState<ProductoPedido[]>([])
    const {show, handleClose, handleShow} = useModalConfirm();
    const [status, setStatus] = useState<string>('');
    const navigate = useNavigate();
    

    const handleShowProducts = async() => {
        setShowProducts(!showProducts);
    }

    const handleSelectStatus = (event:any, newStatus: string) => {
        event.stopPropagation();
        event.preventDefault();
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

    const handleNavigate = (event:React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        navigate(`/order/${order.id}`);
    }
   


    return (
        
        <>
        <div className={`principal-order `} onClick={handleShowProducts}>
            <div className='principal-order-header'>
                <label className='principal-order-client'><FaUser color='purple'/> {order.cliente}</label>
                <div className='principal-order-place'>
                    <span><MdPlace color='red'/> {order.lugarEntrega}</span>
                    <span><FaClock color='#87e6ed'/> {formatDateTime(order.fechaEntrega)}</span>
                </div>
            </div>
            <div className={`principal-order-body ${(showProducts ? '' : 'inactive')}`}>
                {order.productos && <hr></hr> && order.productos?.map((productoPedido, index) => (
                        <CardProduct key={index} productItem={productoPedido} reload={handleReload}></CardProduct>
                    ))}
            </div>
            <div className='principal-order-general'>
                <div className='principal-order-general-total'>
                    <p >Productos: {order.productos?.length}</p>
                    <p >💵 Total: ${order.total}</p>
                </div>
                <div className='principal-order-general-buttons'>
                    { (order?.estatus === STATUS.BACKLOG || order?.estatus === STATUS.INCOMPLETE)  && 
                    <button type='button' className='btn btn-cancel btn-md' onClick={(event) => handleSelectStatus(event, STATUS.CANCELED)}>Cancelar</button>}
                    {order.estatus === STATUS.INCOMPLETE && 
                    <button className='btn btn-edit btn-md' onClick={handleNavigate}>Continuar</button>}
                    {order?.estatus === STATUS.BACKLOG &&
                    <button type='button' className='btn btn-add btn-md' onClick={(event) => handleSelectStatus(event, STATUS.DONE)}>Entregado</button>}
                    <button type='button' className='btn btn-delete btn-md' onClick={(event) => handleSelectStatus(event, STATUS.DELETE)}>Eliminar</button>
                </div>
            </div>
        </div>
        <ModalConfirm show={show} handleClose={(e:any) => handleClose(e)} handleOk={handleUpdateState} ></ModalConfirm>
        </>
    )
} 