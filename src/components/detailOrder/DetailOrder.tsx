import { CardProduct } from "../cardProduct/CardProduct";
import './DetailOrder.css';
import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";
import { IoIosArrowBack } from "react-icons/io";
import { iconStatusEnum, STATUS } from "../../general/Status";
import { ModalConfirm } from "../modal/Modal";
import { updateStatePedido } from "../../services/pedidos.services";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import { FormProducts } from "../formProducts/FormProducts";
import { formatDateTime } from "../../utils/formatDate";
import { NewOrder } from "../new-order/NewOrder";
import { useState } from "react";
import { toast } from "react-toastify";
import { getNameClient } from "../../general/Constants";

export function DetailOrder() {
      const {id} = useParams();
      const {order,cssClassName, hasReturn, productos, setProductos, getOrder, getProductos} = useOrder({orderId:Number(id)});
      const navigate = useNavigate();
      const {show, handleShow, handleClose} = useModalConfirm();
      let modalAddProduct = useModalConfirm()
      const iconStatus = iconStatusEnum((order?.status ? order?.status : STATUS.INCOMPLETE), '3rem');
      let modalUpdateOrder = useModalConfirm();
      const [status, setStatus] = useState<String>('');

      const handleClicHome = (event:any) => {
        event?.preventDefault();
        event?.stopPropagation();
        navigate("/");
      }

    const handleStatusAction = (event:any,status: String) => {
        handleShow(event);
        setStatus(status);
    }

    const handleUpdateState = () => {
        updateStatePedido({id: Number(id), status:status}).then(() => {
            handleClicHome(event);
            toast.success("Actualizado correctamente.")
        }).catch((error: Error) => toast.error(error.message));
    }

    const canAddProduct = () => {
        if(order?.status === STATUS.INCOMPLETE){
            return true; 
        }
        return false;
    }

    const canEndOrder = () => {
        if(order?.status === STATUS.INCOMPLETE){
            return true;
        }
        return false;
    }
    const canShowButtons = () => {
        return order?.status === STATUS.BACKLOG || order?.status === STATUS.INCOMPLETE;
    }


    const handleRealoadOrder = () => {
            getOrder();
    }

    const handleRealoadProducts = () => {
        getProductos().then(() => {
            handleRealoadOrder();
        }).catch((error: Error) => toast.error(error.message));
    }

   

    return (
    <div className="detailOrder">
        <div className="detail-title">
            {{hasReturn} &&
                <button className='button-back' onClick={(e) => handleClicHome(e)}>
                        <IoIosArrowBack size="2.5rem" />
                </button>
            }
            <h1>Detalle de pedido para {getNameClient(order)}</h1>
        </div>
        {order &&
            <div className={`detailOrder-container ${(id ? cssClassName : '' )}`}>
                { canShowButtons() &&
                    <div className='order-actions'>
                        <button type='button' className='btn btn-next btn-sm' onClick={(event) => modalUpdateOrder.handleShow(event)}>Actualizar</button>
                        <button type='button' className='btn btn-cancel btn-sm' onClick={(event) => handleStatusAction(event,STATUS.CANCELED)}>Cancelar</button>
                    </div>
                }
                    <div className='orderDetail'>    
                        <div className="orderDetail-iconStatus">
                            {iconStatus}
                        </div>
                        <div className="orderDetail-info">
                            <div className="orderDetail-details">
                                <p><span>Cliente:</span> {getNameClient(order)}</p>
                                <p ><span>Lugar de entrega: </span> {order.lugarEntrega}</p>   
                            </div>
                            <div className='orderDetail-details'>
                                <p><span >Fecha de entrega:</span> {formatDateTime(order.fechaEntrega)}</p>
                                <p><span>Productos:</span> {order.numProducts}</p>
                            </div>    
                            <div className='orderDetail-details'>
                                <p><span>Total:</span> ${order.total}.00</p>
                                <p><span>Registrado por:</span> {order.register}</p>
                            </div>
                        </div>
                    </div>
                { canShowButtons() &&
                    <div className='order-actions'>
                        {order?.status === STATUS.BACKLOG &&
                        <button type='button' className='btn btn-add btn-sm' onClick={(event) => handleStatusAction(event,STATUS.DONE)}>Entregado</button>}        
                        {canAddProduct() && 
                            <button className='btn btn-add btn-sm' onClick={(event) => modalAddProduct.handleShow(event)} >Agregar producto</button>
                        }
                    </div>
                }
                <div className='content-product'>
                    {modalAddProduct.show && <FormProducts idPedido={order.id} handleClose={() => modalAddProduct.handleClose(event)} reload={handleRealoadProducts}></FormProducts>}
                </div>
                {productos.length > 0 &&
                    <div className="detailOrder-products">
                        <hr></hr>
                        { productos.map(product => (
                            <CardProduct key={product.id} productItem={product} reload={getProductos}></CardProduct>
                        ))}
                    </div>
                }
                {
                    productos && productos.length > 0 && canEndOrder() && 
                    <button className='btn btn-success btn-sm'onClick={(event) => handleStatusAction(event,STATUS.BACKLOG)} disabled={!productos || productos?.length<0} >Finalizar registro</button>
                }
                
                <ModalConfirm show={show} handleClose={handleClose} handleOk={handleUpdateState} ></ModalConfirm>
                {
                modalUpdateOrder.show && 
                <NewOrder handleClose={modalUpdateOrder.handleClose} orderDto={order} reload={handleRealoadOrder}></NewOrder>
            }
            </div>}
    </div>

    )
}