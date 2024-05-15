import { CardProduct } from "../cardProduct/CardProduct";
import { CardOrderInfo } from "../cardOrderInfo/CardOrderInfo";
import './DetailOrder.css';
import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";
import { IoIosArrowBack } from "react-icons/io";
import { STATUS } from "../../general/Status";
import { ModalConfirm } from "../modal/Modal";
import { updateStatePedido } from "../../services/pedidos.services";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import { useModal } from "../../hooks/UseModal";
import { FormProducts } from "../formProducts/FormProducts";
import { Order } from "../../general/Interfaces";

export function DetailOrder({ order}:{ order: Order | null}) {
      const {id} = useParams();
      const {orderItem,cssClassName, hasReturn, loading, error, handleSetNewProducts, productos} = useOrder({order, orderId:Number(id)});
      const navigate = useNavigate();
      const {openModal, statusConfirm, handleOpenModal, setOpenModal} = useModalConfirm();
      const {isOpen, handleModal} = useModal()

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

     
    return (
    <div className="detailOrder">
        <div className="detail-title">
            {{hasReturn} &&
                <button className='button-back' onClick={(e) => handleClicHome(e)}>
                        <IoIosArrowBack size="2.5rem" />
                </button>
            }
            <h2>Detalle de pedido: {orderItem?.id}</h2>
        </div>
        {orderItem &&
            <div className={`detailOrder-container ${(id ? cssClassName : '' )}`}>
                <CardOrderInfo order={orderItem} enableIcon={false}></CardOrderInfo>
                <hr></hr>
                <button className='btn btn-add btn-sm' onClick={() => handleModal()} >Agregar producto</button>
                <div className='content-product'>
                    {isOpen && <FormProducts handleSetNewProducts={handleSetNewProducts} handleIsOpen={handleModal}></FormProducts>}
                </div>
                <div className="detailOrder-products">
                    {productos && productos.map(product => (
                        <CardProduct key={product.id} productItem={product}></CardProduct>
                    ))}
                </div>
                {
                    productos && productos.length > 0 && 
                    <button className='btn btn-success btn-sm'onClick={(event) => handleOpenModal(event,true, STATUS.BACKLOG as keyof typeof STATUS)} disabled={!productos || productos?.length<0} >Finalizar registro</button>
                }
                
                <ModalConfirm openModal={openModal} setOpenModal={setOpenModal} accept={handleUpdateState} ></ModalConfirm>
            </div>}
    </div>

    )
}