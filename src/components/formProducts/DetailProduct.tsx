import './DetailProduct.css';
import { DetailProductoDto } from "../../general/Interfaces";
import { deleteDetalleProducto, updateStatusDetalleProducto } from '../../services/detalleProducto.services';
import { ModalConfirm } from '../modal/Modal';
import { useModalConfirm } from '../../hooks/useModalConfirm';
import { toast } from 'react-toastify';

export function DetailProduct({detailProduct, handleDetailProductSelected, showActions=false, handleReload=() => {}}:
    {detailProduct:DetailProductoDto, handleDetailProductSelected?:CallableFunction, showActions?:boolean,handleReload?:CallableFunction}){
    const modalUpdate = useModalConfirm( );
    const modalDelete = useModalConfirm();

    const handleUpdateModal = (event:MouseEvent) => {
        updateStatusDetalleProducto(detailProduct.id, !detailProduct.estatus).then(() => {
            handleReload();
            modalUpdate.handleClose(event);
            toast.success("Actualizado correctamente.")
        }).catch(error => toast.error("Error al actualizar el registro."));
    }

    const handleDeleteModal = (event:MouseEvent) => {
        deleteDetalleProducto(detailProduct.id).then(() => {
            handleReload();
            modalDelete.handleClose(event);
            toast.success("Eliminado correctamente.")
        }).catch(error => toast.error("Error al eliminar el registro."));
    }

    return (
        <>
        <div key={detailProduct.id} className="container-product">
            <div className="detailProduct" key={detailProduct.id} onClick={handleDetailProductSelected ?() => handleDetailProductSelected(detailProduct) : () => {}}>
                <img className="detailProduct-img" src={detailProduct.imagen ? 
                    detailProduct.imagen : detailProduct.producto.thumbnail
                }></img>
                <div className="detailProduct-info">
                    {detailProduct.descripcion && 
                    <h4 className='no-pm'>
                        {detailProduct.descripcion}
                    </h4>}
                    <ul>
                        <li><strong>{detailProduct.producto.nameProduct}</strong></li>
                        <li><strong>{detailProduct.size.descripcion}</strong></li>
                        <li><span>Precio: </span>${detailProduct.precio}</li>
                        {detailProduct.comentarios && <li><p className='no-pm'><span>Comentarios: </span></p>{detailProduct.comentarios}</li>}
                    </ul>
                </div>
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