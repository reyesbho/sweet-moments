import { toast } from "react-toastify";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import { deleteProducto, updateStatusProducto } from "../../services/producto.service";
import { ModalConfirm } from "../modal/Modal";
import './Product.css';
import { ProductDto } from "../../general/Dtos";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export function Product({product, handleClickSelect, showActions=false, cssClassBorder=''}:
    {product:ProductDto,handleClickSelect:CallableFunction,showActions?:boolean,handleReload?:CallableFunction, cssClassBorder?:string}) {

    const modalUpdate = useModalConfirm( );
    const modalDelete = useModalConfirm();

    const handleUpdateModal = (event:MouseEvent) => {
        updateStatusProducto(product.id,  !product.status).then(() => {
            modalUpdate.handleClose(event);
            toast.success("Actualizado correctamente.")
        }).catch((error: Error) => toast.error(error.message));
    }

    const handleDeleteModal = (event:MouseEvent) => {
        deleteProducto(product.id).then((response) => {
            if(response.status !== 200){
                toast.error("No se puede eliminar el producto.");
                modalDelete.handleClose(event);
                return;
            }
            modalDelete.handleClose(event);
            toast.success("Eliminado correctamente.")
        }).catch((error: Error) => toast.error(error.message));
    }
    return (
        <>
            <div key={product.id} className={`container-product-catalog ${cssClassBorder}`}>
                <div className="producto" key={product.id}>
                    <img className="producto-img" src={product.thumbnail}></img>
                    <span className="producto-title">{product.nameProduct}</span>
                    {showActions && 
                        <div className="container-product-catalog-actions">
                            <button className="btn btn-sm btn-delete" onClick={modalDelete.handleShow}><MdDelete size='1.2rem' color="#e04141"></MdDelete></button>
                            <button className="btn btn-sm btn-next" onClick={modalUpdate.handleShow}><FaEdit  size='1.2rem' ></FaEdit></button>
                        </div>
                    }
                </div>
            </div>
        <ModalConfirm show={modalUpdate.show} handleClose={(event:MouseEvent) => modalUpdate.handleClose(event)} handleOk={handleUpdateModal} ></ModalConfirm>
        <ModalConfirm show={modalDelete.show} handleClose={(event:MouseEvent) => modalDelete.handleClose(event)} handleOk={handleDeleteModal} ></ModalConfirm>
        </>
    )
}