import './DetailProduct.css';
import { DetailProductoDto } from "../../general/Interfaces";
import { deleteDetalleProducto, updateStatusDetalleProducto } from '../../services/detalleProducto.services';
import { ModalConfirm } from '../modal/Modal';
import { useModalConfirm } from '../../hooks/useModalConfirm';

export function DetailProduct({detailProduct, handleDetailProductSelected, showActions=false, handleReload=() => {}}:
    {detailProduct:DetailProductoDto, handleDetailProductSelected?:CallableFunction, showActions?:boolean,handleReload?:CallableFunction}){
    const modalUpdate = useModalConfirm( );
    const modalDelete = useModalConfirm();

    const handleUpdateModal = (event:MouseEvent) => {
        updateStatusDetalleProducto(detailProduct.id, !detailProduct.estatus).then(() => {
            handleReload();
            modalUpdate.handleClose(event);
        }) 
    }

    const handleDeleteModal = (event:MouseEvent) => {
        deleteDetalleProducto(detailProduct.id).then(() => {
            handleReload();
            modalDelete.handleClose(event);
        }) 
    }

    return (
        <>
        <div key={detailProduct.id} className="container-product">
            <div className="detailProduct" key={detailProduct.id} onClick={handleDetailProductSelected ?() => handleDetailProductSelected(detailProduct) : () => {}}>
                <img className="detailProduct-img" src={detailProduct.producto.thumbnail}></img>
                <div className="detailProduct-info">
                    <ul>
                        <li><strong>{detailProduct.size.descripcion}</strong></li>
                        <li><span>Precio: </span>${detailProduct.precio}</li>
                        {detailProduct.descripcion && <li><span>Detalles: </span>{detailProduct.descripcion}</li>}
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