import { CardProduct } from "../cardProduct/CardProduct";
import './DetailOrder.css';
import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";
import { IoIosArrowBack } from "react-icons/io";
import { iconStatusEnum, STATUS } from "../../general/Status";
import { ModalConfirm } from "../modal/Modal";
import { updatePedido, updateStatePedido } from "../../services/pedidos.services";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import { formatDateTime } from "../../utils/formatDate";
import { NewOrder } from "../new-order/NewOrder";
import { useState } from "react";
import { toast } from "react-toastify";
import { AddNewProduct } from "../addNewProduct/AddNewProduct";
import { FaClock, FaUser } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { Pedido, ProductoPedido } from "../../general/interfaces/pedido";

export function DetailOrder() {
    const { id = '' } = useParams();
    const { order, cssClassName, hasReturn, getOrder } = useOrder({ orderId: id });
    const navigate = useNavigate();
    const { show, handleShow, handleClose } = useModalConfirm();
    let modalAddProduct = useModalConfirm();
    let modalEditProduct = useModalConfirm();
    const iconStatus = iconStatusEnum((order?.estatus ? order?.estatus : STATUS.INCOMPLETE), '2.5rem');
    let modalUpdateOrder = useModalConfirm();
    const [status, setStatus] = useState<string>('');
    const [productUpdate, setProductUpdate] = useState<ProductoPedido | undefined>();

    const handleClicHome = () => {
        navigate("/");
    }

    const handleStatusAction = (event: any, newStatus: string) => {
        event.stopPropagation();
        event.preventDefault();
        handleShow(event);
        setStatus(newStatus);
    }

    const handleUpdateState = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (!order || !order.id || !status) {
            toast.error("Faltan datos para actualizar el estado del pedido.");
            return;
        }
        updateStatePedido({ id: order.id, status}).then(() => {
            toast.success("Actualizado correctamente.");
            handleClicHome();
            handleClose(event);
        }).catch((error: Error) => toast.error(error.message));
    }

    const canAddProduct = () => {
        if (order?.estatus === STATUS.INCOMPLETE) {
            return true;
        }
        return false;
    }

    const canEndOrder = () => {
        if (order?.estatus === STATUS.INCOMPLETE) {
            return true;
        }
        return false;
    }
    const canShowButtons = () => {
        return order?.estatus === STATUS.BACKLOG || order?.estatus === STATUS.INCOMPLETE;
    }


    const handleRealoadOrder = () => {
        getOrder();
    }

    const handleDeleteProductPedido = async(productoPedido: ProductoPedido) => {
        if(!order) return;
        const productosStill = order?.productos?.filter((item) => item.id !== productoPedido.id) ?? [];
        order.productos = productosStill;
        await updatePedido(order)
                    .then(() => {
                        toast.success("Producto eliminado correctamente.");
                        handleRealoadOrder();
                        modalAddProduct.handleClose(event);
                        
                    })
                    .catch((error: Error) => toast.error(error.message));
    }

    const handleEditProductPedido = async(productoPedido: ProductoPedido) => {
        modalEditProduct.handleShow(event);
        setProductUpdate(productoPedido);
    }

    return (
        <div className="detailOrder">
            <div className="detail-title">
                {hasReturn &&
                    <button className='button-back' onClick={handleClicHome}>
                        <IoIosArrowBack size="2.5rem" />
                    </button>
                }
                <h1>Detalle de pedido</h1>
            </div>
            {order &&
                <section className="detailOrder-section">
                    <div className={`detailOrder-container-produts`}>
                        {canShowButtons() &&
                                    <div className='order-actions'>
                                        {order?.estatus === STATUS.BACKLOG &&
                                            <button type='button' className='btn btn-add btn-md' onClick={(event) => handleStatusAction(event, STATUS.DONE)}>Entregado</button>}
                                        {canAddProduct() &&
                                            <button className='btn btn-add btn-md' onClick={(event) => modalAddProduct.handleShow(event)} >Agregar producto</button>
                                        }
                                    </div>
                                }
                        {(order.productos?.length ?? 0) > 0 &&
                            <div className="detailOrder-products">
                                {order.productos?.map((product, index) => (
                                    <CardProduct 
                                        key={index} 
                                        productItem={product} 
                                        reload={handleRealoadOrder} 
                                        handleDeleteProductPedido={handleDeleteProductPedido}
                                        handleEditProductPedido={handleEditProductPedido} 
                                        showEdit={true}
                                        showDelete={true}>
                                    </CardProduct>
                                ))}
                            </div>
                        }
                    </div>
                    <div className={`detailOrder-container-resume`}>
                            <div className="orderDetail-info">
                                <h1>Resumen</h1>
                                <hr></hr>
                                <div className="orderDetail-details">
                                    <p className="fs-1"><FaUser color="purple"/> {order.cliente}</p>
                                    <p className="fs-1"> <MdPlace color="red"></MdPlace> {order.lugarEntrega}</p>
                                    <p> <FaClock color="#87e6ed" /> {formatDateTime(order.fechaEntrega)}</p>
                                    <p><span>Productos:</span> {order.productos?.length}</p>
                                    <p className="fs-2"><span>Total:</span> ${order.total}.00</p>
                                </div>
                                {canShowButtons() &&
                                    <div className='order-buttons'>
                                        <button type='button' className='btn btn-next btn-md' onClick={(event) => modalUpdateOrder.handleShow(event)}>Editar</button>
                                        <button type='button' className='btn btn-cancel btn-md' onClick={(event) => handleStatusAction(event, STATUS.CANCELED)}>Cancelar</button>
                                    </div>
                                }

                                {
                                    order.productos && order.productos?.length > 0 && canEndOrder() &&
                                    <button className='btn btn-success btn-md' onClick={(event) => handleStatusAction(event, STATUS.BACKLOG)} disabled={!order.productos || order.productos?.length < 0} >Finalizar registro</button>
                                }
                                <div className="orderDetail-details">
                                    <p className="fs-07">{`Registrado por: ${order.registradoPor}`} </p>
                                </div>
                        </div>

                        <div className='content-product'>
                            {modalAddProduct.show && <AddNewProduct pedido={order} handleClose={() => modalAddProduct.handleClose(event)} reload={handleRealoadOrder}></AddNewProduct>}
                            {modalEditProduct.show && <AddNewProduct pedido={order} productOrder={productUpdate} handleClose={() => modalEditProduct.handleClose(event)} reload={handleRealoadOrder}></AddNewProduct>}
                        </div>


                        <ModalConfirm show={show} handleClose={handleClose} handleOk={handleUpdateState} ></ModalConfirm>
                        {
                            modalUpdateOrder.show &&
                            <NewOrder handleClose={modalUpdateOrder.handleClose} orderDto={order} reload={handleRealoadOrder}></NewOrder>
                        }
                    </div>
                </section>
            }
        </div>

    )
}