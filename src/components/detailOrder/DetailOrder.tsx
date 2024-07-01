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
import { OrderDto } from "../../general/Interfaces";
import { formatDate, formatTime } from "../../utils/formatDate";

export function DetailOrder({ orderItem}:{ orderItem: OrderDto | null}) {
      const {id} = useParams();
      const {order,cssClassName, hasReturn, productos, setProductos} = useOrder({order:orderItem, orderId:Number(id)});
      const navigate = useNavigate();
      const {openModal, statusConfirm, handleOpenModal, setOpenModal} = useModalConfirm();
      const {isOpen, handleModal} = useModal()
      const iconStatus = iconStatusEnum((order?.status ? order?.status : STATUS.INCOMPLETE), '3rem');

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
    
    const handleReload = (id:number) => {
        const newProductos = structuredClone(productos);
        setProductos(newProductos.filter((product) => product.id !== id));
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
                                <p><span >Fecha de entrega:</span> {formatDate(order.fechaEntrega)} {formatTime(order.horaEntrega)}</p>
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
                        <button type='button' className='btn btn-cancel btn-sm' onClick={(event) => handleOpenModal(event,true, STATUS.CANCELED)}>Cancelar</button>
                        {order?.status === STATUS.BACKLOG &&
                        <button type='button' className='btn btn-add btn-sm' onClick={(event) => handleOpenModal(event,true, STATUS.DONE)}>Entregado</button>}        
                        {canAddProduct() && 
                            <button className='btn btn-add btn-sm' onClick={() => handleModal()} >Agregar producto</button>
                        }
                    </div>
                }
                <hr></hr>
                <div className='content-product'>
                    {isOpen && <FormProducts idPedido={order.id} handleIsOpen={handleModal}></FormProducts>}
                </div>
                <div className="detailOrder-products">
                    {productos && productos.map(product => (
                        <CardProduct key={product.id} productItem={product} reload={handleReload}></CardProduct>
                    ))}
                </div>
                {
                    productos && productos.length > 0 && canEndOrder() && 
                    <button className='btn btn-success btn-sm'onClick={(event) => handleOpenModal(event,true, STATUS.BACKLOG)} disabled={!productos || productos?.length<0} >Finalizar registro</button>
                }
                
                <ModalConfirm openModal={openModal} setOpenModal={setOpenModal} accept={handleUpdateState} ></ModalConfirm>
            </div>}
    </div>

    )
}