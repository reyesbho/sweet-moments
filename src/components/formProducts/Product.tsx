import { toast } from "react-toastify";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import { deleteProducto, updateStatusProducto } from "../../services/producto.service";
import { ModalConfirm } from "../modal/Modal";
import './Product.css';
import { ProductDto } from "../../general/Dtos";

export function Product({product, handleClickSelect, showActions=false, handleReload=() => {}}:
    {product:ProductDto,handleClickSelect:CallableFunction,showActions?:boolean,handleReload?:CallableFunction}){

    const modalUpdate = useModalConfirm( );
    const modalDelete = useModalConfirm();

    const handleUpdateModal = (event:MouseEvent) => {
        updateStatusProducto(product.id,  !product.status).then(() => {
            handleReload();
            modalUpdate.handleClose(event);
            toast.success("Actualizado correctamente.")
        }).catch((error: Error) => toast.error(error.message));
    }

    const handleDeleteModal = (event:MouseEvent) => {
        deleteProducto(product.id).then(() => {
            handleReload();
            modalDelete.handleClose(event);
            toast.success("Eliminado correctamente.")
        }).catch((error: Error) => toast.error(error.message));
    }
    return (
        <>
            <div key={product.id} className="container-product-catalog">
                <div className="producto" key={product.id} onClick={() => handleClickSelect(product)}>
                    <img className="producto-img" src={product.thumbnail}></img>
                    <span className="producto-title">{product.nameProduct}</span>
                    {showActions && 
                        <div className="container-product-catalog-actions">
                            <button className="btn btn-sm btn-delete" onClick={modalDelete.handleShow}>Delete</button>
                            <button className="btn btn-sm btn-next" onClick={modalUpdate.handleShow}>Editar</button>
                        </div>
                    }
                </div>
            </div>
        <ModalConfirm show={modalUpdate.show} handleClose={(event:MouseEvent) => modalUpdate.handleClose(event)} handleOk={handleUpdateModal} ></ModalConfirm>
        <ModalConfirm show={modalDelete.show} handleClose={(event:MouseEvent) => modalDelete.handleClose(event)} handleOk={handleDeleteModal} ></ModalConfirm>
        </>
    )
}