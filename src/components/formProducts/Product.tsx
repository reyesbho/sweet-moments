import { ProductDto } from "../../general/Interfaces";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import { deleteProducto, updateStatusProducto } from "../../services/producto.service";
import { ModalConfirm } from "../modal/Modal";
import './Product.css';

export function Product({product, handleClickSelect, showActions=false, handleReload}:
    {product:ProductDto,handleClickSelect:CallableFunction,showActions:boolean,handleReload:CallableFunction}){

    const modalUpdate = useModalConfirm( );
    const modalDelete = useModalConfirm();

    const handleUpdateModal = (event:MouseEvent) => {
        updateStatusProducto(product.id,  !product.status).then(() => {
            handleReload();
            modalUpdate.handleClose(event);
        }) 
    }

    const handleDeleteModal = (event:MouseEvent) => {
        deleteProducto(product.id).then(() => {
            handleReload();
            modalDelete.handleClose(event);
        }) 
    }
    return (
        <>
            <div key={product.id} className="container-product">
                <div className="producto" key={product.id} onClick={() => handleClickSelect(product)}>
                    <img className="producto-img" src={product.thumbnail}></img>
                    <span className="producto-title">{product.nameProduct}</span>
                </div>
                {showActions && 
                    <div className="container-product-actions">
                        <button className="btn btn-sm btn-delete" onClick={modalDelete.handleShow}>Delete</button>
                        <button className="btn btn-sm btn-next" onClick={modalUpdate.handleShow}>Editar</button>
                    </div>
                }
            </div>
        <ModalConfirm show={modalUpdate.show} handleClose={(event:MouseEvent) => modalUpdate.handleClose(event)} handleOk={handleUpdateModal} ></ModalConfirm>
        <ModalConfirm show={modalDelete.show} handleClose={(event:MouseEvent) => modalDelete.handleClose(event)} handleOk={handleDeleteModal} ></ModalConfirm>
        </>
    )
}