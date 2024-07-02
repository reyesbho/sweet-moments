import { CardProduct } from "../cardProduct/CardProduct";
import './DetailOrder.css';
import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";
import { IoIosArrowBack } from "react-icons/io";
import { iconStatusEnum, STATUS } from "../../general/Status";
import { ModalConfirm } from "../modal/Modal";
import { updateStatePedido } from "../../services/pedidos.services";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import { useModal } from "../../hooks/UseModal";
import { FormProducts } from "../formProducts/FormProducts";
import { formatDateTime } from "../../utils/formatDate";
import { NewOrder } from "../new-order/NewOrder";

export function DetailOrder() {
      const {id} = useParams();
      const {order,cssClassName, hasReturn, productos, setProductos, getOrder, getProductos} = useOrder({orderId:Number(id)});
      const navigate = useNavigate();
      const {openModal, statusConfirm, handleOpenModal, setOpenModal} = useModalConfirm();
      let modalAddProduct = useModal()
      const iconStatus = iconStatusEnum((order?.status ? order?.status : STATUS.INCOMPLETE), '3rem');
      let modalUpdateOrder = useModal();

      const handleClicHome = (event:any) => {
        event?.preventDefault();
        event?.stopPropagation();
        navigate("/");
      }

    const handleUpdateState = () => {
        updateStatePedido({id: Number(id), status:statusConfirm}).then(() => {
            handleClicHome(event);
        });
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
        });
    }

    return (
    <div className="detailOrder">
        <div className="detail-title">
            {{hasReturn} &&
                <button className='button-back' onClick={(e) => handleClicHome(e)}>
                        <IoIosArrowBack size="2.5rem" />
                </button>
            }
            <h2>Detalle de pedido: {order?.id}</h2>
        </div>
        {order &&
            <div className={`detailOrder-container ${(id ? cssClassName : '' )}`}>
                
                    <div className='orderDetail'>    
                        <div className="orderDetail-iconStatus">
                            {iconStatus}
                        </div>
                        <div className="orderDetail-info">
                            <div className="orderDetail-details">
                                <p><span>Cliente:</span> {order.cliente}</p>
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
                        <button type='button' className='btn btn-next btn-sm' onClick={() => modalUpdateOrder.handleModal()}>Actualizar informacion</button>
                        <button type='button' className='btn btn-cancel btn-sm' onClick={(event) => handleOpenModal(event,true, STATUS.CANCELED)}>Cancelar</button>
                        {order?.status === STATUS.BACKLOG &&
                        <button type='button' className='btn btn-add btn-sm' onClick={(event) => handleOpenModal(event,true, STATUS.DONE)}>Entregado</button>}        
                        {canAddProduct() && 
                            <button className='btn btn-add btn-sm' onClick={() => modalAddProduct.handleModal()} >Agregar producto</button>
                        }
                    </div>
                }
                <div className='content-product'>
                    {modalAddProduct.isOpen && <FormProducts idPedido={order.id} handleIsOpen={modalAddProduct.handleModal} reload={handleRealoadProducts}></FormProducts>}
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
                    <button className='btn btn-success btn-sm'onClick={(event) => handleOpenModal(event,true, STATUS.BACKLOG)} disabled={!productos || productos?.length<0} >Finalizar registro</button>
                }
                
                <ModalConfirm openModal={openModal} setOpenModal={setOpenModal} accept={handleUpdateState} ></ModalConfirm>
                {
                modalUpdateOrder.isOpen && 
                <NewOrder handleIsOpen={modalUpdateOrder.handleModal} orderDto={order} reload={handleRealoadOrder}></NewOrder>
            }
            </div>}
    </div>

    )
}